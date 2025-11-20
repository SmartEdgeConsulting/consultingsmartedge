import AnnouncementCard from "@/card-components/AnnouncementCard";
import Heading from "@/components/Heading";
import { client } from "@/src/sanity/client";
import { getAnnouncement } from "@/src/sanity/queries";
import { Calendar } from "lucide-react";
import React from "react";

const options = { next: { revalidate: 30 } };

const Announcement = async () => {
  const [announcement] = await client.fetch(getAnnouncement, {}, options);
  if (!announcement || announcement.length === 0) return null;

  return (
    <section className="py-10 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-10 lg:px-20">
        <div className="text-center mb-10">
          {/* Heading */}
          <Heading title="Upcoming Events" icon={<Calendar size={18} />} />
        </div>

        {/* Announcement Container */}
        <AnnouncementCard announcement={announcement} />
      </div>
    </section>
  );
};

export default Announcement;
