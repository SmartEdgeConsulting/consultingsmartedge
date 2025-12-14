"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormProps, yesNoOptions } from "@/src/zod/constant/formOptions";

const BootcampInfo = ({ register, errors }: FormProps) => {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="grid grid-cols-1 gap-6">
        <div className="space-y-3">
          <Label>
            Are you able to commit to attending all Bootcamp sessions? <span className="text-red-500">*</span>
          </Label>
          <div className="flex flex-row gap-4">
            {yesNoOptions.map((option, index) => (
              <div
                key={index}
                className="flex items-center space-x-2 border p-2 rounded-md"
              >
                <input
                  type="radio"
                  id={`sessionAttendance-${option.toLowerCase()}`}
                  value={option}
                  {...register("sessionAttendance")}
                />
                <label
                  htmlFor={`sessionAttendance-${option.toLowerCase()}`}
                  className="text-sm font-normal cursor-pointer text-gray-400"
                >
                  {option}
                </label>
              </div>
            ))}
          </div>
          {errors.sessionAttendance && (
            <p className="text-xs text-red-500">
              {errors.sessionAttendance.message}
            </p>
          )}
        </div>

        <div className="space-y-3">
          <Label>Are you committed to attending Virtual classes? <span className="text-red-500">*</span></Label>
          <div className="flex flex-row gap-4">
            {yesNoOptions.map((option, index) => (
              <div
                key={index}
                className="flex items-center space-x-2 border p-2 rounded-md"
              >
                <input
                  type="radio"
                  id={`classHolding-${option.toLowerCase()}`}
                  value={option}
                  {...register("classHolding")}
                />
                <label
                  htmlFor={`classHolding-${option.toLowerCase()}`}
                  className="text-sm font-normal cursor-pointer text-gray-400"
                >
                  {option}
                </label>
              </div>
            ))}
          </div>
          {errors.classHolding && (
            <p className="text-xs text-red-500">
              {errors.classHolding.message}
            </p>
          )}
        </div>

        <div className="space-y-3">
          <Label>Are you able to commit at least 6 hours per week? <span className="text-red-500">*</span></Label>
          <div className="flex flex-row gap-4">
            {yesNoOptions.map((option, index) => (
              <div
                key={index}
                className="flex items-center space-x-2 border p-2 rounded-md"
              >
                <input
                  type="radio"
                  id={`classTiming-${option.toLowerCase()}`}
                  value={option}
                  {...register("classTiming")}
                />
                <label
                  htmlFor={`classTiming-${option.toLowerCase()}`}
                  className="text-sm font-normal cursor-pointer text-gray-400"
                >
                  {option}
                </label>
              </div>
            ))}
          </div>
          {errors.classTiming && (
            <p className="text-xs text-red-500">{errors.classTiming.message}</p>
          )}
        </div>

        <div className="space-y-3">
          <Label>Do you have a stable internet connection? <span className="text-red-500">*</span></Label>
          <div className="flex flex-row gap-4">
            {yesNoOptions.map((option, index) => (
              <div
                key={index}
                className="flex items-center space-x-2 border p-2 rounded-md"
              >
                <input
                  type="radio"
                  id={`connection-${option.toLowerCase()}`}
                  value={option}
                  {...register("connection")}
                />
                <label
                  htmlFor={`connection-${option.toLowerCase()}`}
                  className="text-sm font-normal cursor-pointer text-gray-400"
                >
                  {option}
                </label>
              </div>
            ))}
          </div>
          {errors.connection && (
            <p className="text-xs text-red-500">{errors.connection.message}</p>
          )}
        </div>

        <div className="space-y-3">
          <Label>
            Do you have a computer system to participate in this bootcamp? <span className="text-red-500">*</span>
          </Label>
          <div className="flex flex-row gap-4">
            {yesNoOptions.map((option, index) => (
              <div
                key={index}
                className="flex items-center space-x-2 border p-2 rounded-md"
              >
                <input
                  type="radio"
                  id={`device-${option.toLowerCase()}`}
                  value={option}
                  {...register("device")}
                />
                <label
                  htmlFor={`device-${option.toLowerCase()}`}
                  className="text-sm font-normal cursor-pointer text-gray-400"
                >
                  {option}
                </label>
              </div>
            ))}
          </div>
          {errors.device && (
            <p className="text-xs text-red-500">{errors.device.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="heardAboutUs">
          How did you hear about this Bootcamp? <span className="text-red-500">*</span>
        </Label>
        <Input
          id="heardAboutUs"
          {...register("heardAboutUs")}
          placeholder="e.g., Social media, Friend, Website, etc."
        />
        {errors.heardAboutUs && (
          <p className="text-xs text-red-500">{errors.heardAboutUs.message}</p>
        )}
      </div>
    </div>
  );
};

export default BootcampInfo;
