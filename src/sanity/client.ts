// src/sanity/client.ts
import { createClient } from "@sanity/client";

export const serverClient = createClient({
  projectId: process.env.SANITY_PROJECT_ID!,
  dataset: process.env.SANITY_DATASET!,
  apiVersion: "2025-11-18", // Use current date or your preferred API version
  useCdn: false, // Disable CDN for server-side operations
  token: process.env.SANITY_API_TOKEN, // Use server-side token
});

export const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID!,
  dataset: process.env.SANITY_DATASET!,
  apiVersion: "2025-11-18",
  useCdn: true, // Enable CDN for faster reads
});