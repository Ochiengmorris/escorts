"use server";

import { auth } from "@/lib/auth";
import { APIError } from "better-auth";

export const signIn = async (
  email: string,
  password: string,
  callbackURL: string
) => {
  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  try {
    const result = await auth.api.signInEmail({
      body: {
        email,
        password,
        callbackURL: callbackURL || "/",
      },
      // asResponse: true,
    });
    return result;
  } catch (error) {
    if (error instanceof APIError) {
      console.log(error.message, error.status);
    }
  }
};

export const signInWithGoogle = async () => {};

export const signUp = async (
  name: string,
  email: string,
  password: string,
  callbackURL: string,
  type: "user" | "escort"
): Promise<{ success: boolean; message: string }> => {
  if (!name || !email || !password || !type) {
    throw new Error("Name, email and password are required");
  }

  try {
    const result = await auth.api.signUpEmail({
      body: {
        name,
        email,
        password,
        callbackURL: callbackURL || "/",
        type,
      },
      // asResponse: true,
    });

    if (result?.user) {
      return { success: true, message: "Sign up successful" };
    }

    return { success: false, message: "Sign up failed" };
  } catch (error) {
    if (error instanceof APIError) {
      return { success: false, message: error.message };
    }
    throw error;
  }
};
