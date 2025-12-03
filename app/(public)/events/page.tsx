import Events from "@/sections/Events";
import EventsHero from "@/sections/hero/EventsHero";
import React from "react";
import { eventProps } from "@/types";
import { client } from "@/src/sanity/client";
import { getEvents } from "@/src/sanity/queries";

const EventsPage = async () => {
   let events: eventProps[] = [];
  
    try {
      events = await client.fetch(
        getEvents,
        {},
        { next: { revalidate: 30 } }
      );
      console.log("Fetched team members:", events);
    } catch (error) {
      console.error("Failed to fetch team members:", error);
      // Fall back to static data
    }

  return (
    <main className="mt-16">
      <EventsHero />
      <Events events={events}/>
    </main>
  );
};

export default EventsPage;
