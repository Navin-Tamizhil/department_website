import fs from "fs";
import path from "path";

const distPath = path.resolve("./dist");
const sensitiveExts = [".csv", ".json", ".txt", ".pdf", ".xlsx", ".docx", ".env"];
const suspiciousFiles = [];

function walk(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      walk(full);
    } else {
      const ext = path.extname(file).toLowerCase();
      if (sensitiveExts.includes(ext)) suspiciousFiles.push(full);
    }
  }
}

// --- MAIN ---
if (!fs.existsSync(distPath)) {
  console.error("❌ dist folder not found. Run `npm run build` first.");
  process.exit(1);
}

walk(distPath);

if (suspiciousFiles.length === 0) {
  console.log("✅ Safe to deploy. No sensitive files detected inside dist/");
} else {
  console.warn("⚠️ Potentially sensitive files found:");
  suspiciousFiles.forEach(f => console.log(" -", f));
  console.warn("\n🔒 Review these files before deploying!");
}

