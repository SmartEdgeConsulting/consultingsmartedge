import React from 'react';

const Heading = ({ title, icon }: { title: string, icon: React.ReactNode }) => {
  return (
    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-acc/10 mb-6 text-acc border border-acc">
      {icon}
      <span className="text-sm font-medium">{title}</span>
    </div>
  );
};

export default Heading;
