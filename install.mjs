#!/usr/bin/env node
// Cross-platform installer for the Trio Claude Code skill.
// Copies SKILL.md from the npm package root into the user's Claude Code
// skills directory (~/.claude/skills/trio/SKILL.md). Runs automatically as
// the postinstall step.

import { existsSync, mkdirSync, copyFileSync, readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { homedir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const pkgRoot = __dirname;

const args = new Set(process.argv.slice(2));
const dryRun = args.has("--dry-run");
const quiet = args.has("--quiet");
const force = args.has("--force");

const log = (...m) => { if (!quiet) console.log("[trio install]", ...m); };
const die = (...m) => { console.error("[trio install]", ...m); process.exit(1); };

// Guard: skip postinstall when running from inside the source checkout
// (npm runs postinstall in development too; only copy when installed as a
// real package). Bypass with --force for local testing.
if (existsSync(join(pkgRoot, ".git")) && !force) {
  log("detected .git in package root; skipping postinstall (development mode).");
  log("to install manually from a source checkout, run: node install.mjs --force");
  process.exit(0);
}

const srcSkill = join(pkgRoot, "SKILL.md");
if (!existsSync(srcSkill)) {
  die("SKILL.md not found at", srcSkill, "- package may be corrupt.");
}

const targetDir = join(homedir(), ".claude", "skills", "trio");
const targetSkill = join(targetDir, "SKILL.md");

const sha256 = (path) =>
  createHash("sha256").update(readFileSync(path)).digest("hex");

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
