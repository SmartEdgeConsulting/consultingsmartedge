import { Clock } from "lucide-react";
import { Button } from "./ui/button";
import Image from "next/image";
import { Job } from "@/types";

const CareerCard = ({ job }: { job: Job }) => {
  return (
    <article
      key={job.id}
      className="group bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 border border-slate-200 overflow-hidden"
    >
      <div className="flex flex-col sm:flex-row gap-4 p-5 sm:p-6">
        {/* Company Logo */}
        <div className="shrink-0">
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border-2 border-slate-100 bg-white shadow-sm">
            <Image
              src="/logo.jpg"
              alt="SmartEdge logo"
              fill
              className="object-contain p-2"
              sizes="(max-width: 640px) 64px, 80px"
            />
          </div>
        </div>

        {/* Job Details */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-sec transition-colors">
              {job.title}
            </h3>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-sec/10 text-sec self-start">
              {job.department}
            </span>
          </div>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-4">
            {job.description}
          </p>

          {/* Job Meta Info */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 mb-4">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{job.jobType}</span>
            </div>
          </div>

          {/* Apply Button */}
          <Button asChild size="sm" className="mt-2">
            <a href={job.applyLink}>Apply Now</a>
          </Button>
        </div>
      </div>
    </article>
  );
};

export default CareerCard;
