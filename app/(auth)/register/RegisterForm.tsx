"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import z from "zod";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { images } from "@/images/images";
import Image from "next/image";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { signUp } from "@/app/actions/sign-in";
import { zodResolver } from "@hookform/resolvers/zod";
import { Checkbox } from "@/components/ui/checkbox";

const formSchema = z
  .object({
    email: z.string().email("Please enter a valid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Password must contain at least one uppercase letter, one lowercase letter, and one number"
      ),
    confirmPassword: z.string(),
    type: z.enum(["user", "escort"]),
    name: z
      .string()
      .min(2, "Name must be at least 2 characters")
      .max(50, "Name must be less than 50 characters"),
    terms: z.boolean().refine((val) => val === true, {
      message: "You must accept the terms and conditions",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type FormValues = z.infer<typeof formSchema>;

const RegisterForm = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      type: "user",
      name: "",
      terms: false,
    },
  });

  const isLoading = form.formState.isSubmitting;

  async function onSubmit(values: FormValues) {
    try {
      const result = await signUp(
        values.name,
        values.email,
        values.password,
        callbackUrl,
        values.type
      );

      if (!result.success) {
        toast.error(result.message || "Sign up failed");
        return;
      }

      toast.success(
        result.message || "Account created successfully! Redirecting..."
      );
      router.push(callbackUrl);
    } catch (error) {
      console.error("Sign up error:", error);
      toast.error(
        error instanceof Error ? error.message : "An unexpected error occurred"
      );
    }
  }

  const handleGoogleSignIn = () => {
    toast.info("Google sign-in coming soon!");
  };

  return (
    <div className="w-full max-w-md space-y-6">
      {/* Google Sign In Button */}
      <Button
        variant="outline"
        onClick={handleGoogleSignIn}
        className="w-full flex items-center justify-center gap-2"
        disabled={isLoading}
        type="button"
      >
        <Image
          src={images.googleicon}
          alt=""
          className="size-5"
          aria-hidden="true"
        />
        Continue with Google
      </Button>

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with email
          </span>
        </div>
      </div>

      {/* Registration Form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Account Type Selection */}
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Account Type</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    value={field.value}
                    className="gap-3"
                  >
                    <div className="relative flex cursor-pointer items-start space-x-3 rounded-lg border bg-background p-4 shadow-sm transition-colors hover:bg-accent has-data-[state=checked]:border-primary">
                      <RadioGroupItem id="user" value="user" />
                      <div className="grid gap-1.5 leading-none">
                        <Label
                          className="cursor-pointer font-medium"
                          htmlFor="user"
                        >
                          Register as a Client
                        </Label>
                        <p className="text-muted-foreground text-xs md:text-sm">
                          Get access to all our tools for the best experience
                        </p>
                      </div>
                    </div>
                    <div className="relative flex cursor-pointer items-start space-x-3 rounded-lg border bg-background p-4 shadow-sm transition-colors hover:bg-accent has-data-[state=checked]:border-primary">
                      <RadioGroupItem id="escort" value="escort" />
                      <div className="grid gap-1.5 leading-none">
                        <Label
                          className="cursor-pointer font-medium"
                          htmlFor="escort"
                        >
                          Register as an Escort
                        </Label>
                        <p className="text-muted-foreground text-xs md:text-sm">
                          Get access to all our ad tools for 100% visibility
                        </p>
                      </div>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email Field */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="email">Email</FormLabel>
                <FormControl>
                  <Input
                    id="email"
                    placeholder="johndoe@mail.com"
                    type="email"
                    autoComplete="email"
                    disabled={isLoading}
                    className="text-xs md:text-sm"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Name Field */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="name">Full Name</FormLabel>
                <FormControl>
                  <Input
                    id="name"
                    placeholder="John Doe"
                    type="text"
                    autoComplete="name"
                    disabled={isLoading}
                    className="text-xs md:text-sm"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password Fields */}
          <div className="grid grid-cols-2 sm:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <FormControl>
                    <Input
                      id="password"
                      placeholder="••••••••"
                      type="password"
                      autoComplete="new-password"
                      disabled={isLoading}
                      className="text-xs md:text-sm"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="confirmPassword">
                    Confirm Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      id="confirmPassword"
                      placeholder="••••••••"
                      type="password"
                      autoComplete="new-password"
                      disabled={isLoading}
                      className="text-xs md:text-sm"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Terms and Conditions */}
          <FormField
            control={form.control}
            name="terms"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center  space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    disabled={isLoading}
                    className="size-3 md:size-4"
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="text-xs md:text-sm font-normal cursor-pointer">
                    I agree to the{" "}
                    <a
                      href="/terms"
                      className="text-primary hover:underline font-medium"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Terms and Conditions
                    </a>
                  </FormLabel>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 size-3 md:size-4 animate-spin" />
                Creating account...
              </>
            ) : (
              "Create Account"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default RegisterForm;
