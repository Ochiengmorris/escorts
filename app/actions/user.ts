"use server";

import { User } from "@/generated/prisma/client";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";

export const fetchUser = async (): Promise<{
  success: boolean;
  user: User | null;
}> => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return {
      success: false,
      user: null,
    };
  }

  console.log(session.user.id);

  try {
    console.log("fetching user");
    const user = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
      include: {
        reviews: true,
      },
    });
    console.log("fetched user");
    return {
      success: true,
      user,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      user: null,
    };
  }
};

export const updateUser = async ({
  email,
  display_name,
  description,
  phone,
  image,
}: {
  email?: string;
  display_name?: string;
  description?: string;
  phone?: string;
  image?: string;
}) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return {
      success: false,
      user: null,
    };
  }

  // Fix: Properly type the data object
  const data: {
    email?: string;
    name?: string;
    description?: string;
    phone?: string;
    image?: string;
  } = {};

  if (email) data.email = email;
  if (display_name) data.name = display_name;
  if (description) data.description = description;
  if (phone) data.phone = phone;
  if (image) data.image = image;

  try {
    const updatedUser = await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data,
    });

    console.log("updated user successfully", updatedUser);

    return {
      success: true,
      user: updatedUser,
    };
  } catch (error) {
    console.error("Error updating user:", error);
    return {
      success: false,
      user: null,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};

export const addUserImages = async (newImages: string[]) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return { success: false, user: null, error: "Unauthorized" };
  }

  try {
    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: {
        images: { push: newImages },
      },
    });

    return { success: true, user: updatedUser };
  } catch (error) {
    console.error("Error adding images:", error);
    return { success: false, user: null, error: "Failed to add images" };
  }
};
