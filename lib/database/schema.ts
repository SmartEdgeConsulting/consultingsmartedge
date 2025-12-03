//lib/database/schema.ts
import { relations } from "drizzle-orm";
import {
  boolean,
  index,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

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

export const subscribers = pgTable(
  "subscribers",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    email: varchar("email", { length: 255 }).notNull().unique(),
    status: varchar("status", { length: 20 }).notNull().default("active"), // active, unsubscribed
    subscribedAt: timestamp("subscribed_at").notNull().defaultNow(),
    unsubscribedAt: timestamp("unsubscribed_at"),
  },
  (table) => ({
    emailIdx: index("email_idx").on(table.email),
  })
);

export const careers = pgTable("careers", {
  id: uuid("id").defaultRandom().primaryKey(),
  sanityId: varchar("sanity_id", { length: 191 }).notNull().unique(),
  jobTitle: text("job_title").notNull(),
  slug: varchar("slug", { length: 200 }),
  jobDescription: text("job_description"),
  department: text("department"),
  jobType: varchar("job_type", { length: 50 }),
  available: boolean("available").default(false),
  publishedAt: timestamp("published_at"),
  postedAt: timestamp("posted_at").defaultNow(),
  sanityRev: varchar("sanity_rev", { length: 64 }).default(""),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  deletedAt: timestamp("deleted_at"),
});

export const applications = pgTable(
  "applications",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    careerId: uuid("career_id")
      .references(() => careers.id)
      .notNull(),
    userId: uuid("user_id")
      .references(() => users.id)
      .notNull(),
    name: text("name").notNull(),
    email: text("email").notNull(),
    phoneNumber: varchar("phone_number").notNull(),
    experience: text("experience").notNull(),
    skills: text("skills").notNull(),
    portfolio: text("portfolio"),
    resumeUrl: text("resume_url"),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (table) => ({
    careerIdx: index("applications_career_idx").on(table.careerId),
    userIdx: index("applications_user_idx").on(table.userId),
    // optional unique constraint to prevent duplicate apps by same user to same career:
    // uniqueApp: index("unique_app_idx").on(table.careerId, table.userId).unique(),
  })
);

// ---------- Relations ----------
export const usersRelations = relations(users, ({ many }) => ({
  // a user can have many applications
  applications: many(applications),
}));

export const careersRelations = relations(careers, ({ many }) => ({
  // a career/job can have many applications
  applications: many(applications),
}));

export const applicationsRelations = relations(applications, ({ one }) => ({
  // each application belongs to a user and a career
  user: one(users, {
    fields: [applications.userId],
    references: [users.id],
  }),
  career: one(careers, {
    fields: [applications.careerId],
    references: [careers.id],
  }),
}));

export type Subscriber = typeof subscribers.$inferSelect;
export type NewSubscriber = typeof subscribers.$inferInsert;

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export type Career = typeof careers.$inferSelect;
export type NewCareer = typeof careers.$inferInsert;
