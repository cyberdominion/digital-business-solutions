require("dotenv").config()
const { execSync } = require("child_process")
execSync("npx tsx prisma/seed.ts", {
  stdio: "inherit",
  env: { ...process.env },
  cwd: process.cwd(),
})
process.exit(0)
