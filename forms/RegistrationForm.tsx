"use client";

import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, ArrowRight, ArrowLeft, Check } from "lucide-react";
import { BootcampData, bootcampSchema } from "@/src/zod/schema";
import PersonalInfo from "@/forms/PeronalInfoForm";
import EducationaInfo from "@/forms/EducationaInfoForm";
import BootcampInfo from "@/forms/BootcampInfoForm";
import ProofOfPayment from "@/components/ProofOfPayment";
import { useUploadThing } from "@/lib/utils/uploadthing";
import { toast } from "sonner";
import { FileRejection, useDropzone } from "react-dropzone";

export default function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const steps = [
    { number: 1, label: "Personal Info" },
    { number: 2, label: "Educational Info" },
    { number: 3, label: "Bootcamp Info" },
    { number: 4, label: "Payment" },
  ];

  // Initialize UploadThing hook
  const { startUpload, isUploading } = useUploadThing("paymentProofUploader", {
    onClientUploadComplete: (res) => {
      if (res && res[0]) {
        const fileUrl = res[0].ufsUrl;
        setValue("proofOfPayment", fileUrl, { shouldValidate: true });
        toast.success("Payment proof uploaded successfully!");
      }
    },
    onUploadError: (error: Error) => {
      console.error("Upload error:", error);
      toast.error(`Upload failed: ${error.message}`);
      setUploadedFile(null);
      setValue("proofOfPayment", "", { shouldValidate: true });
    },
    onUploadBegin: (fileName: string) => {
      console.log("Upload started for:", fileName);
    },
  });

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors, isValid, isSubmitting },
    getValues,
    setValue,
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

  // Watch the proofOfPayment field
  const proofOfPayment = watch("proofOfPayment");

  const onDrop = useCallback(
    async (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
      // Handle rejected files
      if (rejectedFiles.length > 0) {
        const rejection = rejectedFiles[0];
        if (rejection.errors[0].code === "file-too-large") {
          toast.error("File is too large. Maximum size is 4MB.");
        } else if (rejection.errors[0].code === "file-invalid-type") {
          toast.error(
            "Invalid file type. Please upload PDF, PNG, or JPEG files only."
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
          setValue("proofOfPayment", "", { shouldValidate: true });
        }
      }
    },
    [startUpload, setValue]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "image/png": [".png"],
      "image/jpeg": [".jpg", ".jpeg"],
    },
    maxSize: 4 * 1024 * 1024, // 4MB
    multiple: false,
    disabled: isUploading,
  });

  // Function to remove selected file
  const removeFile = () => {
    setUploadedFile(null);
    setValue("proofOfPayment", "", { shouldValidate: true });
  };

  const onSubmit = (data: BootcampData) => {
    console.log("Form submitted:", data);
    setIsSubmitted(true);
  };

  const nextStep = async () => {
    let isValid = false;

    if (currentStep === 1) {
      isValid = await trigger([
        "name",
        "email",
        "phoneNo",
        "gender",
        "country",
      ]);
    } else if (currentStep === 2) {
      isValid = await trigger([
        "occupation",
        "education",
        "experience",
        "interest",
        "skillOfInterest",
      ]);
    } else if (currentStep === 3) {
      isValid = await trigger([
        "sessionAttendance",
        "classHolding",
        "classTiming",
        "connection",
        "device",
        "heardAboutUs",
      ]);
    } else if (currentStep === 4) {
      isValid = await trigger(["additionalInfo", "proofOfPayment"]);
    }

    if (isValid) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  // Check if submit button should be disabled
  const isSubmitDisabled =
    isSubmitting ||
    isUploading ||
    !proofOfPayment ||
    Object.keys(errors).length > 0;

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
              <div className="bg-gray-50 p-4 rounded-lg text-left mt-6">
                <h3 className="font-semibold mb-2">Submitted Data:</h3>
                <pre className="text-xs overflow-auto">
                  {JSON.stringify(getValues(), null, 2)}
                </pre>
              </div>
              <Button
                onClick={() => {
                  setIsSubmitted(false);
                  setCurrentStep(1);
                }}
              >
                Submit Another Registration
              </Button>
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
            {/* Progress Indicator - Steps with Labels */}
            <div className="mb-4">
              <div className="flex items-center justify-between relative">
                {/* Progress Line */}
                <div className="absolute top-5 left-0 right-0 h-1 bg-gray-200">
                  <div
                    className="h-full bg-primary  transition-all duration-500 ease-out"
                    style={{
                      width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
                    }}
                  />
                </div>

                {/* Step Circles */}
                {steps.map((stepItem) => (
                  <div
                    key={stepItem.number}
                    className="flex flex-col items-center relative z-10"
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                        stepItem.number < currentStep
                          ? "bg-primary  text-white shadow-lg"
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
                {/* Step 1: Personal Information */}
                {currentStep === 1 && (
                  <PersonalInfo register={register} errors={errors} />
                )}

                {/* Step 2: Educational & Professional Background */}
                {currentStep === 2 && (
                  <EducationaInfo register={register} errors={errors} />
                )}

                {/* Step 3: Bootcamp-Specific Information */}
                {currentStep === 3 && (
                  <BootcampInfo register={register} errors={errors} />
                )}

                {/* Step 4: Proof of Payment */}
                {currentStep === 4 && (
                  <ProofOfPayment
                    register={register}
                    errors={errors}
                    getRootProps={getRootProps}
                    getInputProps={getInputProps}
                    isDragActive={isDragActive}
                    uploadedFile={uploadedFile}
                    isUploading={isUploading}
                    removeFile={removeFile}
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
                      {isSubmitting
                        ? "Submitting..."
                        : isUploading
                          ? "Uploading..."
                          : "Submit Registration"}
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
