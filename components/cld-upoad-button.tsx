"use client";

import { cn } from "@/lib/utils";
import { CldUploadButton } from "next-cloudinary";
import { buttonVariants } from "./ui/button";

const CldUploadButtonComponent = ({
  onSuccess,
  onError,
  children,
}: {
  onSuccess: (result: any) => void;
  onError?: (error: any) => void;
  children?: React.ReactNode;
}) => {
  return (
    <CldUploadButton
      uploadPreset="escorts"
      signatureEndpoint="/api/cloudinary/signature"
      onSuccess={onSuccess}
      onError={(error) => {
        console.error("Upload error:", error);
        onError?.(error);
      }}
      className={cn(
        buttonVariants({ variant: "default" }),
        "w-full font-semibold"
      )}
    >
      {children || "Upload"}
    </CldUploadButton>
  );
};

export default CldUploadButtonComponent;
