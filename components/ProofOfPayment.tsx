"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { File, FileSpreadsheet, X, Loader2, CheckCircle } from "lucide-react";
import { FormProps } from "@/src/zod/constant/formOptions";
import { useDropzone } from "@uploadthing/react";

interface ProofOfPaymentProps extends FormProps {
  getRootProps: ReturnType<typeof useDropzone>["getRootProps"];
  getInputProps: ReturnType<typeof useDropzone>["getInputProps"];
  isDragActive: boolean;
  uploadedFile: File | null;
  uploading: boolean;
  uploadedUrl: string;
  removeFile: () => void;
  uploadStatus: "idle" | "uploading" | "success" | "error";
}

const ProofOfPayment = ({
  register,
  errors,
  getRootProps,
  getInputProps,
  isDragActive,
  uploadedFile,
  uploading,
  uploadedUrl,
  removeFile,
  uploadStatus,
}: ProofOfPaymentProps) => {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="space-y-2">
        <Label htmlFor="additionalInfo">
          Additional Information (Optional)
        </Label>
        <textarea
          id="additionalInfo"
          className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          {...register("additionalInfo")}
          placeholder="Any additional comments or questions..."
          rows={4}
        />
        {errors.additionalInfo && (
          <p className="text-xs text-red-500">
            {errors.additionalInfo.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="proofOfPayment">
          Proof of Payment <span className="text-red-500">*</span>
        </Label>
        <div className="w-full bg-white p-5 rounded-lg">
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
              errors.proofOfPayment
                ? "border-red-500 bg-red-50"
                : isDragActive
                  ? "border-primary bg-primary/10"
                  : "border-gray-300 hover:border-primary hover:bg-gray-50"
            } ${uploading || uploadStatus === "uploading" ? "opacity-50 cursor-not-allowed" : ""}`}
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
                  <div className="flex items-center gap-2">
                    {uploadStatus === "uploading" && (
                      <Loader2 className="w-4 h-4 animate-spin text-primary" />
                    )}
                    {uploadStatus === "success" && (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    )}
                    {uploadStatus === "error" && (
                      <span className="text-red-500 text-sm">Error</span>
                    )}
                    {uploadStatus !== "uploading" &&
                      uploadStatus !== "success" && (
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
                    Drag and drop your payment proof here, or
                  </p>
                  <Button
                    type="button"
                    variant="darkoutline"
                    className="rounded-full px-6"
                  >
                    Browse Files
                  </Button>
                  <div className="text-sm text-gray-500 mt-2 space-y-1">
                    <p>Supported formats: PDF, PNG, JPG, JPEG (max 4MB)</p>
                  </div>
                </div>
              )}
            </div>
          </div>
          {errors.proofOfPayment && (
            <p className="text-red-500 text-sm mt-2">
              {errors.proofOfPayment.message}
            </p>
          )}
        </div>
        <Input
          id="proofOfPayment"
          type="hidden"
          {...register("proofOfPayment")}
        />
      </div>
    </div>
  );
};

export default ProofOfPayment;
