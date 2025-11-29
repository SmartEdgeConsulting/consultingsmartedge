import { boolean, pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  clerkId: text("clerk_id").notNull().unique(),
  email: text("email").notNull().unique(),
  firstName: text("first_name"),
  lastName: text("last_name"),
  phoneNo: text("phone_no"),
  imageUrl: text("image_url"),
  emailVerified: boolean("email_verified").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

 export const subscribers = pgTable('subscribers', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  
  // Subscription status
  status: varchar('status', { length: 20 }).default('pending'), // 'pending', 'confirmed', 'unsubscribed'
  isActive: boolean('is_active').default(false),
  
  // Tokens
  confirmationToken: uuid('confirmation_token').defaultRandom(),
  unsubscribeToken: uuid('unsubscribe_token').defaultRandom(),
  
  // Resend specific
  resendContactId: varchar('resend_contact_id', { length: 100 }), // Store Resend contact ID if using Audiences
  
  createdAt: timestamp('created_at').defaultNow(),
  confirmedAt: timestamp('confirmed_at'),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

