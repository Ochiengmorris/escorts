"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { images } from "@/images/images";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "@/app/actions/sign-in";

const formSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(1, "Password is required"),
});

const LoginForm = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    try {
      const result = await signIn(values.email, values.password, callbackUrl);

      if (!result?.user) {
        toast.error("Invalid credentials");
        return;
      }

      toast.success("Signed in successfully!");
      router.push(callbackUrl);
    } catch (error) {
      toast.error("An unexpected error occurred");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }
  const signInWithGoogle = () => {
    toast("Feature coming soon");
  };

  return (
    <Form {...form}>
      <div className="mb-6">
        <Button
          variant={"outline"}
          onClick={signInWithGoogle}
          className="w-full flex items-center gap-2 mt-3 cursor-pointer text-xs md:text-sm"
          disabled={loading}
        >
          <Image src={images.googleicon} alt="Google" className="size-5" />
          Login with Google
        </Button>
      </div>
      <div className="border-2 mb-6 relative"></div>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid gap-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="grid gap-2">
                <FormLabel htmlFor="email">Email</FormLabel>
                <FormControl>
                  <Input
                    id="email"
                    placeholder="johndoe@mail.com"
                    type="email"
                    autoComplete="email"
                    className="focus:outline-none focus:ring-0 focus-visible:ring-0 md:p-6 p-4 text-xs md:text-sm"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="grid gap-2">
                <div className="flex justify-between items-center">
                  <FormLabel htmlFor="password">Password</FormLabel>
                </div>
                <FormControl>
                  <Input
                    id="password"
                    placeholder="Enter password"
                    autoComplete="current-password"
                    className="focus:outline-none focus:ring-0 focus-visible:ring-0 md:p-6 p-4 text-xs md:text-sm"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Link
            href="#"
            className="ml-auto inline-block text-xs md:text-sm underline"
          >
            Forgot your password?
          </Link>
          <div className="flex items-center w-full justify-start gap-3">
            <Input type="checkbox" className="md:size-4 size-3" />
            <span className="w-full text-xs md:text-sm">Remember me</span>
          </div>

          <Button
            type="submit"
            className="w-full text-xs md:text-sm font-semibold"
          >
            {loading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              "Login"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default LoginForm;
