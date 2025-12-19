import UpcomingEventCard from "@/cards/UpcomingEventCard";
import Heading from "@/components/Heading";
import { client } from "@/src/sanity/client";
import { getUpcomingEvents } from "@/src/sanity/queries";
import { eventProps } from "@/types";
import { Calendar } from "lucide-react";
import React from "react";

const UpcomingEvents = async () => {
  let events: eventProps[] = [];

  try {
    events = await client.fetch(getUpcomingEvents, {}, { next: { revalidate: 30 } });
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
            return <UpcomingEventCard key={event._id} event={event} />;
          })}
        </div>
      </div>
    </section>
  );
};

export default UpcomingEvents;
