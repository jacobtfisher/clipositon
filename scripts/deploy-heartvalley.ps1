$ErrorActionPreference = "Stop"
Set-StrictMode -Version Latest

$expectedHost = "ftp.heartvalleysprings.com"
$remoteRoot = "/public_html/abdul/dist/positions"
$publicUrl = "https://heartvalleysprings.com/abdul/positions/"

function Invoke-Checked {
  param(
    [Parameter(Mandatory = $true)]
    [string]$Label,
    [Parameter(Mandatory = $true)]
    [scriptblock]$Command
  )

  & $Command
  if ($LASTEXITCODE -ne 0) {
    throw "$Label failed with exit code $LASTEXITCODE."
  }
}

Write-Host "=== Cliposition: deploy Abdul to Heart Valley Springs ==="

Invoke-Checked "Tests" { npm.cmd test }
Invoke-Checked "Typecheck" { npm.cmd run check }

$env:CLIPOSITION_CANDIDATE = "abdul"
$env:CLIPOSITION_DEPLOYMENT = "heartvalley-abdul"
Invoke-Checked "Build" { npm.cmd run build }

$buildRoot = (Resolve-Path (Join-Path $PSScriptRoot "..\dist")).Path
$indexPath = Join-Path $buildRoot "index.html"
if (-not (Test-Path -LiteralPath $indexPath)) {
  throw "Build output is missing index.html."
}

$fileZillaConfig = Join-Path $env:APPDATA "FileZilla\sitemanager.xml"
if (-not (Test-Path -LiteralPath $fileZillaConfig)) {
  throw "FileZilla site manager not found at $fileZillaConfig. Save a site named HVS first."
}

[xml]$fileZillaXml = Get-Content -Raw -LiteralPath $fileZillaConfig
$hvsSite = @($fileZillaXml.FileZilla3.Servers.Server) |
  Where-Object { $_.Name -eq "HVS" } |
  Select-Object -First 1

if (-not $hvsSite) {
  throw "No saved FileZilla site named HVS was found."
}
if ([string]$hvsSite.Host -ne $expectedHost) {
  throw "The HVS profile points to '$($hvsSite.Host)', not '$expectedHost'."
}

$storedPassword = if ($hvsSite.Pass.encoding -eq "base64") {
  [Text.Encoding]::UTF8.GetString(
    [Convert]::FromBase64String([string]$hvsSite.Pass.'#text')
  )
} else {
  [string]$hvsSite.Pass
}

$ftpAuthority = "$($hvsSite.Host):$($hvsSite.Port)"
$ftpRoot = "ftp://$ftpAuthority$remoteRoot"
$ftpCredentials = "$($hvsSite.User):$storedPassword"
$backupPath = Join-Path $env:TEMP (
  "hvs-positions-index-{0}.html" -f (Get-Date -Format "yyyyMMdd-HHmmss")
)

Invoke-Checked "Live index backup" {
  curl.exe --silent --show-error --fail `
    --user $ftpCredentials `
    "$ftpRoot/index.html" `
    --output $backupPath
}

$indexFullPath = (Resolve-Path -LiteralPath $indexPath).Path
$uploadFiles = @(
  Get-ChildItem -LiteralPath $buildRoot -File -Recurse |
    Where-Object { $_.FullName -ne $indexFullPath }
)

foreach ($uploadFile in $uploadFiles) {
  $relativePath = $uploadFile.FullName.Substring($buildRoot.Length + 1).Replace("\", "/")

  Invoke-Checked "Upload of $relativePath" {
    curl.exe --silent --show-error --fail `
      --ftp-create-dirs `
      --user $ftpCredentials `
      --upload-file $uploadFile.FullName `
      "$ftpRoot/$relativePath"
  }
}

# Publish the entry point last, after every hashed asset and redirect page exists.
Invoke-Checked "Final index upload" {
  curl.exe --silent --show-error --fail `
    --ftp-create-dirs `
    --user $ftpCredentials `
    --upload-file $indexFullPath `
    "$ftpRoot/index.html"
}

$cacheBust = [DateTimeOffset]::UtcNow.ToUnixTimeSeconds()
$liveHtml = (
  curl.exe --silent --show-error --fail --max-time 20 "$publicUrl`?v=$cacheBust"
) -join "`n"
if ($LASTEXITCODE -ne 0) {
  throw "The deployed page did not respond successfully."
}
if ($liveHtml -notmatch '/abdul/positions/assets/') {
  throw "The deployed page does not reference the expected scoped assets."
}

$assetMatch = [regex]::Match($liveHtml, 'src="([^"]+index-[^"]+\.js)"')
if (-not $assetMatch.Success) {
  throw "The deployed page does not contain its generated JavaScript asset."
}

$assetUrl = "https://heartvalleysprings.com$($assetMatch.Groups[1].Value)"
Invoke-Checked "Live asset verification" {
  curl.exe --silent --show-error --fail --max-time 20 --output NUL $assetUrl
}

Write-Host ""
Write-Host "Deployment complete: $publicUrl"
Write-Host "Uploaded $($uploadFiles.Count + 1) files."
Write-Host "Previous index backup: $backupPath"
