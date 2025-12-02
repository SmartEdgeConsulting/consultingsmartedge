CREATE TABLE "applications" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"career_id" uuid NOT NULL,
	"user_id" uuid NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"phone_number" varchar NOT NULL,
	"experience" text NOT NULL,
	"skills" text NOT NULL,
	"portfolio" text,
	"resume_url" text,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "careers" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"sanity_id" varchar(191) NOT NULL,
	"job_title" text NOT NULL,
	"slug" varchar(200),
	"job_description" text,
	"department" text,
	"job_type" varchar(50),
	"available" boolean DEFAULT false,
	"published_at" timestamp,
	"posted_at" timestamp DEFAULT now(),
	"sanity_rev" varchar(64) DEFAULT '',
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"deleted_at" timestamp,
	CONSTRAINT "careers_sanity_id_unique" UNIQUE("sanity_id")
);
--> statement-breakpoint
CREATE TABLE "subscribers" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" varchar(255) NOT NULL,
	"status" varchar(20) DEFAULT 'active' NOT NULL,
	"subscribed_at" timestamp DEFAULT now() NOT NULL,
	"unsubscribed_at" timestamp,
	CONSTRAINT "subscribers_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"clerk_id" text NOT NULL,
	"email" text NOT NULL,
	"first_name" text,
	"last_name" text,
	"phone_no" text,
	"image_url" text,
	"email_verified" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_clerk_id_unique" UNIQUE("clerk_id"),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "applications" ADD CONSTRAINT "applications_career_id_careers_id_fk" FOREIGN KEY ("career_id") REFERENCES "public"."careers"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "applications" ADD CONSTRAINT "applications_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "applications_career_idx" ON "applications" USING btree ("career_id");--> statement-breakpoint
CREATE INDEX "applications_user_idx" ON "applications" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "email_idx" ON "subscribers" USING btree ("email");