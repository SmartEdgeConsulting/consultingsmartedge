// src/sanity/client.ts
import { createClient } from "@sanity/client";

export const serverClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: "2025-11-18", // Use current date or your preferred API version
  useCdn: false, // Disable CDN for server-side operations
  token: process.env.SANITY_API_TOKEN, // Use server-side token
});

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: "2025-11-18",
  useCdn: true, // Enable CDN for faster reads
});