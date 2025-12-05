"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { File, FileSpreadsheet, X } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { useDropzone, FileRejection } from "react-dropzone";

import React, { useCallback, useState } from "react";

type FormData = {
  company: string;
  email: string;
  purpose: string;
  file: File | undefined;
};

const DataLab = () => {
  const [formData, setFormData] = useState<FormData>({
    company: "",
    email: "",
    purpose: "",
    file: undefined,
  });

  //Function for handling input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
      // Handle rejected files
      if (rejectedFiles.length > 0) {
        const rejection = rejectedFiles[0];
        if (rejection.errors[0].code === "file-too-large") {
          console.log("File is too large. Maximum size is 4MB.");
        } else if (rejection.errors[0].code === "file-invalid-type") {
          console.log(
            "Invalid file type. Please upload CSV or Excel files only."
          );
        }
        return;
      }

      // Handle accepted files
      if (acceptedFiles.length > 0) {
        const uploadedFile = acceptedFiles[0];
        setFormData((prev) => ({ ...prev, file: uploadedFile }));
        console.log("");
      }
    },
    []
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      // CSV
      "text/csv": [".csv"],
      // Excel
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
        ".xlsx",
      ],
      "application/vnd.ms-excel": [".xls"],
      // Fallback for some browsers
      "application/octet-stream": [".csv", ".xls", ".xlsx"],
    },
    maxSize: 4 * 1024 * 1024, // 4MB
    multiple: false,
  });

  //Function to un-select file
  const removeFile = () => {
    setFormData((prev) => ({ ...prev, resume: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.file) {
      console.log("Please choose a file");
      return;
    }

    // Validate form fields
    if (!formData.email || !formData.company || !formData.purpose) {
      console.log("please file the required fields");
      return;
    }

    try {
      // Send to your API endpoint

      // Reset form
      setFormData({
        company: "",
        email: "",
        purpose: "",
        file: undefined,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="py-10 sm:py-16 scroll-mt-18" id="custom-report">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <form
          onSubmit={handleSubmit}
          className="rounded-lg shadow-lg p-10 bg-primary/10"
        >
          <div className="flex flex-col gap-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-semibold">
                  Email Address <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  required
                  className="h-12 border-gray-300 bg-white focus:border-primary focus:ring-primary"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="industry" className="text-sm font-semibold">
                  Industry <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="industry"
                  type="text"
                  placeholder="Industry name"
                  required
                  className="h-12 border-gray-300 bg-white focus:border-primary focus:ring-primary"
                />
              </div>
            </div>

            <div className="space-y-2"> 
              <Label htmlFor="problem" className="text-sm font-semibold">
                Data Problem
              </Label>
              <Textarea
                rows={6}
                id="problem"
                name="problem"
                placeholder="Tell us the problem the data wants to solve.."
                value={formData.purpose}
                onChange={handleChange}
                required
                className="resize-none border-gray-300 bg-white focus:border-primary focus:ring-primary min-h-[120px]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="timeline" className="text-sm font-semibold">
                  Timeline
                </Label>
                <Input
                  id="timeline"
                  type="date"
                  className="h-12 border-gray-300 bg-white focus:border-primary focus:ring-primary text-gray-700"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="budget" className="text-sm font-semibold">
                  Budget Range
                </Label>
                <select
                  id="budget"
                  className="w-full h-12 px-3 rounded-md border border-gray-300 bg-white text-gray-900 focus:border-primary focus:ring-primary focus:outline-none"
                >
                  <option value="">Select a range</option>
                  <option value="under-5k">Under $5,000</option>
                  <option value="5k-15k">$5,000 - $15,000</option>
                  <option value="15k-30k">$15,000 - $30,000</option>
                  <option value="30k-plus">$30,000+</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-primary">
                Upload file
              </Label>

              <div className="w-full bg-white p-5 rounded-lg">
                <div
                  {...getRootProps()}
                  className="border-2 border-dashed border-primary rounded-lg p-8 text-center cursor-pointer hover:border-primary transition-colors"
                >
                  <input {...getInputProps()} />
                  <div>
                    {formData.file ? (
                      <div className="flex items-center gap-3 bg-slate-50 px-4 py-3 rounded-lg">
                        <FileSpreadsheet className="w-5 h-5 text-indigo-600" />
                        <span className="font-medium text-gray-700">
                          {formData.file.name}
                        </span>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeFile();
                          }}
                          className="ml-2 text-gray-400 hover:text-red-500"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : isDragActive ? (
                      <p className="text-gray-700">Drop the file here ...</p>
                    ) : (
                      <div className="flex flex-col justify-center items-center gap-2.5">
                        <p className="text-gray-700 text-sm">
                          Drag and drop your spreadsheet here
                        </p>
                        <Button className="rounded-full px-10">
                          <File className="h-20 w-20 font-bold" />
                          Upload File
                        </Button>
                        <p className="text-sm text-gray-500 mt-2">
                          or click to browse
                        </p>
                        <p className="text-sm text-gray-500 mt-2">
                          Supported formats:{" "}
                          <strong>CSV, Excel (max 4MB)</strong>
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <Button
              type="submit"
              className="font-bold"
              disabled={!formData.file}
            >
              Request
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default DataLab;
