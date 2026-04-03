const fs = require("fs");
const path = require("path");

const nextDir = path.join(__dirname, "..", ".next");

try {
  fs.rmSync(nextDir, { recursive: true, force: true });
  console.log("Cleared apps/web/.next");
} catch (error) {
  console.error("Failed to clear apps/web/.next", error);
  process.exitCode = 1;
}
