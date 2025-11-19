import { toPlainText } from "@portabletext/react";
import { PortableTextContent } from "@/types";

export default function getReadingTime(content: PortableTextContent[]): string {
  const text = toPlainText(content);
  const words = text.trim().split(/\s+/).length;
  const readingTimeMinutes = Math.ceil(words / 200);
  
  if (readingTimeMinutes > 1) {
    return `${readingTimeMinutes} mins read`;
  } else {
    return `${readingTimeMinutes} min read`;
  }
}