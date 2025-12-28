import React from "react";

import { cn } from "@/lib/utils";
import { contactInfoProps } from "@/types";
import * as Icons from "lucide-react";

function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn(
        "bg-primary/10 text-card-foreground flex flex-col gap-6 rounded-xl py-4 shadow-sm",
        className
      )}
      {...props}
    />
  );
}
const ContactCard = ({
  id,
  icon: iconName,
  label,
  info,
  description,
}: contactInfoProps) => {

  const Icon = Icons[iconName as keyof typeof Icons] as React.ComponentType<{
    size: number;
  }>;

  return (
    <Card className="w-full flex flex-row gap-5 px-4 items-start">
      <div className="h-12 w-12 shrink-0 flex items-center justify-center rounded-lg bg-gradient-primary text-white">
        {Icon && <Icon size={24} />}
      </div>
      <div className="flex flex-col gap-1">
        <h3 className="text-sm sm:text-base font-semibold text-primary">
          {label}
        </h3>
        <h4 className="text-xs sm:text-sm text-slate-800">{info}</h4>
        <p className="text-gray-400 text-xs">{description}</p>
      </div>
    </Card>
  );
};

export default ContactCard;
