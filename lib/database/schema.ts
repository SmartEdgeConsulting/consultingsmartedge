//lib/database/schema.ts
import { relations } from "drizzle-orm";
import {
  boolean,
  index,
  jsonb,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

//Enum types
export const genderEnum = pgEnum("gender_enum", ["male", "female", "other"]);
export const occupationEnum = pgEnum("occupation_enum", [
  "Student",
  "Job-Seeker",
  "Working Professional",
  "Other",
  "",
]);
export const answerEnum = pgEnum("answer_enum", ["yes", "no"]);
export const skillEnum = pgEnum("skill_enum", [
  "Excel",
  "SQL",
  "Power Bi",
  "Tableau",
  "Data Storytelling",
  "Other",
  "",
]);
export const applicationStatusEnum = pgEnum("application_status", [
  "pending",
  "accepted",
  "rejected",
]);

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

export const consultations = pgTable("consultations", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: text("user_id")
    .references(() => users.clerkId)
    .notNull(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  company: text("company"),
  challenge: text("challenge").notNull(),
  status: varchar("status", { length: 50 }).notNull().default("pending"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const registrations = pgTable(
  "registrations",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id")
      .references(() => users.id)
      .notNull(),

    // Step 1: Personal Information
    name: varchar("name", { length: 100 }).notNull(),
    email: varchar("email", { length: 255 }).notNull().unique(),
    phoneNo: varchar("phone_no", { length: 20 }).notNull(),
    gender: genderEnum("gender").notNull(),
    country: varchar("country", { length: 100 }).notNull(),

    // Step 2: Educational & Professional Background
    occupation: occupationEnum("occupation").notNull(),
    education: varchar("education", { length: 200 }).notNull(),
    experience: answerEnum("experience").notNull(),
    interest: text("interest").notNull(),
    skillOfInterest: jsonb("skill_of_interest").$type<string[]>().notNull(),

    // Step 3: Bootcamp-Specific Information
    sessionAttendance: answerEnum("session_attendance").notNull(),
    classHolding: answerEnum("class_holding").notNull(),
    classTiming: answerEnum("class_timing").notNull(),
    connection: answerEnum("connection").notNull(),
    device: answerEnum("device").notNull(),
    heardAboutUs: text("heard_about_us").notNull(),

    // Step 4: Proof of Payment
    additionalInfo: text("additional_info"),
    proofOfPayment: varchar("proof_of_payment_url", { length: 500 }).notNull(),
    // Metadata
    status: applicationStatusEnum("status").default("pending"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    // Indexes
    emailIdx: index("registrations_email_idx").on(table.email),
    userIdIdx: index("registrations_user_id_idx").on(table.userId),
    statusIdx: index("registrations_status_idx").on(table.status),
    createdAtIdx: index("registrations_created_at_idx").on(table.createdAt),
  })
);

// ---------- Relations ----------
export const usersRelations = relations(users, ({ many }) => ({
  // a user can have many applications
  applications: many(applications),
  consultations: many(consultations),
  registrations: many(registrations),
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

export const consultationsRelations = relations(consultations, ({ one }) => ({
  // a consultation belongs to one user
  user: one(users, {
    fields: [consultations.userId],
    references: [users.id],
  }),
}));

export const registrationsRelations = relations(registrations, ({ one }) => ({
  // each registration belongs to one user
  user: one(users, {
    fields: [registrations.userId],
    references: [users.id],
  }),
}));

// ---------- Type Inferences ----------

export type Subscriber = typeof subscribers.$inferSelect;
export type NewSubscriber = typeof subscribers.$inferInsert;

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export type Career = typeof careers.$inferSelect;
export type NewCareer = typeof careers.$inferInsert;

export type Registration = typeof registrations.$inferSelect;
export type NewRegistration = typeof registrations.$inferInsert;
