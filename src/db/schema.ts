import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const credentials = pgTable('credentials', {
  id: serial('id').primaryKey(),
  provider: text('provider').notNull(),
  username: text('username').notNull(),
  password: text('password').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

export type Credential = typeof credentials.$inferSelect;
export type NewCredential = typeof credentials.$inferInsert;
