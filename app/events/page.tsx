import Events from "@/sections/Events";
import EventsHero from "@/sections/hero/EventsHero";
import React from "react";
import { eventProps } from "@/types";
import { client } from "@/src/sanity/client";
import { getEvents } from "@/src/sanity/queries";

const options = { next: { revalidate: 30 } };
const EventsPage = async () => {
  const events: eventProps[] = await client.fetch(getEvents, {}, options);

  return (
    <main className="mt-16">
      <EventsHero />
      <Events events={events}/>
    </main>
  );
};

export default EventsPage;
