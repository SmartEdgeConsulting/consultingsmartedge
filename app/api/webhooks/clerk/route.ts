import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { db } from "@/lib/database";
import { users } from "@/lib/database/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

// Proper Clerk webhook event types
interface ClerkEmailAddress {
  id: string;
  email_address: string;
  verification?: {
    status: string;
    strategy: string;
  };
}

interface ClerkUserData {
  id: string;
  email_addresses: ClerkEmailAddress[];
  primary_email_address_id: string;
  first_name: string | null;
  last_name: string | null;
  image_url: string;
  unsafe_metadata?: Record<string, unknown>;
  created_at: number;
  updated_at: number;
}

interface ClerkDeletedUserData {
  id: string;
  deleted: boolean;
  object: "user";
}

type ClerkWebhookEvent =
  | { type: "user.created"; data: ClerkUserData }
  | { type: "user.updated"; data: ClerkUserData }
  | { type: "user.deleted"; data: ClerkDeletedUserData };

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    console.error("❌ Error: CLERK_WEBHOOK_SECRET is not set");
    return NextResponse.json(
      { error: "Webhook secret not configured" },
      { status: 500 }
    );
  }

  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    console.error("❌ Error: Missing svix headers");
    return NextResponse.json(
      { error: "Missing svix headers" },
      { status: 400 }
    );
  }

  const payload = await req.text();
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  try {
    evt = wh.verify(payload, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("❌ Error verifying webhook:", err);
    return NextResponse.json(
      { error: "Webhook verification failed" },
      { status: 400 }
    );
  }

  const eventType = evt.type;
  console.log(`\n📥 ========== WEBHOOK RECEIVED: ${eventType} ==========`);

  try {
    const typedEvent = evt as ClerkWebhookEvent;

    switch (typedEvent.type) {
      case "user.created":
        await handleUserCreated(typedEvent.data);
        break;

      case "user.updated":
        await handleUserUpdated(typedEvent.data);
        break;

      case "user.deleted":
        await handleUserDeleted(typedEvent.data);
        break;

      default:
        console.log(`🤷 Unhandled event type: ${eventType}`);
    }

    return NextResponse.json(
      { message: "Webhook processed successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(`💥 Error processing ${eventType}:`, error);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    );
  }
}

/**
 * Handle user.created event
 */
async function handleUserCreated(data: ClerkUserData) {
  console.log("🆕 HANDLE USER CREATED CALLED");
  console.log("📦 Raw data:", JSON.stringify(data, null, 2));

  const {
    id,
    email_addresses,
    first_name,
    last_name,
    image_url,
    unsafe_metadata,
    primary_email_address_id,
  } = data;

  if (!id || !email_addresses || !primary_email_address_id) {
    console.error("❌ Missing required user data");
    throw new Error("Missing required user data");
  }

  // Extract primary email
  const primaryEmail = email_addresses.find(
    (email) => email.id === primary_email_address_id
  );

  if (!primaryEmail) {
    console.error("❌ No primary email found");
    throw new Error("No primary email found");
  }

  // Check email verification status
  const isEmailVerified = primaryEmail.verification?.status === 'verified';
  
  console.log("📧 Email Details:", {
    email: primaryEmail.email_address,
    verificationStatus: primaryEmail.verification?.status,
    isVerified: isEmailVerified
  });

  // Check if user already exists in database
  console.log("🔍 Checking if user exists in database...");
  try {
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.clerkId, id))
      .limit(1);

    if (existingUser.length > 0) {
      console.log("⚠️ User already exists in database:", existingUser[0]);
      return existingUser[0];
    }
  } catch (dbError) {
    console.error("❌ Database error checking existing user:", dbError);
    throw dbError;
  }

  console.log("✅ User does not exist in database, proceeding with creation...");

  // CREATE USER REGARDLESS OF VERIFICATION STATUS
  // We'll handle verification in the user.updated event
  try {
    console.log("💾 Attempting to insert user into database...");
    
    const newUser = await db
      .insert(users)
      .values({
        clerkId: id,
        email: primaryEmail.email_address,
        firstName: first_name || null,
        lastName: last_name || null,
        imageUrl: image_url || null,
        phoneNo: (unsafe_metadata?.phoneNo as string) || null,
        // Add these fields to your schema if they don't exist
        emailVerified: isEmailVerified,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning();

    console.log("✅ SUCCESS: User created in database:", newUser[0]);
    return newUser[0];
    
  } catch (insertError) {
    console.error("❌ FAILED: Error inserting user into database:", insertError);
    throw insertError;
  }
}

/**
 * Handle user.updated event - This is crucial for email verification
 */
async function handleUserUpdated(data: ClerkUserData) {
  console.log("🔄 HANDLE USER UPDATED CALLED");
  console.log("📦 Raw data:", JSON.stringify(data, null, 2));

  const {
    id,
    email_addresses,
    first_name,
    last_name,
    image_url,
    unsafe_metadata,
    primary_email_address_id,
  } = data;

  if (!id) {
    console.error("❌ No user ID provided");
    throw new Error("No user ID provided");
  }

  // Extract primary email
  const primaryEmail = email_addresses?.find(
    (email) => email.id === primary_email_address_id
  );

  if (!primaryEmail) {
    console.error("❌ No primary email found for update");
    throw new Error("No primary email found for update");
  }

  // Check if email is now verified
  const isEmailVerified = primaryEmail.verification?.status === 'verified';
  
  console.log("📧 Email Verification Status:", {
    email: primaryEmail.email_address,
    verificationStatus: primaryEmail.verification?.status,
    isVerified: isEmailVerified
  });

  // Check if user exists in database
  console.log("🔍 Checking if user exists in database for update...");
  let existingUser;
  try {
    existingUser = await db
      .select()
      .from(users)
      .where(eq(users.clerkId, id))
      .limit(1);

    console.log("📊 Existing user check result:", existingUser.length > 0 ? "FOUND" : "NOT FOUND");
    
  } catch (dbError) {
    console.error("❌ Database error checking existing user:", dbError);
    throw dbError;
  }

  if (existingUser.length > 0) {
    // Update existing user
    console.log("🔄 Updating existing user in database...");
    try {
      const updatedUser = await db
        .update(users)
        .set({
          email: primaryEmail.email_address,
          firstName: first_name || null,
          lastName: last_name || null,
          imageUrl: image_url || null,
          phoneNo: (unsafe_metadata?.phoneNo as string) || null,
          emailVerified: isEmailVerified, // Update verification status
          updatedAt: new Date(),
        })
        .where(eq(users.clerkId, id))
        .returning();

      console.log("✅ SUCCESS: User updated in database:", updatedUser[0]);
      return updatedUser[0];
      
    } catch (updateError) {
      console.error("❌ FAILED: Error updating user in database:", updateError);
      throw updateError;
    }
  } else {
    // User doesn't exist in database - create them
    console.log("🆕 User not found in database, creating now...");
    try {
      const newUser = await db
        .insert(users)
        .values({
          clerkId: id,
          email: primaryEmail.email_address,
          firstName: first_name || null,
          lastName: last_name || null,
          imageUrl: image_url || null,
          phoneNo: (unsafe_metadata?.phoneNo as string) || null,
          emailVerified: isEmailVerified,
          createdAt: new Date(),
          updatedAt: new Date(),
        })
        .returning();

      console.log("✅ SUCCESS: User created during update:", newUser[0]);
      return newUser[0];
      
    } catch (insertError) {
      console.error("❌ FAILED: Error creating user during update:", insertError);
      throw insertError;
    }
  }
}

/**
 * Handle user.deleted event
 */
async function handleUserDeleted(data: ClerkDeletedUserData) {
  console.log("🗑️ HANDLE USER DELETED CALLED");
  const { id } = data;

  if (!id) {
    throw new Error("No user ID provided");
  }

  try {
    const deletedUser = await db
      .delete(users)
      .where(eq(users.clerkId, id))
      .returning();

    if (!deletedUser.length) {
      console.warn(`⚠️ User with Clerk ID ${id} not found for deletion`);
    } else {
      console.log("✅ User deleted from database:", id);
    }

    return deletedUser[0];
  } catch (error) {
    console.error("❌ Error deleting user from database:", error);
    throw error;
  }
}