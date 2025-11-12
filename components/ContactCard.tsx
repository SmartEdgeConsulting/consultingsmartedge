import React from "react";

import { cn } from "@/lib/utils";
import { Mail } from "lucide-react";
import { contactInfoProps } from "@/types";

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
const ContactCard = ({
  id,
  icon: Icon,
  label,
  info,
  description,
}: contactInfoProps) => {
  return (
    <Card className="w-full flex flex-row gap-5 px-5">
      <div className="h-12 w-12 flex items-center justify-center rounded-lg bg-sec text-white">
        <Icon size={24} />
      </div>
      <div className="flex flex-col gap-1">
        <h3 className="text-lg font-semibold text-white">{label}</h3>
        <h4 className="text-base text-slate-200">{info}</h4>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>
    </Card>
  );
};

export default ContactCard;
