"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormProps, genderOptions } from "@/src/zod/constant/formOptions";

const PersonalInfo = ({ register, errors }: FormProps) => {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="space-y-2">
        <Label htmlFor="name">Full Name <span className="text-red-500">*</span></Label>
        <Input id="name" {...register("name")} placeholder="John Doe" />
        {errors.name && (
          <p className="text-xs text-red-500">{errors.name.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email Address <span className="text-red-500">*</span></Label>
        <Input
          id="email"
          type="email"
          {...register("email")}
          placeholder="john.doe@example.com"
        />
        {errors.email && (
          <p className="text-xs text-red-500">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="phoneNo">Phone Number <span className="text-red-500">*</span></Label>
        <Input
          id="phoneNo"
          type="tel"
          {...register("phoneNo")}
          placeholder="+1234567890"
        />
        {errors.phoneNo && (
          <p className="text-xs text-red-500">{errors.phoneNo.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label>Gender <span className="text-red-500">*</span></Label>
        <div className="flex flex-row gap-4">
          {genderOptions.map((option, index) => (
            <div key={index} className="flex items-center space-x-2 border p-2 rounded-md">
              <input
                type="radio"
                id={`gender-${option.toLowerCase()}`}
                value={option}
                {...register("gender")}
              />
              <label
                htmlFor={`gender-${option.toLowerCase()}`}
                className="text-sm font-normal cursor-pointer text-gray-400"
              >
                {option}
              </label>
            </div>
          ))}
        </div>
        {errors.gender && (
          <p className="text-xs text-red-500">{errors.gender.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="country">Country <span className="text-red-500">*</span></Label>
        <Input
          id="country"
          type="text"
          {...register("country")}
          placeholder="United States"
        />
        {errors.country && (
          <p className="text-xs text-red-500">{errors.country.message}</p>
        )}
      </div>
    </div>
  );
};

export default PersonalInfo;