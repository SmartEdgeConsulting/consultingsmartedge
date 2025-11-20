import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "yx2wwn4b",
  dataset: "production",
  apiVersion: "2025-11-18",
  useCdn: true,
  perspective: "published",
});
