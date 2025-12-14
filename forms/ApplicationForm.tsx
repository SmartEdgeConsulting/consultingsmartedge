"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { File, FileSpreadsheet, X, Loader2 } from "lucide-react";
import { useDropzone, FileRejection } from "react-dropzone";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { useUploadThing } from "@/lib/utils/uploadthing";
import { useParams } from "next/navigation";
import { ApplicationFormData, applicationSchema } from "@/src/zod/schema";



interface ApplicationFormProps {
  careerId?: string; 
}

const ApplicationForm = ({ careerId: propCareerId }: ApplicationFormProps) => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const params = useParams();
  const careerId = propCareerId || (params.id as string);
  // Initialize UploadThing hook
  const { startUpload, isUploading } = useUploadThing("resumeUploader", {
    onClientUploadComplete: (res) => {
      if (res && res[0]) {
        const fileUrl = res[0].ufsUrl;
        setValue("resumeUrl", fileUrl, { shouldValidate: true });
        toast.success("Resume uploaded successfully!");
      }
    },
    onUploadError: (error: Error) => {
      console.error("Upload error:", error);
      toast.error(`Upload failed: ${error.message}`);
      setUploadedFile(null);
      setValue("resumeUrl", "", { shouldValidate: true });
    },
    onUploadBegin: (fileName: string) => {
      console.log("Upload started for:", fileName);
    },
  });

  // Initialize React Hook Form with Zod resolver
  const {
    register,
    handleSubmit,
    setValue,
    //watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationSchema),
    mode: "onChange", // Validate on change
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

  const onDrop = useCallback(
    async (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
      // Handle rejected files
      if (rejectedFiles.length > 0) {
        const rejection = rejectedFiles[0];
        if (rejection.errors[0].code === "file-too-large") {
          toast.error("File is too large. Maximum size is 4MB.");
        } else if (rejection.errors[0].code === "file-invalid-type") {
          toast.error(
            "Invalid file type. Please upload PDF, DOC, or DOCX files only."
          );
        }
        return;
      }

      // Handle accepted files
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        setUploadedFile(file);

        try {
          // Start upload with UploadThing
          await startUpload([file]);
        } catch (error) {
          console.error("Upload error:", error);
          setUploadedFile(null);
          setValue("resumeUrl", "", { shouldValidate: true });
        }
      }
    },
    [startUpload, setValue]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "application/msword": [".doc"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [".docx"],
    },
    maxSize: 4 * 1024 * 1024, // 4MB
    multiple: false,
    disabled: isUploading,
  });

  // Function to remove selected file
  const removeFile = () => {
    setUploadedFile(null);
    setValue("resumeUrl", "", { shouldValidate: true });
  };

  useEffect(() => {
    if (careerId) {
      setValue("careerId", careerId, { shouldValidate: true });
    }
  }, [careerId, setValue]);

  // Form submission handler
  const onSubmit = async (data: ApplicationFormData) => {
    try {
      console.log("Form data to submit:", data);

      // In production, send data to your backend API
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
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("Failed to submit application. Please try again.");
    }
  };

  return (
    <section className="py-20">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 mx-auto max-w-5xl px-4 sm:px-8 lg:px-10"
      >
        {/* Name Field */}
        <div className="grid gap-2">
          <Label htmlFor="name">Name *</Label>
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
          <Label htmlFor="email">Email *</Label>
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
          <Label htmlFor="phoneNumber">Phone Number *</Label>
          <Input
            id="phoneNumber"
            type="tel"
            placeholder="+1 (555) 123-4567"
            {...register("phoneNumber")}
            className={errors.phoneNumber ? "border-red-500" : ""}
          />
          {errors.phoneNumber && (
            <p className="text-red-500 text-sm">{errors.phoneNumber.message}</p>
          )}
        </div>

        {/* Experience Field */}
        <div className="grid gap-2">
          <Label htmlFor="experience">Years of Experience *</Label>
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
            <p className="text-red-500 text-sm">{errors.experience.message}</p>
          )}
        </div>

        {/* Skills Field */}
        <div className="grid gap-2">
          <Label htmlFor="skills">Skills & Experience *</Label>
          <Textarea
            id="skills"
            placeholder="Tell us about yourself and skills you possess for this job (minimum 10 characters)"
            rows={4}
            {...register("skills")}
            className={errors.skills ? "border-red-500" : ""}
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
            <p className="text-red-500 text-sm">{errors.portfolio.message}</p>
          )}
        </div>

        {/* Resume Upload Field */}
        <div className="grid gap-2">
          <Label htmlFor="resume">Resume *</Label>
          <div className="w-full bg-white p-5 rounded-lg">
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                errors.resumeUrl
                  ? "border-red-500 bg-red-50"
                  : isDragActive
                    ? "border-primary bg-primary/10"
                    : "border-gray-300 hover:border-primary hover:bg-gray-50"
              } ${isUploading ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              <input {...getInputProps()} />
              <div>
                {uploadedFile ? (
                  <div className="flex items-center justify-between bg-gray-50 px-4 py-3 rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileSpreadsheet className="w-5 h-5 text-indigo-600" />
                      <div>
                        <span className="font-medium text-gray-700 block">
                          {uploadedFile.name}
                        </span>
                      </div>
                    </div>
                    {isUploading ? (
                      <Loader2 className="w-4 h-4 animate-spin text-gray-400" />
                    ) : (
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
                    <p className="text-gray-700">
                      Drag and drop your resume here, or
                    </p>
                    <Button
                      type="button"
                      variant="darkoutline"
                      className="rounded-full px-6"
                    >
                      Browse Files
                    </Button>
                    {/**<div className="text-sm text-gray-500 mt-2 space-y-1">
                      <p>Supported formats: PDF, DOC, DOCX (max 4MB)</p>
                    </div>*/}
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
            disabled={isSubmitting || isUploading}
            className="w-full py-6 text-lg"
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
        </div>
      </form>
    </section>
  );
};

export default ApplicationForm;
