import { db } from "./database"; 
import { users } from "./database/schema"; 
import { eq } from "drizzle-orm";

/**
 * Get user by Clerk ID
 */
export async function getUserByClerkId(clerkId: string) {
  const user = await db
    .select()
    .from(users)
    .where(eq(users.clerkId, clerkId))
    .limit(1);

  return user[0] || null;
}

/**
 * Get user by email
 */
export async function getUserByEmail(email: string) {
  const user = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  return user[0] || null;
}
