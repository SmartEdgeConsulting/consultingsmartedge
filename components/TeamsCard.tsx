import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { CardContent, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import { Linkedin, Mail } from "lucide-react";
import { teamsProps } from "@/types";

import { cn } from "@/lib/utils";

function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn(
        "bg-[#0b1d3a60] text-card-foreground flex flex-col gap-6 rounded-xl border border-[#0b1d3a] py-6 shadow-sm",
        className
      )}
      {...props}
    />
  );
}
const TeamsCard = ({ id, name, role, bio, skills, avatar }: teamsProps) => {
  console.log(id);
  return (
    <Card className="w-full max-w-md flex flex-col ">
      <CardHeader className="flex justify-center space-x-4 pb-4">
        <Avatar>
          <AvatarImage src={avatar} alt={`${name} avatar`} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </CardHeader>

      <CardContent className="flex items-center flex-col">
        <h3 className="text-lg font-medium text-white mb-3.5">{name}</h3>
        <h5 className="text-sm text-muted-foreground mb-5">{role}</h5>
        <p className="text-center text-white text-sm mb-5">{bio}</p>
        <ul className="flex flex-wrap justify-center gap-1.5 mb-4">
          {skills.map((skill, index) => {
            return (
              <li
                key={index}
                className="inline-flex items-center px-2 py-1 rounded-full border border-sec bg-sec/30 text-sec text-xs"
              >
                {skill}
              </li>
            );
          })}
        </ul>
        <div className="flex gap-5">
          <Button variant="outline">
            <Mail />
          </Button>
          <Button variant="outline">
            <Linkedin />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TeamsCard;
