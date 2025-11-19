import imageUrlBuilder from '@sanity/image-url';
import { client } from '@/src/sanity/client';
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

const builder = imageUrlBuilder(client);

// Accept any valid Sanity image source
export const urlFor = (source: SanityImageSource) => {
  return builder.image(source);
};