
import { serial, text, pgTable, timestamp } from 'drizzle-orm/pg-core';

export const buttonConfigsTable = pgTable('button_configs', {
  id: serial('id').primaryKey(),
  config_id: text('config_id').notNull().unique(),
  text: text('text').notNull(),
  color: text('color').notNull(),
  action: text('action'), // Nullable by default
  created_at: timestamp('created_at').defaultNow().notNull(),
});

// TypeScript type for the table schema
export type ButtonConfigRow = typeof buttonConfigsTable.$inferSelect;
export type NewButtonConfigRow = typeof buttonConfigsTable.$inferInsert;

// Export all tables for proper query building
export const tables = { buttonConfigs: buttonConfigsTable };
