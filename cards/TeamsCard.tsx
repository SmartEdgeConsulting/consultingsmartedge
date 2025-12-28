import React from "react";
import { teamsProps } from "@/types";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { urlFor } from "@/lib/utils/image-builder";

function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn("bg-primary/10 p-1 rounded-full", className)}
      {...props}
    />
  );
}

const TeamsCard = ({ _id, name, skill, profilePicture }: teamsProps) => {
  const imageSrc = profilePicture?.asset
    ? urlFor(profilePicture.asset).url()
    : undefined;

  const getInitials = (fullName: string) => {
    const names = fullName?.trim().split(" ") || [];
    if (names.length === 0) return "?";
    if (names.length === 1) return names[0].charAt(0).toUpperCase();
    return (
      names[0].charAt(0).toUpperCase() +
      names[names.length - 1].charAt(0).toUpperCase()
    );
  };

  return (
    <Card className="w-full group">
      <div className="bg-white flex items-center gap-3 rounded-full pr-6">
        <Avatar className="w-24 h-24 ring-4 ring-transparent transition-all duration-300 shrink-0">
          <AvatarImage
            src={imageSrc}
            alt={`${name} avatar`}
            className="object-cover"
          />
          <AvatarFallback className="w-24 h-24 text-2xl font-bold bg-linear-to-br from-gray-200 to-gray-300 text-black">
            {getInitials(name)}
          </AvatarFallback>
        </Avatar>

        <div className="flex flex-col justify-center text-left flex-1 min-w-0">
          <h3 className="text-base font-bold text-primary truncate">{name}</h3>
          <p className="text-sm text-slate-800 font-normal truncate">{skill}</p>
        </div>
      </div>
    </Card>
  );
};

export default TeamsCard;
