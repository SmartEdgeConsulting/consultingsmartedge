import React from "react";
import { Button } from "@/components/ui/button";
import { Linkedin, Mail } from "lucide-react";
import { teamsProps } from "@/types";

import { cn } from "@/lib/utils";
import { CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn(
        "bg-primary text-card-foreground flex flex-col gap-6 rounded-xl py-6 shadow-md",
        className
      )}
      {...props}
    />
  );
}
const TeamsCard = ({ id, name, role, bio, skills, avatar }: teamsProps) => {
  return (
    <Card className="w-full max-w-md flex flex-col ">
      <CardHeader className="flex justify-center space-x-4 pb-4">
        <Avatar>
          <AvatarImage src={avatar} alt={`${name} avatar`} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </CardHeader>

      <CardContent className="flex items-center flex-col">
        <h3 className="text-lg font-bold text-white mb-3.5">{name}</h3>
        <h5 className="text-base text-slate-300 mb-5">{role}</h5>
        <p className="text-center text-slate-300 leading-6 text-sm mb-5">
          {bio}
        </p>
        <ul className="flex flex-wrap justify-center gap-1.5 mb-4">
          {skills.map((skill, index) => {
            return (
              <li
                key={index}
                className="inline-flex items-center px-2 py-1 rounded-full border border-secondary bg-secondary/30 text-gradient-primary text-xs"
              >
                {skill}
              </li>
            );
          })}
        </ul>
        <div className="flex gap-5">
          <Button variant="icon" size="xs">
            <Mail />
          </Button>
          <Button variant="icon" size="xs">
            <Linkedin />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TeamsCard;
