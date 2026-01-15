import Events from '@/sections/Events'
import EventHero from '@/sections/hero/EventsHero'
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
  title: "Our Events - Check Out some of our Latest Events",
};

const EventsPage = () => {
  return (
    <main className="mt-16">
      <EventHero />
      <Events />
    </main>
  )
}

export default EventsPage
