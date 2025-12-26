"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { File, FileSpreadsheet, X, Loader2, CheckCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { useParams } from "next/navigation";
import { ApplicationFormData, applicationSchema } from "@/src/zod/schema";
import { useDropzone } from "@uploadthing/react";
import { useUploadThing } from "@/lib/utils/uploadthing";
import {
  generateClientDropzoneAccept,
  generatePermittedFileTypes,
} from "uploadthing/client";

interface ApplicationFormProps {
  careerId?: string;
  title: string;
  description: string | null;
}

const ApplicationForm = ({
  careerId: propCareerId,
  title,
  description,
}: ApplicationFormProps) => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState<string>("");
  const [uploadStatus, setUploadStatus] = useState<
    "idle" | "uploading" | "success" | "error"
  >("idle");

  const params = useParams();
  const careerId = propCareerId || (params.id as string);

  // Initialize React Hook Form
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    trigger,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      careerId: careerId || "",
      name: "",
      email: "",
      phoneNumber: "",
      experience: 0,
      skills: "",
      portfolio: "",
      resumeUrl: "",
    },
  });

  // Initialize UploadThing
  const { startUpload, routeConfig, isUploading } = useUploadThing(
    "resumeUploader",
    {
      onClientUploadComplete: (res) => {
        console.log("Upload complete:", res);

        if (res && res[0]) {
          const url = res[0].ufsUrl;
          console.log("File URL received:", url);

          if (url) {
            setFileUrl(url);
            setValue("resumeUrl", url, { shouldValidate: true });
            setUploadStatus("success");
            toast.success("Resume uploaded successfully!");
          } else {
            console.error("No URL found in response:", res[0]);
            setUploadStatus("error");
            toast.error("Upload completed but no URL received");
          }
        }
      },
      onUploadError: (error: Error) => {
        console.error("Upload error:", error);
        setUploadStatus("error");
        toast.error(`Upload failed: ${error.message}`);
        setUploadedFile(null);
        setValue("resumeUrl", "", { shouldValidate: true });
      },
      onUploadBegin: (fileName: string) => {
        console.log("Upload begin:", fileName);
        setUploadStatus("uploading");
      },
    }
  );

  const acceptedFileTypes = routeConfig
    ? generateClientDropzoneAccept(
        generatePermittedFileTypes(routeConfig).fileTypes
      )
    : {
        "application/pdf": [".pdf"],
        "application/msword": [".doc"],
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
          [".docx"],
      };

  // Use UploadThing's dropzone hook
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: useCallback(
      async (acceptedFiles: File[]) => {
        if (acceptedFiles.length > 0) {
          const file = acceptedFiles[0];

          setUploadedFile(file);
          setFileUrl("");
          setValue("resumeUrl", "", { shouldValidate: false });
          setUploadStatus("uploading");

          try {
            // Start the upload
            await startUpload([file]);
          } catch (error) {
            console.error("Upload error:", error);
            setUploadStatus("error");
            toast.error("Upload failed. Please try again.");
            setUploadedFile(null);
            setFileUrl("");
            setValue("resumeUrl", "", { shouldValidate: true });
          }
        }
      },
      [startUpload, setValue]
    ),
    accept: acceptedFileTypes,
    maxFiles: 1,
    maxSize: 4 * 1024 * 1024, // 4MB
    multiple: false,
  });

  // Watch the resumeUrl field
  const resumeUrlValue = watch("resumeUrl");

  // Function to remove selected file
  const removeFile = useCallback(() => {
    setUploadedFile(null);
    setFileUrl("");
    setValue("resumeUrl", "", { shouldValidate: true });
    setUploadStatus("idle");
    toast.info("Resume removed");
  }, [setValue]);

  useEffect(() => {
    if (careerId) {
      setValue("careerId", careerId, { shouldValidate: true });
    }
  }, [careerId, setValue]);

  // Trigger validation when resumeUrl changes
  useEffect(() => {
    if (resumeUrlValue) {
      trigger("resumeUrl");
    }
  }, [resumeUrlValue, trigger]);

  // Form submission handler
  const onSubmit = async (data: ApplicationFormData) => {
    try {
      // Validate resume is uploaded
      if (!data.resumeUrl || data.resumeUrl.trim() === "") {
        toast.error("Please upload your resume before submitting");
        return;
      }

      const response = await fetch("/api/applications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to submit application");
      }

      const result = await response.json();
      console.log("Submission successful:", result);

      toast.success("Application submitted successfully!");

      // Reset form
      reset();
      setUploadedFile(null);
      setFileUrl("");
      setUploadStatus("idle");
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("Failed to submit application. Please try again.");
    }
  };

  return (
    <section className="py-8 sm:py-12 lg:py-16">
      <div className="max-w-4xl mx-auto shadow-xl rounded-2xl overflow-hidden bg-white border border-gray-200">
        {/* Form Header */}
        <div className="bg-linear-to-r from-primary/10 to-primary/5 p-6 border-b border-gray-100">
          <h2 className="text-2xl sm:text-3xl font-bold text-primary">
            Apply for {title}
          </h2>
          <p className="text-gray-600 mt-2">{description}</p>
        </div>

        {/* Application Form Section */}
        <div className="w-full p-6 sm:p-8 lg:p-10">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Name Field */}
            <div className="grid gap-2">
              <Label htmlFor="name">
                Name <span className="text-red-400">*</span>{" "}
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Jane Doe"
                {...register("name")}
                className={errors.name ? "border-red-500" : ""}
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>

            {/* Email Field */}
            <div className="grid gap-2">
              <Label htmlFor="email">
                Email <span className="text-red-400">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="JaneDoe@gmail.com"
                {...register("email")}
                className={errors.email ? "border-red-500" : ""}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            {/* Phone Number Field */}
            <div className="grid gap-2">
              <Label htmlFor="phoneNumber">
                Phone Number <span className="text-red-400">*</span>
              </Label>
              <Input
                id="phoneNumber"
                type="tel"
                placeholder="+1 (555) 123-4567"
                {...register("phoneNumber")}
                className={errors.phoneNumber ? "border-red-500" : ""}
              />
              {errors.phoneNumber && (
                <p className="text-red-500 text-sm">
                  {errors.phoneNumber.message}
                </p>
              )}
            </div>

            {/* Experience Field */}
            <div className="grid gap-2">
              <Label htmlFor="experience">
                Years of Experience <span className="text-red-400">*</span>{" "}
              </Label>
              <Input
                id="experience"
                type="number"
                placeholder="5"
                min="0"
                max="50"
                {...register("experience", { valueAsNumber: true })}
                className={errors.experience ? "border-red-500" : ""}
              />
              {errors.experience && (
                <p className="text-red-500 text-sm">
                  {errors.experience.message}
                </p>
              )}
            </div>

            {/* Skills Field */}
            <div className="grid gap-2">
              <Label htmlFor="skills">
                Skills & Experience <span className="text-red-400">*</span>
              </Label>
              <Textarea
                id="skills"
                placeholder="Tell us about yourself and skills you possess for this job (minimum 10 characters)"
                rows={4}
                {...register("skills")}
                className={`${errors.skills ? "border-red-500" : ""} min-h-[100px]`}
              />
              {errors.skills && (
                <p className="text-red-500 text-sm">{errors.skills.message}</p>
              )}
            </div>

            {/* Portfolio Field */}
            <div className="grid gap-2">
              <Label htmlFor="portfolio">Portfolio Link (Optional)</Label>
              <Input
                id="portfolio"
                type="url"
                placeholder="https://yourportfolio.com"
                {...register("portfolio")}
                className={errors.portfolio ? "border-red-500" : ""}
              />
              {errors.portfolio && (
                <p className="text-red-500 text-sm">
                  {errors.portfolio.message}
                </p>
              )}
            </div>

            {/* Resume Upload Field */}
            <div className="grid gap-2">
              <Label htmlFor="resume">
                Resume <span className="text-red-400">*</span>
              </Label>
              <div className="w-full bg-white p-5 rounded-lg">
                <div
                  {...getRootProps()}
                  className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                    errors.resumeUrl
                      ? "border-red-500 bg-red-50"
                      : isDragActive
                        ? "border-primary bg-primary/10"
                        : "border-gray-300 hover:border-primary hover:bg-gray-50"
                  } ${isUploading || uploadStatus === "uploading" ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  <input {...getInputProps()} />
                  <div>
                    {uploadedFile ? (
                      <div className="flex flex-col gap-3">
                        <div className="flex items-center justify-between bg-gray-50 px-4 py-3 rounded-lg">
                          <div className="flex items-center gap-3">
                            <FileSpreadsheet className="w-5 h-5 text-indigo-600" />
                            <div className="text-left">
                              <span className="font-medium text-gray-700 block">
                                {uploadedFile.name}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {uploadStatus === "uploading" && (
                              <Loader2 className="w-4 h-4 animate-spin text-primary" />
                            )}
                            {uploadStatus === "success" && (
                              <CheckCircle className="w-4 h-4 text-green-500" />
                            )}
                            {uploadStatus === "error" && (
                              <span className="text-red-500 text-sm">
                                Error
                              </span>
                            )}
                            {uploadStatus !== "uploading" && uploadStatus !== "success" && (
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  removeFile();
                                }}
                                className="ml-2 text-gray-400 hover:text-red-500 transition-colors"
                                aria-label="Remove file"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ) : isDragActive ? (
                      <div className="flex flex-col items-center gap-2">
                        <File className="w-12 h-12 text-primary" />
                        <p className="text-gray-700 font-medium">
                          Drop the file here
                        </p>
                      </div>
                    ) : (
                      <div className="flex flex-col justify-center items-center gap-3">
                        <File className="w-12 h-12 text-gray-400" />
                        <p className="text-gray-700 font-medium">
                          Drag and drop your resume here, or
                        </p>
                        <Button
                          type="button"
                          variant="darkoutline"
                          className="rounded-full px-6"
                        >
                          Browse Files
                        </Button>
                        <div className="text-sm text-gray-500 mt-2 space-y-1">
                          <p>Supported formats: PDF, DOC, DOCX (max 4MB)</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                {errors.resumeUrl && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.resumeUrl.message}
                  </p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <Button
                type="submit"
                disabled={
                  isSubmitting ||
                  uploadStatus === "uploading" ||
                  !fileUrl ||
                  !isValid
                }
                className="w-full py-6 text-sm"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit Application"
                )}
              </Button>
              {uploadStatus === "uploading" && (
                <p className="text-sm text-gray-500 text-center mt-2">
                  Please wait for the upload to complete before submitting
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ApplicationForm;
