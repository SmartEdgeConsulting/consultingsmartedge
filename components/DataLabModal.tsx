import React, { useCallback, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { FileSpreadsheet, FileUp, X } from "lucide-react";
import { FileRejection, useDropzone } from "react-dropzone";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const DataLabModal = ({ open, onOpenChange }: Props) => {
  const [file, setFile] = useState<File | undefined>(undefined);

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
        setFile(uploadedFile);
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
    setFile(undefined);
  };

  return (
    <>
      <AlertDialog open={open} onOpenChange={onOpenChange}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Upload Your Data And Discover Insights Instantly
            </AlertDialogTitle>

            <div className="w-full">
              <div
                {...getRootProps()}
                className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center cursor-pointer hover:border-primary transition-colors"
              >
                <input {...getInputProps()} />
                <div>
                  {file ? (
                    <div className="flex items-center gap-3 bg-slate-50 px-4 py-3 rounded-lg">
                      <FileSpreadsheet className="w-5 h-5 text-indigo-600" />
                      <span className="font-medium text-gray-700">
                        {file.name}
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
                      <FileUp size={40} className="animate-pulse" />
                      <p className="text-gray-700">
                        Drag and drop your spreadsheet here
                      </p>
                      <p className="text-sm text-gray-500 mt-2">
                        or click to browse (CSV or Excel, max 4MB)
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Upload</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default DataLabModal;
