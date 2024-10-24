import { defineConfig } from "drizzle-kit";
 
export default defineConfig({
    dialect: "sqlite",
    schema: "./db/schema.ts",
    casing: "snake_case",
    dbCredentials: { url: "./sqlite-db/sqlite.db" }
});