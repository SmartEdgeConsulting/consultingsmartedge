import EventCard from "@/cards/EventCard";
import { client } from "@/src/sanity/client";
import { getEvents } from "@/src/sanity/queries";
import { eventProps } from "@/types";
import React from "react";

const Events = async () => {
  let events: eventProps[] = [];

  try {
    events = await client.fetch(getEvents, {}, { next: { revalidate: 30 } });
  } catch (error) {
    console.error("Failed to fetch team members:", error);
  }

  return (
    <section className="py-12 sm:py-16 lg:py-20 scroll-mt-16 bg-primary/10 my-10">
      <div className="flex flex-col gap-10 max-w-7xl mx-auto px-4 sm:px-10 lg:px-20">
        {events.map((event, index) => {
          return <EventCard key={event._id} event={event} index={index} />;
        })}
      </div>
    </section>
  );
};

export default Events;
