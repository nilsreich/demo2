import { config } from 'dotenv';
import { defineConfig } from 'drizzle-kit';

config({ path: '.env.local' }); // or .env.local

export default defineConfig({
    out: './drizzle',
    schema: './db/schema.ts',
    dialect: 'turso',
    dbCredentials: {
      url: process.env.TURSO_DATABASE_URL || '',
      authToken: process.env.TURSO_AUTH_TOKEN || '',
    },
  });