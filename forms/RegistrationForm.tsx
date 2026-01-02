"use client";

import React, { useCallback, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Check,
  Loader2,
} from "lucide-react";
import { BootcampData, bootcampSchema } from "@/src/zod/schema";
import PersonalInfo from "@/forms/PeronalInfoForm";
import EducationaInfo from "@/forms/EducationaInfoForm";
import BootcampInfo from "@/forms/BootcampInfoForm";
import ProofOfPayment from "@/components/ProofOfPayment";
import { toast } from "sonner";
import { useDropzone } from "@uploadthing/react";
import { useUploadThing } from "@/lib/utils/uploadthing";
import {
  generateClientDropzoneAccept,
  generatePermittedFileTypes,
} from "uploadthing/client";
import { useRouter } from "next/navigation";

export default function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadedUrl, setUploadedUrl] = useState<string>("");
  const [uploadStatus, setUploadStatus] = useState<
    "idle" | "uploading" | "success" | "error"
  >("idle");
  const router = useRouter();

  const steps = [
    { number: 1, label: "Personal Info" },
    { number: 2, label: "Educational Info" },
    { number: 3, label: "Bootcamp Info" },
    { number: 4, label: "Payment" },
  ];

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors, isSubmitting },
    setValue,
    reset,
    watch,
  } = useForm<BootcampData>({
    resolver: zodResolver(bootcampSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      phoneNo: "",
      gender: undefined,
      country: "",
      occupation: undefined,
      education: "",
      experience: undefined,
      interest: "",
      skillOfInterest: [],
      sessionAttendance: undefined,
      classHolding: undefined,
      classTiming: undefined,
      connection: undefined,
      device: undefined,
      heardAboutUs: "",
      additionalInfo: "",
      proofOfPayment: "",
    },
  });

  const { startUpload, routeConfig, isUploading } = useUploadThing(
    "paymentProofUploader",
    {
      onClientUploadComplete: (res) => {
        console.log("Upload complete:", res);
        if (res && res[0]) {
          const url = res[0].ufsUrl;
          console.log("📎 File URL:", url);

          if (url) {
            setUploadedUrl(url);
            setValue("proofOfPayment", url, { shouldValidate: true });
            setUploadStatus("success");
            toast.success("Proof of payment uploaded successfully!");
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
        setValue("proofOfPayment", "", { shouldValidate: true });
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
        "image/png": [".png"],
        "image/jpeg": [".jpg", ".jpeg"],
      };

  // Use UploadThing's dropzone hook
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: useCallback(
      async (acceptedFiles: File[]) => {
        if (acceptedFiles.length > 0) {
          const file = acceptedFiles[0];

          setUploadedFile(file);
          setUploadedUrl("");
          setValue("proofOfPayment", "", { shouldValidate: false });
          setUploadStatus("uploading");

          try {
            // Start the upload
            await startUpload([file]);
          } catch (error) {
            console.error("Upload error:", error);
            setUploadStatus("error");
            toast.error("Upload failed. Please try again.");
            setUploadedFile(null);
            setUploadedUrl("");
            setValue("proofOfPayment", "", { shouldValidate: true });
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

  // Watch for proofOfPayment changes
  const proofOfPayment = watch("proofOfPayment");

  // Function to remove selected file
  const removeFile = useCallback(() => {
    setUploadedFile(null);
    setUploadedUrl("");
    setValue("proofOfPayment", "", { shouldValidate: true });
    setUploadStatus("idle");
    toast.info("File removed");
  }, [setValue]);

  // Trigger validation when resumeUrl changes
  useEffect(() => {
    if (proofOfPayment) {
      trigger("proofOfPayment");
    }
  }, [proofOfPayment, trigger]);

  const onSubmit = async (data: BootcampData) => {
    try {

      // Force validation one more time
      const isStep4Valid = await trigger(["proofOfPayment"]);
      if (!isStep4Valid) {
        toast.error("Please complete the payment proof upload");
        return;
      }

      const res = await fetch("/api/registrations/new", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const result = await res.json();

      if (result.success) {
        setIsSubmitted(true);
        reset();
        setUploadedFile(null);
        setUploadedUrl("");
        setUploadStatus("idle");
        setTimeout(() => {
          router.push("/");
        }, 2000);
      } else {
        toast.error("Error submitting registration: " + result.error);
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to submit registration. Please try again."
      );
    }
  };

  const nextStep = async () => {
    let isValid = false;

    switch (currentStep) {
      case 1:
        isValid = await trigger([
          "name",
          "email",
          "phoneNo",
          "gender",
          "country",
        ]);
        break;
      case 2:
        isValid = await trigger([
          "occupation",
          "education",
          "experience",
          "interest",
          "skillOfInterest",
        ]);
        break;
      case 3:
        isValid = await trigger([
          "sessionAttendance",
          "classHolding",
          "classTiming",
          "connection",
          "device",
          "heardAboutUs",
        ]);
        break;
      case 4:
        // Small delay to ensure form state is updated
        await new Promise((resolve) => setTimeout(resolve, 100));
        isValid = await trigger(["proofOfPayment"]);
        if (!isValid) {
          toast.error("Please upload payment proof before submitting");
        }
        break;
    }

    if (isValid) {
      if (currentStep < 4) {
        setCurrentStep(currentStep + 1);
      }
    } else {
      toast.error("Please complete all required fields correctly");
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Check if submit button should be disabled
  const isSubmitDisabled =
    isSubmitting ||
    isUploading || // Use UploadThing's isUploading state
    !proofOfPayment ||
    Object.keys(errors).length > 0;

  console.log("🔍 Checking if submit should be disabled:", isSubmitDisabled);

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl">
          <CardContent className="pt-6">
            <div className="text-center space-y-6">
              <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto" />
              <h2 className="text-2xl font-bold text-gray-900">Success!</h2>
              <p className="text-gray-600">
                Your registration has been submitted successfully.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <section className="bg-linear-to-b from-white to-gray-50/50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="shadow-lg rounded-2xl overflow-hidden bg-white border border-gray-200">
          <header className="bg-linear-to-r from-primary/10 to-primary/5 p-6 border-b border-gray-100">
            <div className="mb-4">
              <div className="flex items-center justify-between relative">
                <div className="absolute top-5 left-0 right-0 h-1 bg-gray-200">
                  <div
                    className="h-full bg-primary transition-all duration-500 ease-out"
                    style={{
                      width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
                    }}
                  />
                </div>

                {steps.map((stepItem) => (
                  <div
                    key={stepItem.number}
                    className="flex flex-col items-center relative z-10"
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                        stepItem.number < currentStep
                          ? "bg-primary text-white shadow-lg"
                          : stepItem.number === currentStep
                            ? "bg-primary text-white shadow-lg ring-4 ring-blue-200"
                            : "bg-white border-2 border-gray-300 text-gray-400"
                      }`}
                    >
                      {stepItem.number < currentStep ? (
                        <Check className="w-5 h-5" />
                      ) : (
                        <span className="text-sm font-semibold">
                          {stepItem.number}
                        </span>
                      )}
                    </div>
                    <span
                      className={`mt-2 text-xs font-medium transition-colors ${
                        stepItem.number <= currentStep
                          ? "text-gray-900"
                          : "text-gray-400"
                      }`}
                    >
                      {stepItem.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </header>

          <div className="w-full p-6 sm:p-8 lg:p-10">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-6">
                {currentStep === 1 && (
                  <PersonalInfo register={register} errors={errors} />
                )}

                {currentStep === 2 && (
                  <EducationaInfo register={register} errors={errors} />
                )}

                {currentStep === 3 && (
                  <BootcampInfo register={register} errors={errors} />
                )}

                {currentStep === 4 && (
                  <ProofOfPayment
                    register={register}
                    errors={errors}
                    getRootProps={getRootProps}
                    getInputProps={getInputProps}
                    isDragActive={isDragActive}
                    uploadedFile={uploadedFile}
                    uploading={isUploading}
                    removeFile={removeFile}
                    uploadedUrl={uploadedUrl} 
                    uploadStatus={uploadStatus}
                  />
                )}

                <div className="flex justify-between pt-4 border-t">
                  <Button
                    type="button"
                    variant="darkoutline"
                    onClick={prevStep}
                    disabled={currentStep === 1}
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Previous
                  </Button>

                  {currentStep < 4 ? (
                    <Button type="button" onClick={nextStep}>
                      Next
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  ) : (
                    <Button type="submit" disabled={isSubmitDisabled}>
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        "Submit Registration"
                      )}
                    </Button>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
