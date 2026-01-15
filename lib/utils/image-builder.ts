import { createImageUrlBuilder } from "@sanity/image-url";
import { client } from "@/src/sanity/client";
import { SanityImageSource } from "@sanity/image-url";

const builder = createImageUrlBuilder(client);

// Accept any valid Sanity image source
export const urlFor = (source: SanityImageSource) => {
  return builder.image(source);
};
