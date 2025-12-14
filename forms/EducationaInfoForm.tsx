"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  FormProps,
  occupationOptions,
  skillOptions,
  yesNoOptions,
} from "@/src/zod/constant/formOptions";

const EducationalInfo = ({ register, errors }: FormProps) => {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="space-y-2">
        <Label htmlFor="occupation">Current Occupation <span className="text-red-500">*</span></Label>
        <select
          id="occupation"
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-xs ring-offset-background file:border-0 file:bg-transparent file:text-xs file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          {...register("occupation")}
        >
          <option value="">Select occupation</option>
          {occupationOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        {errors.occupation && (
          <p className="text-xs text-red-500">{errors.occupation.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="education">Educational Background <span className="text-red-500">*</span></Label>
        <Input
          id="education"
          {...register("education")}
          placeholder="Bachelor's Degree in Computer Science"
        />
        {errors.education && (
          <p className="text-xs text-red-500">{errors.education.message}</p>
        )}
      </div>

      <div className="space-y-3">
        <Label>Do you have any prior experience in data analysis? <span className="text-red-500">*</span></Label>
        <div className="flex flex-row gap-4">
          {yesNoOptions.map((option, index) => (
            <div
              key={index}
              className="flex items-center space-x-2 border p-2 rounded-md"
            >
              <input
                type="radio"
                id={`experience-${option.toLowerCase()}`}
                value={option}
                {...register("experience")}
              />
              <label
                htmlFor={`experience-${option.toLowerCase()}`}
                className="text-sm font-normal cursor-pointer text-gray-400"
              >
                {option}
              </label>
            </div>
          ))}
        </div>
        {errors.experience && (
          <p className="text-xs text-red-500">{errors.experience.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="interest">
          What interests you about this bootcamp? <span className="text-red-500">*</span>
        </Label>
        <textarea
          id="interest"
          className="flex min-h-20 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          {...register("interest")}
          placeholder="I'm interested in learning data analysis..."
          rows={3}
        />
        {errors.interest && (
          <p className="text-xs text-red-500">{errors.interest.message}</p>
        )}
      </div>

      <div className="space-y-3">
        <Label>
          Which skills are you interested in learning? <span className="text-red-500">*</span> (Select all that apply)
        </Label>
        <div className="flex flex-col gap-4">
          {skillOptions.map((option, index) => (
            <div
              key={index}
              className="flex items-center space-x-2 border p-2 rounded-md w-full sm:w-[40%]"
            >
              <input
                type="checkbox"
                id={`skillOfInterest-${option.toLowerCase()}`}
                value={option}
                {...register("skillOfInterest")}
              />
              <label
                htmlFor={`skillOfInterest-${option.toLowerCase()}`}
                className="text-sm font-normal cursor-pointer text-gray-400"
              >
                {option}
              </label>
            </div>
          ))}
        </div>
        {errors.skillOfInterest && (
          <p className="text-xs text-red-500">
            {errors.skillOfInterest.message}
          </p>
        )}
      </div>
    </div>
  );
};

export default EducationalInfo;
