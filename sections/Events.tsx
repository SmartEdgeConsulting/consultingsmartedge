import EventCard from "@/card-components/EventCard";
import Heading from "@/components/Heading";
import { client } from "@/src/sanity/client";
import { getEvents } from "@/src/sanity/queries";
import { eventProps } from "@/types";
import { Calendar } from "lucide-react";
import React from "react";

const Events = async () => {
  let events: eventProps[] = [];

  try {
    events = await client.fetch(getEvents, {}, { next: { revalidate: 30 } });
    console.log("Fetched team members:", events);
  } catch (error) {
    console.error("Failed to fetch team members:", error);
  }

  return (
    <section className="py-10 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-10 lg:px-20">
        <div className="text-center mb-10">
          {/* Heading */}
          <Heading title="Upcoming Events" icon={<Calendar size={18} />} />
          <h4 className="text-xl sm:text-2xl lg:text-3xl font-bold text-primary mb-6">
            Learn, Connect, and Grow with{" "}
            <span className="text-gradient-primary">SmartEdge</span>
          </h4>
        </div>
        {/* Events Container */}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
          {events.map((event) => {
            return <EventCard key={event._id} event={event} />;
          })}
        </div>
      </div>
    </section>
  );
};

export default Events;
