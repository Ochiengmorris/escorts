import { auth } from "@/lib/auth";
import { getUploadAuthParams } from "@imagekit/next/server";
import { headers } from "next/headers";

export async function GET() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!process.env.IMAGEKIT_PRIVATE_KEY || !process.env.IMAGEKIT_PUBLIC_KEY) {
    return Response.json(
      { error: "ImageKit credentials not found" },
      { status: 500 }
    );
  }

  const { token, expire, signature } = getUploadAuthParams({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY as string,
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY as string,
    // expire: Math.floor(Date.now() / 1000) + 60 * 60,
    // token: "random-token",
  });

  return Response.json({
    token,
    expire,
    signature,
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  });
}
