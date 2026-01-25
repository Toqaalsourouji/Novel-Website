import { Pool } from "pg";
import fs from "fs";
import path from "path";

async function runMigration() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is missing. Check your .env.local file.");
  }

  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });

  try {
    // Read the migration file
    const migrationPath = path.join(process.cwd(), "scripts", "migration.sql");
    const migrationSQL = fs.readFileSync(migrationPath, "utf-8");

    console.log("🔄 Running migration...");
    await pool.query(migrationSQL);
    console.log("✅ Migration completed successfully!");
  } catch (error) {
    console.error("❌ Migration failed:", error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

runMigration();
