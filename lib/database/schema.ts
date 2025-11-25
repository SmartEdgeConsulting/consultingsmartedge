import { pgTable, uuid, varchar, text, timestamp, jsonb } from "drizzle-orm/pg-core";
//import { relations } from "drizzle-orm";

// USERS TABLE
export const usersTable = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  image: text("image"), // profile picture
  createdAt: timestamp("created_at").defaultNow(),
});

// --- Relations ---
