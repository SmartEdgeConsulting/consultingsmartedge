import React from "react";
import { Megaphone } from "lucide-react";

type AnnouncementProps = {
  _id: string;
  newAnnouncement: string;
};

const AnnouncementCard = ({
  announcement,
}: {
  announcement: AnnouncementProps;
}) => {
  return (
    <div className="flex justify-center">
      <div className="bg-primary rounded-2xl py-10 px-6 flex flex-col items-center text-white gap-5 max-w-5xl w-full">
        <Megaphone className="w-10 h-10 animate-pulse" />
        <p className="text-center text-sm sm:text-lg">
          {announcement.newAnnouncement}
        </p>
      </div>
    </div>
  );
};

export default AnnouncementCard;
