import { createClient } from "@sanity/client";

export const serverClient = createClient({
  projectId: process.env.SANITY_PROJECT_ID!,
  dataset: process.env.SANITY_DATASET!,
  apiVersion: "2025-11-18", 
  useCdn: false, 
  token: process.env.SANITY_API_TOKEN,
});

export const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID!,
  dataset: process.env.SANITY_DATASET!,
  apiVersion: "2025-11-18",
  useCdn: true, 
});