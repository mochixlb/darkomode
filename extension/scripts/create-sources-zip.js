import { execSync } from "child_process";
import { existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const extensionDir = join(__dirname, "..");
const distDir = join(extensionDir, "dist");
const zipPath = join(distDir, "darko-mode-1.0.0-sources.zip");

console.log("📦 Creating source code ZIP for Firefox AMO submission...\n");

// Ensure dist directory exists
if (!existsSync(distDir)) {
  execSync(`mkdir -p "${distDir}"`, { stdio: "inherit" });
}

// Files to include (relative to extension directory)
const filesToInclude = [
  "src",
  "public",
  "package.json",
  "package-lock.json",
  "wxt.config.ts",
  "tsconfig.json",
  "tailwind.config.js",
  "postcss.config.js",
  "vitest.config.ts",
  "components.json",
  "BUILD_INSTRUCTIONS.md",
];

// Check BUILD_INSTRUCTIONS.md exists
if (!existsSync(join(extensionDir, "BUILD_INSTRUCTIONS.md"))) {
  console.error("❌ ERROR: BUILD_INSTRUCTIONS.md not found!");
  process.exit(1);
}

// Build zip command
const files = filesToInclude.map((f) => `"${f}"`).join(" ");
const zipCommand = `cd "${extensionDir}" && zip -r "${zipPath}" ${files} -x "*.DS_Store" "node_modules/*" "dist/*" ".git/*" ".wxt/*" "*.log"`;

try {
  console.log("Creating ZIP file...");
  execSync(zipCommand, { stdio: "inherit" });

  // Verify ZIP was created
  if (existsSync(zipPath)) {
    const stats = execSync(`stat -f%z "${zipPath}"`, {
      encoding: "utf-8",
    }).trim();
    const sizeMB = (parseInt(stats) / 1024 / 1024).toFixed(2);
    console.log(`\n✅ Source code ZIP created successfully!`);
    console.log(`   Location: ${zipPath}`);
    console.log(`   Size: ${sizeMB} MB`);

    if (parseFloat(sizeMB) > 200) {
      console.warn(`\n⚠️  WARNING: ZIP file exceeds 200MB limit!`);
      console.warn(`   Current size: ${sizeMB} MB`);
      console.warn(`   You may need to exclude additional files.`);
    } else {
      console.log(`\n✅ File size is within the 200MB limit.`);
    }
  } else {
    throw new Error("ZIP file was not created");
  }
} catch (error) {
  console.error("\n❌ Error creating source code ZIP:", error.message);
  process.exit(1);
}
