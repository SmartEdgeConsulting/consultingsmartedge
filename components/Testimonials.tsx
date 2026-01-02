import React from "react";
import Heading from "./Heading";
import { Quote } from "lucide-react";
import { videotestimonialProps } from "@/types";
import { client } from "@/src/sanity/client";

// Helper function to get video URL from Sanity
const getVideoUrl = (ref: string) => {
  // Extract the file ID from the ref
  // Format: file-{fileId}-{extension}
  const [, fileId, extension] = ref.match(/^file-([a-f0-9]+)-(\w+)$/) || [];

  if (!fileId || !extension) {
    console.error("Invalid video reference:", ref);
    return "";
  }

  // Construct the Sanity CDN URL for the video
  const projectId = client.config().projectId;
  const dataset = client.config().dataset;

  return `https://cdn.sanity.io/files/${projectId}/${dataset}/${fileId}.${extension}`;
};

const Testimonials = ({
  testimonials,
}: {
  testimonials: videotestimonialProps[];
}) => {
  console.log(testimonials);

  return (
    <section
      id="testimonials"
      className="scroll-mt-18 py-10 sm:py-12 lg:py-14 text-center bg-primary/10 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <Heading title="Testimonials" icon={<Quote />} />
        <p className="hero-paragraph">
          Watch our alumni share their success stories
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6 lg:gap-8 py-5">
          {testimonials.map((testimonial) => {
            const videoUrl = getVideoUrl(testimonial.video.asset._ref);

            return (
              <div
                key={testimonial._id}
                className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-white h-64 sm:h-80 lg:h-96"
              >
                {/* Video Player */}
                <video
                  className="w-full h-full object-cover"
                  controls
                  playsInline
                >
                  <source src={videoUrl} type="video/mp4" />
                  Your browser does not support video playback.
                </video>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
