import { execSync } from "child_process";
import { readFileSync, writeFileSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const extensionDir = join(__dirname, "..");

// Files/directories to include in source code package
const includePaths = [
  "src/",
  "public/",
  "scripts/",
  "package.json",
  "package-lock.json",
  "wxt.config.ts",
  "tsconfig.json",
  "tailwind.config.js",
  "postcss.config.js",
  "vitest.config.ts",
  "components.json",
  "BUILD_INSTRUCTIONS.md",
  "README.md", // Include main README if it exists
];

// Files/directories to exclude
const excludePaths = [
  "node_modules/",
  "dist/",
  ".git/",
  ".wxt/",
  "*.log",
  ".DS_Store",
];

console.log("📦 Preparing source code package for Firefox AMO submission...\n");

// Check that BUILD_INSTRUCTIONS.md exists
if (!existsSync(join(extensionDir, "BUILD_INSTRUCTIONS.md"))) {
  console.error("❌ ERROR: BUILD_INSTRUCTIONS.md not found!");
  console.error(
    "   Please ensure BUILD_INSTRUCTIONS.md exists in the extension directory."
  );
  process.exit(1);
}

// Check that package-lock.json exists
if (!existsSync(join(extensionDir, "package-lock.json"))) {
  console.error("❌ ERROR: package-lock.json not found!");
  console.error(
    '   Please run "npm install" first to generate package-lock.json.'
  );
  process.exit(1);
}

console.log("✅ Source code package requirements verified\n");
console.log("📋 Files to include in source code package:");
includePaths.forEach((path) => {
  const fullPath = join(extensionDir, path);
  if (existsSync(fullPath)) {
    console.log(`   ✓ ${path}`);
  } else {
    console.log(`   ⚠ ${path} (not found, will be skipped)`);
  }
});

console.log("\n📋 Files/directories to exclude:");
excludePaths.forEach((path) => {
  console.log(`   - ${path}`);
});

console.log("\n💡 Next steps:");
console.log("   1. Create a ZIP file containing the files listed above");
console.log("   2. Ensure BUILD_INSTRUCTIONS.md is in the root of the ZIP");
console.log("   3. Upload the ZIP file when prompted during AMO submission");
console.log("\n✅ Source code package checklist complete!");
