// Applies every SQL file in neon/migrations (sorted by name) to DATABASE_URL.
// Each file is idempotent, so re-running is safe. Use a direct (non-pooled)
// connection string.
import { readFileSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import pg from 'pg';

const migrationsDir = join(dirname(fileURLToPath(import.meta.url)), '..', 'neon', 'migrations');
const connectionString = process.env.DATABASE_URL_UNPOOLED || process.env.DATABASE_URL;

if (!connectionString) {
  console.error('Set DATABASE_URL (or DATABASE_URL_UNPOOLED) before running migrations.');
  process.exit(1);
}

const client = new pg.Client({ connectionString });
await client.connect();

try {
  for (const file of readdirSync(migrationsDir).filter((f) => f.endsWith('.sql')).sort()) {
    process.stdout.write(`applying ${file}... `);
    await client.query(readFileSync(join(migrationsDir, file), 'utf8'));
    console.log('ok');
  }
} finally {
  await client.end();
}
