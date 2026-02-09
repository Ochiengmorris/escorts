// "use client";

// import {
//   ImageKitAbortError,
//   ImageKitInvalidRequestError,
//   ImageKitServerError,
//   ImageKitUploadNetworkError,
//   upload,
// } from "@imagekit/next";
// import { useRef, useState } from "react";
// import { toast } from "sonner";
// import { Input } from "./ui/input";
// import { Button } from "./ui/button";
// import { Upload, X } from "lucide-react";
// import CircularProgress from "./CircularProgress ";
// import { cn } from "@/lib/utils";

// interface AuthParams {
//   signature: string;
//   expire: number;
//   token: string;
//   publicKey: string;
// }

// interface UploadResponse {
//   fileId: string;
//   name: string;
//   url: string;
//   thumbnailUrl: string;
//   height: number;
//   width: number;
//   size: number;
//   filePath: string;
//   fileType: string;
// }

// const ImagekitUpload = () => {
//   const [progress, setProgress] = useState(0);
//   const [isUploading, setIsUploading] = useState(false);
//   const [uploadedFile, setUploadedFile] = useState<UploadResponse | null>(null);
//   const [selectedFileName, setSelectedFileName] = useState<string>("");

//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const abortControllerRef = useRef<AbortController | null>(null);

//   const authenticator = async (): Promise<AuthParams> => {
//     try {
//       const response = await fetch("/api/upload-auth");
//       if (!response.ok) {
//         const errorText = await response.text();
//         toast.error(errorText);
//         throw new Error(
//           `Request failed with status ${response.status}: ${errorText}`
//         );
//       }

//       const { signature, expire, token, publicKey } = await response.json();
//       return { signature, expire, token, publicKey };
//     } catch (error) {
//       console.error("Authentication error:", error);
//       throw new Error("Authentication request failed");
//     }
//   };

//   const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       setSelectedFileName(file.name);
//       setUploadedFile(null);
//       setProgress(0);
//     }
//   };

//   const handleUpload = async () => {
//     const fileInput = fileInputRef.current;
//     if (!fileInput?.files?.[0]) {
//       toast.error("Please select a file to upload");
//       return;
//     }

//     const file = fileInput.files[0];

//     // Validate file size (e.g., max 8MB)
//     const maxSize = 8 * 1024 * 1024;
//     if (file.size > maxSize) {
//       toast.error("File size exceeds 8MB limit");
//       return;
//     }

//     setIsUploading(true);
//     setProgress(0);
//     abortControllerRef.current = new AbortController();

//     try {
//       const authParams = await authenticator();
//       const toastId = toast.loading("Uploading... 0%");

//       const uploadResponse = await upload({
//         ...authParams,
//         file,
//         fileName: file.name,
//         onProgress: (event) => {
//           const progressPercentage = (event.loaded / event.total) * 100;
//           setProgress(progressPercentage);
//           toast.loading(`Uploading... ${progressPercentage.toFixed(0)}%`, {
//             id: toastId,
//           });
//         },
//         abortSignal: abortControllerRef.current.signal,
//       });

//       setUploadedFile(uploadResponse as UploadResponse);
//       toast.success("Upload successful!", { id: toastId });
//       console.log("Upload response:", uploadResponse);
//     } catch (error) {
//       handleUploadError(error);
//     } finally {
//       setIsUploading(false);
//       abortControllerRef.current = null;
//     }
//   };

//   const handleUploadError = (error: unknown) => {
//     if (error instanceof ImageKitAbortError) {
//       console.error("Upload aborted:", error.reason);
//       toast.error(`Upload aborted: ${error.reason}`);
//     } else if (error instanceof ImageKitInvalidRequestError) {
//       console.error("Invalid request:", error.message);
//       toast.error(`Invalid request: ${error.message}`);
//     } else if (error instanceof ImageKitUploadNetworkError) {
//       console.error("Network error:", error.message);
//       toast.error(`Network error: ${error.message}`);
//     } else if (error instanceof ImageKitServerError) {
//       console.error("Server error:", error.message);
//       toast.error(`Server error: ${error.message}`);
//     } else {
//       console.error("Upload error:", error);
//       toast.error("An unexpected error occurred during upload");
//     }
//   };

//   const handleCancel = () => {
//     if (abortControllerRef.current) {
//       abortControllerRef.current.abort("User cancelled upload");
//       setIsUploading(false);
//       setProgress(0);
//       toast.info("Upload cancelled");
//     }
//   };

//   const handleClearFile = () => {
//     if (fileInputRef.current) {
//       fileInputRef.current.value = "";
//     }
//     setSelectedFileName("");
//     setUploadedFile(null);
//     setProgress(0);
//   };

//   return (
//     <div className="space-y-4 w-full max-w-md">
//       <div className="space-y-2">
//         <Input
//           type="file"
//           ref={fileInputRef}
//           onChange={handleFileSelect}
//           disabled={isUploading}
//           accept="image/*"
//           className="cursor-pointer"
//         />
//         {selectedFileName && (
//           <div className="flex items-center justify-between text-sm text-muted-foreground">
//             <span className="truncate">{selectedFileName}</span>
//             {!isUploading && (
//               <Button
//                 type="button"
//                 variant="ghost"
//                 size="sm"
//                 onClick={handleClearFile}
//                 className="h-6 w-6 p-0"
//               >
//                 <X className="h-4 w-4" />
//               </Button>
//             )}
//           </div>
//         )}
//       </div>

//       <div className="flex gap-2">
//         <Button
//           type="button"
//           onClick={handleUpload}
//           disabled={!selectedFileName || isUploading}
//           className={cn(
//             "flex-1",
//             {
//               "cursor-not-allowed opacity-50": !selectedFileName || isUploading,
//             },
//             isUploading ? "hidden" : ""
//           )}
//         >
//           <Upload className="mr-2 h-4 w-4" />
//           {isUploading ? "Uploading..." : "Upload file"}
//         </Button>
//         {isUploading && (
//           <div className="space-y-2 flex items-center">
//             <CircularProgress
//               value={progress}
//               size={120}
//               strokeWidth={10}
//               showLabel
//               labelClassName="text-xl font-bold"
//               className="stroke-primary/25"
//               progressClassName="stroke-primary"
//               renderLabel={(progress) => `${progress.toFixed(0)}%`}
//             />
//             <Button
//               type="button"
//               onClick={handleCancel}
//               variant="outline"
//               className="flex-1"
//             >
//               Cancel
//             </Button>
//           </div>
//         )}
//       </div>

//       {/* {uploadedFile && (
//         <div className="p-4 border rounded-lg space-y-2 bg-green-50 dark:bg-green-950">
//           <p className="text-sm font-medium text-green-900 dark:text-green-100">
//             Upload successful!
//           </p>
//           <a
//             href={uploadedFile.url}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="text-sm text-blue-600 hover:underline dark:text-blue-400"
//           >
//             View uploaded file
//           </a>
//         </div>
//       )} */}
//     </div>
//   );
// };

// export default ImagekitUpload;

"use client";

import {
  ImageKitAbortError,
  ImageKitInvalidRequestError,
  ImageKitServerError,
  ImageKitUploadNetworkError,
  upload,
} from "@imagekit/next";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Upload, X } from "lucide-react";
import CircularProgress from "./CircularProgress ";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface AuthParams {
  signature: string;
  expire: number;
  token: string;
  publicKey: string;
}

export interface UploadResponse {
  $ResponseMetadata: {
    statusCode: number;
  };
  fileId: string;
  name: string;
  url: string;
  thumbnailUrl: string;
  height: number;
  width: number;
  size: number;
  filePath: string;
  fileType: string;
}

interface ImagekitUploadProps {
  onUploadSuccess?: (response: UploadResponse) => void;
  onUploadError?: (error: Error) => void;
  maxSizeMB?: number;
  accept?: string;
  className?: string;
  buttonText?: string;
}

const ImagekitUpload = ({
  onUploadSuccess,
  onUploadError,
  maxSizeMB = 10,
  accept = "image/*",
  className = "",
  buttonText = "Upload file",
}: ImagekitUploadProps) => {
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<UploadResponse | null>(null);
  const [selectedFileName, setSelectedFileName] = useState<string>("");

  const fileInputRef = useRef<HTMLInputElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const authenticator = async (): Promise<AuthParams> => {
    try {
      const response = await fetch("/api/upload-auth");
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Request failed with status ${response.status}: ${errorText}`
        );
      }

      const data = await response.json();
      const { signature, expire, token, publicKey } = data;
      return { signature, expire, token, publicKey };
    } catch (error) {
      console.error("Authentication error:", error);
      throw new Error("Authentication request failed");
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFileName(file.name);
      setUploadedFile(null);
      setProgress(0);
    }
  };

  const handleUpload = async () => {
    const fileInput = fileInputRef.current;
    if (!fileInput?.files?.[0]) {
      toast.error("Please select a file to upload");
      return;
    }

    const file = fileInput.files[0];

    // Validate file size
    const maxSize = maxSizeMB * 1024 * 1024;
    if (file.size > maxSize) {
      toast.error(`File size exceeds ${maxSizeMB}MB limit`);
      return;
    }

    setIsUploading(true);
    setProgress(0);
    abortControllerRef.current = new AbortController();

    const toastId = toast.loading("Uploading... 0%");
    try {
      const authParams = await authenticator();

      const uploadResponse = await upload({
        ...authParams,
        file,
        fileName: file.name,
        onProgress: (event) => {
          const progressPercentage = (event.loaded / event.total) * 100;
          setProgress(progressPercentage);
          toast.loading(`Uploading... ${progressPercentage.toFixed(0)}%`, {
            id: toastId,
          });
        },
        abortSignal: abortControllerRef.current.signal,
      });
      // const response1 = uploadResponse.$ResponseMetadata.statusCode;
      // console.log(response1);

      const response = uploadResponse as UploadResponse;
      setUploadedFile(response);
      toast.success("Upload successful!", { id: toastId });
      // console.log("Upload response:", response);

      // Call the onUploadSuccess callback with the response
      onUploadSuccess?.(response);
    } catch (error) {
      const errorObj = handleUploadError(error, toastId);
      // Call the onUploadError callback if provided
      onUploadError?.(errorObj);
    } finally {
      setIsUploading(false);
      setSelectedFileName("");
      abortControllerRef.current = null;
    }
  };

  const handleUploadError = (error: unknown, id: string | number): Error => {
    let errorObj: Error;

    if (error instanceof ImageKitAbortError) {
      console.error("Upload aborted:", error.reason);
      toast.error(`Upload aborted: ${error.reason}`, { id });
      errorObj = new Error(`Upload aborted: ${error.reason}`);
    } else if (error instanceof ImageKitInvalidRequestError) {
      console.error("Invalid request:", error.message);
      toast.error(`Invalid request: ${error.message}`, { id });
      errorObj = error;
    } else if (error instanceof ImageKitUploadNetworkError) {
      console.error("Network error:", error.message);
      toast.error(`Network error: ${error.message}`, { id });
      errorObj = error;
    } else if (error instanceof ImageKitServerError) {
      console.error("Server error:", error.message);
      toast.error(`Server error: ${error.message}`, { id });
      errorObj = error;
    } else {
      console.error("Upload error:", error);
      toast.error("An unexpected error occurred during upload", { id });
      errorObj = new Error("An unexpected error occurred during upload");
    }

    return errorObj;
  };

  const handleCancel = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort("User cancelled upload");
      setIsUploading(false);
      setProgress(0);
      toast.info("Upload cancelled");
    }
  };

  const handleClearFile = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setSelectedFileName("");
    setUploadedFile(null);
    setProgress(0);
  };

  return (
    <div className={`space-y-4 w-full max-w-md ${className}`}>
      <div className="space-y-2">
        <Input
          type="file"
          ref={fileInputRef}
          onChange={handleFileSelect}
          disabled={isUploading}
          accept={accept}
          className="cursor-pointer sr-only"
        />
        {selectedFileName && (
          <div className="flex items-center justify-between text-sm text-muted-foreground w-full relative">
            {/* <span className="truncate">{selectedFileName}</span> */}
            {!isUploading && (
              <div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleClearFile}
                  className="h-6 w-6 p-0 absolute top-2 left-2"
                >
                  <X className="h-4 w-4" />
                </Button>
                <Image
                  src={URL.createObjectURL(
                    fileInputRef.current?.files?.[0] as File
                  )}
                  alt={fileInputRef.current?.files?.[0]?.name as string}
                  width={100}
                  height={100}
                  className="rounded-lg h-auto w-1/2"
                  unoptimized
                />
              </div>
            )}
          </div>
        )}
      </div>

      <div className="flex gap-2 items-center">
        <Button
          type="button"
          onClick={
            selectedFileName
              ? handleUpload
              : () => {
                  fileInputRef.current?.click();
                }
          }
          disabled={isUploading}
          className={cn("flex-1", isUploading && "cursor-not-allowed hidden")}
        >
          <Upload className="mr-2 h-4 w-4" />
          {/* {isUploading ? "Uploading..." : buttonText} */}
          {selectedFileName ? buttonText : "Select File To Upload"}
        </Button>
        {isUploading && (
          <div className="space-y-2 flex items-center">
            <CircularProgress
              value={Number(progress.toFixed(0))}
              labelClassName="text-lg font-semibold"
              renderLabel={(value) => `${value}%`}
              showLabel
            />
          </div>
        )}
        {isUploading && (
          <Button
            type="button"
            onClick={handleCancel}
            variant="outline"
            className="flex-1"
          >
            Cancel
          </Button>
        )}
      </div>
    </div>
  );
};

export default ImagekitUpload;
