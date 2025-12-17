import React from "react";

const Heading = ({ title, icon }: { title: string; icon: React.ReactNode }) => {
  return (
    <div className="inline-flex items-center gap-2.5 rounded-full bg-primary/10 px-4 py-2 text-sm font-bold text-primary mb-4">
      {icon}
      <span className="text-sm font-medium">{title}</span>
    </div>
  );
};

export default Heading;
