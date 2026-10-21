#!/usr/bin/env node
import { readFile } from "node:fs/promises";
import { evaluateApplication } from "./checker.js";

const [listingPath, profilePath] = process.argv.slice(2);
if (!listingPath || !profilePath) {
  console.error("Usage: npm run check -- <listing.json> <profile.json>");
  process.exit(1);
}

const listing = JSON.parse(await readFile(listingPath, "utf8"));
const profile = JSON.parse(await readFile(profilePath, "utf8"));
const report = evaluateApplication(listing, profile);

console.log(`Readiness: ${report.score} (${report.ready ? "ready" : "needs review"})`);
for (const check of report.checks) {
  console.log(`${check.passed ? "PASS" : "REVIEW"} ${check.id}: ${check.label}`);
  if (!check.passed) console.log(`  Next: ${check.fix}`);
}
