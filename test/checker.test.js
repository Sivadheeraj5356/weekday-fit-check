import test from "node:test";
import assert from "node:assert/strict";
import { evaluateApplication } from "../src/checker.js";

const listing = {
  title: "Software Engineer Intern",
  seniority: "Junior - Entry Level",
  location: "Bengaluru (Remote)",
  stipend: "INR 30,000 - 50,000 per month",
  startDate: "Immediate / As soon as possible"
};

const profile = {
  availableStartDays: 0,
  repositoryUrl: "https://github.com/example/project",
  portfolioUrl: "https://example.dev"
};

test("accepts a ready paid remote internship application", () => {
  const report = evaluateApplication(listing, profile);
  assert.equal(report.ready, true);
  assert.equal(report.score, "5/5");
});

test("flags an unpaid role for review", () => {
  const report = evaluateApplication({ ...listing, stipend: "Unpaid" }, profile);
  assert.equal(report.ready, false);
  assert.equal(report.checks.find((check) => check.id === "pay").passed, false);
});

test("flags an immediate start the candidate cannot meet", () => {
  const report = evaluateApplication(listing, { ...profile, availableStartDays: 30 });
  assert.equal(report.checks.find((check) => check.id === "availability").passed, false);
});

test("requires both project and portfolio proof", () => {
  const report = evaluateApplication(listing, { ...profile, portfolioUrl: "" });
  assert.equal(report.checks.find((check) => check.id === "proof").passed, false);
});
