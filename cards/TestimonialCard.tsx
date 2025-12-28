import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { testimonialProps } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";
import { urlFor } from "@/lib/utils/image-builder";

const TestimonialCard = ({
  testimonials,
}: {
  testimonials: testimonialProps[];
}) => {
  console.log("Fetched team members:", testimonials);

  return (
    <div className="px-4 sm:px-10 lg:px-20 py-5">
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full max-w-md mx-auto"
      >
        <CarouselContent>
          {testimonials.map((testimonial, index) => {
            const imageSrc = testimonial.profilePicture?.asset
              ? urlFor(testimonial.profilePicture.asset).url()
              : undefined;

            return (
              <CarouselItem key={index} className="basis-1/2 sm:basis-1/3">
                <div className="p-1 h-full">
                  <Card className="border border-slate-200 shadow-md hover:shadow-xl transition-all duration-300 bg-slate-50 h-full group relative overflow-hidden">
                    <CardContent className="p-8 flex flex-col h-full">
                      {/* Avatar */}
                      <div className="flex justify-center mb-6 -mt-16">
                        <Avatar className="w-24 h-24 border-4 border-white shadow-lg">
                          <AvatarImage
                            src={imageSrc}
                            alt={`${testimonial.name} profile picture`}
                            className="object-cover"
                          />
                          <AvatarFallback className="bg-linear-to-br from-orange-400 to-yellow-500 text-white text-2xl font-bold">
                            {testimonial.name?.charAt(0) || "?"}
                          </AvatarFallback>
                        </Avatar>
                      </div>

                      {/* Testimony */}
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {`“${testimonial.testimony}`}
                      </p>

                      {/* Author Info */}
                      <div className="text-center pt-4 border-t border-slate-200">
                        <h4 className="font-bold text-orange-500 text-base mb-1">
                          {testimonial.name}
                        </h4>
                        <p className="text-slate-500 text-xs">
                          {testimonial.title}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default TestimonialCard;
