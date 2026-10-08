const dotenv = require("dotenv")
const dotenvExpand = require("dotenv-expand")
const result = dotenv.config()
console.log("Dotenv result:", result.error ? result.error.message : "OK")
console.log("Parsed:", JSON.stringify(result.parsed))
console.log("DATABASE_URL:", process.env.DATABASE_URL)

const { execSync } = require("child_process")
execSync("npx tsx prisma/seed.ts", {
  stdio: "inherit",
  env: { ...process.env },
  cwd: process.cwd(),
})
process.exit(0)
