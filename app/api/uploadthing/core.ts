import { auth } from "@clerk/nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();
// Fake auth function

export const ourFileRouter = {
  resumeUploader: f({
    pdf: { maxFileSize: "4MB", maxFileCount: 1 },
    "application/msword": { maxFileSize: "4MB", maxFileCount: 1 },
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": {
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  })
    .middleware(async ({ req }) => {
      const user = await auth();
      if (!user) throw new UploadThingError("Unauthorized");

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId: user.userId };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.userId);
      console.log("file url", file.ufsUrl);
      return { uploadedBy: metadata.userId, fileUrl: file.ufsUrl };
    }),
  paymentProofUploader: f({
    // PDF support
    pdf: { maxFileSize: "4MB", maxFileCount: 1 },
    // Image support
    image: { maxFileSize: "4MB", maxFileCount: 1 },
  })
    .middleware(async ({ req }) => {
      const user = await auth();
      if (!user) throw new UploadThingError("Unauthorized");
      return { userId: user.userId, uploadType: "payment_proof" };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Payment proof upload complete for userId:", metadata.userId);
      console.log("file url", file.ufsUrl);
      return {
        uploadedBy: metadata.userId,
        fileUrl: file.ufsUrl,
        fileName: file.name,
      };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
