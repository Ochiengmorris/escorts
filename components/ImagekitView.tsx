import { Image, ImageKitProvider } from "@imagekit/next";

const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT;

interface ImagekitViewProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  sizes?: string;
  fill?: boolean;
  className?: string;
  loading?: "lazy" | "eager";
  transformation?: Array<{ [key: string]: string }>;
}

const ImagekitView = ({
  src,
  alt,
  width,
  height,
  className,
  sizes,
  fill,
  loading = "eager",
  transformation,
}: ImagekitViewProps) => {
  if (!urlEndpoint) {
    console.error("ImageKit URL endpoint is not configured");
    return null;
  }

  return (
    <ImageKitProvider urlEndpoint={urlEndpoint}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
        loading={loading}
        sizes={sizes}
        fill={fill}
        transformation={transformation}
      />
    </ImageKitProvider>
  );
};

export default ImagekitView;
