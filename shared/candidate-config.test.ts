import assert from "node:assert/strict";
import test from "node:test";
import {
  DEFAULT_CANDIDATE_KEY,
  DEFAULT_DEPLOYMENT_KEY,
  candidateConfig,
  candidateConfigs,
  deploymentConfigs,
  getCandidateConfig
} from "./candidate-config.js";
import { positionIssues } from "./positions.js";

test("the default deployment remains Abdul", () => {
  assert.equal(DEFAULT_CANDIDATE_KEY, "abdul");
  assert.equal(DEFAULT_DEPLOYMENT_KEY, "tools4abdul");
  assert.deepEqual(getCandidateConfig(undefined), {
    ...candidateConfigs.abdul,
    deployment: deploymentConfigs.tools4abdul
  });
  assert.equal(candidateConfig.key, process.env.CLIPOSITION_CANDIDATE ?? "abdul");
});

test("unknown deployment candidate keys fail closed", () => {
  assert.throws(
    () => getCandidateConfig("not-a-candidate"),
    /Unknown CLIPOSITION_CANDIDATE "not-a-candidate"/
  );
});

test("unknown deployment target keys fail closed", () => {
  assert.throws(
    () => getCandidateConfig("abdul", "not-a-deployment"),
    /Unknown CLIPOSITION_DEPLOYMENT "not-a-deployment"/
  );
});

test("candidate configurations contain valid deployment and campaign metadata", () => {
  for (const config of Object.values(candidateConfigs)) {
    assert.equal(config.key.length > 0, true);
    assert.match(config.site.reviewedOn, /^\d{4}-\d{2}-\d{2}$/);
    assert.match(config.site.themeColor, /^#[\da-f]{6}$/i);
    for (const url of [
      config.candidate.campaignUrl,
      config.actions.vote.url,
      config.actions.volunteer.url
    ]) {
      assert.equal(new URL(url).protocol, "https:");
    }

    const pinnedIds = config.content.pinnedIssueIds;
    assert.equal(new Set(pinnedIds).size, pinnedIds.length);
    for (const issueId of pinnedIds) {
      assert.ok(positionIssues.some((issue) => issue.id === issueId), `unknown pinned issue: ${issueId}`);
    }
  }
});

test("deployment configurations contain valid public URLs", () => {
  for (const deployment of Object.values(deploymentConfigs)) {
    assert.match(deployment.artifactMountPath, /^\/(?:[^/]+\/)*$/);
    assert.match(deployment.siteBase, /^\/(?:[^/]+\/)*$/);
    assert.equal(deployment.siteBase.startsWith(deployment.artifactMountPath), true);
    assert.equal(new URL(deployment.siteOrigin).protocol, "https:");
    assert.equal(new URL(deployment.shortUrlOrigin).protocol, "https:");

    if ("customDomain" in deployment && deployment.customDomain) {
      assert.equal(new URL(deployment.siteOrigin).hostname, deployment.customDomain);
    }
  }
});
