"use client";

import { addUserImages } from "@/app/actions/user";
import CldUploadButtonComponent from "@/components/cld-upoad-button";
import ImagekitUpload, { UploadResponse } from "@/components/ImagekitUpload";
import ImagekitView from "@/components/ImagekitView";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { toast } from "sonner";

const formatURL = (url: string) => {
  const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT;
  if (!urlEndpoint) return url;
  return url.replace(urlEndpoint, "");
};

const ImageSection = ({ images }: { images?: string[] }) => {
  const [uploadedImages, setUploadedImages] = useState<string[]>(images || []);
  // const [isUploading, setIsUploading] = useState(false);

  const handleUpload = async (result: UploadResponse) => {
    if (result.$ResponseMetadata.statusCode !== 200) return;

    const imageURL = formatURL(result.url);

    console.log("imageURL", imageURL);

    // Add the new image to the state
    setUploadedImages((prev) => [...prev, imageURL]);

    // TODO: Save to your database
    const uploadResult = await addUserImages([imageURL]);

    if (uploadResult.success) {
      toast.success("Image saved!");
    } else {
      toast.error("Failed to save image");
    }

    // setIsUploading(false);
  };

  // const handleUploadStart = () => {
  //   setIsUploading(true);
  // };

  const handleUploadError = (error: any) => {
    console.error("Upload failed:", error);
    toast.error("upload failed");
    // setIsUploading(false);
  };

  return (
    <div className="flex flex-col items-start px-4 pb-4 rounded-xl">
      <div className="my-4">
        <span className="font-semibold">My Images</span>
        <p className="text-muted-foreground text-sm mt-1">
          These images will be displayed on your profile when potential clients
          visit your page.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-2 w-full">
        {uploadedImages.length === 0 ? (
          <div className="w-full col-span-2 h-[200px] rounded-xl flex items-center justify-center grow border border-muted">
            <p className="text-center">No images uploaded</p>
          </div>
        ) : (
          uploadedImages.map((image, index) => (
            <div
              key={`${image}-${index}`}
              className="w-full relative h-[200px] rounded-xl overflow-hidden border"
            >
              <ImagekitView
                src={image}
                alt={`Gallery image ${index + 1}`}
                fill
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                className="object-cover"
              />
            </div>
          ))
        )}
      </div>

      {/* separator */}
      <Separator className="mt-4" />

      <ImagekitUpload
        onUploadSuccess={handleUpload}
        onUploadError={handleUploadError}
        maxSizeMB={8}
        accept="image/*"
        buttonText="Upload Image"
      />
    </div>
  );
};

export default ImageSection;
