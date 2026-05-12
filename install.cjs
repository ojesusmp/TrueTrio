#!/usr/bin/env node
// Cross-platform installer for the Trio Claude Code skill.
// Copies SKILL.md from the npm package root into the user's Claude Code
// skills directory (~/.claude/skills/trio/SKILL.md). Runs automatically as
// the postinstall step.
//
// CommonJS is used instead of ESM because npm's global-install lifecycle on
// Windows + Node 24 misreports module resolution for postinstall .mjs files,
// causing a phantom MODULE_NOT_FOUND error even when the script ran. The CJS
// path is what mature packages use for postinstall scripts.

"use strict";

const { existsSync, mkdirSync, copyFileSync, readFileSync } = require("node:fs");
const { createHash } = require("node:crypto");
const { homedir } = require("node:os");
const { join } = require("node:path");

const pkgRoot = __dirname;

const argSet = new Set(process.argv.slice(2));
const dryRun = argSet.has("--dry-run");
const quiet = argSet.has("--quiet");
const force = argSet.has("--force");

const log = (...args) => { if (!quiet) console.log("[trio install]", ...args); };
const die = (...args) => { console.error("[trio install]", ...args); process.exit(1); };

// Guard: skip postinstall when running from inside the source checkout
// (npm runs postinstall in development too; only copy when installed as a
// real package). Bypass with --force for local testing.
if (existsSync(join(pkgRoot, ".git")) && !force) {
  log("detected .git in package root; skipping postinstall (development mode).");
  log("to install manually from a source checkout, run: node install.cjs --force");
  process.exit(0);
}

const srcSkill = join(pkgRoot, "SKILL.md");
if (!existsSync(srcSkill)) {
  die("SKILL.md not found at", srcSkill, "- package may be corrupt.");
}

const targetDir = join(homedir(), ".claude", "skills", "trio");
const targetSkill = join(targetDir, "SKILL.md");

function sha256(path) {
  return createHash("sha256").update(readFileSync(path)).digest("hex");
}

const srcHash = sha256(srcSkill);

if (dryRun) {
  log("dry-run mode — no files will be written.");
  log("source:", srcSkill);
  log("target:", targetSkill);
  log("source SHA256:", srcHash);
  process.exit(0);
}

mkdirSync(targetDir, { recursive: true });
copyFileSync(srcSkill, targetSkill);

const dstHash = sha256(targetSkill);
if (srcHash !== dstHash) {
  die("hash mismatch after copy. src=" + srcHash + " dst=" + dstHash);
}

log("installed SKILL.md at", targetSkill);
log("SHA256:", srcHash);
log("open a fresh Claude Code session and type `/trio` to verify.");
