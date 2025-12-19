"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";
import { useSearchParams } from "next/navigation";
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
import Link from "next/link";
import { images } from "@/images/images";
import Image from "next/image";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});
const RegisterForm = () => {
  const searchParams = useSearchParams();
  const [loading, setLoading] = React.useState(false);
  const callbackUrl = searchParams.get("callbackUrl") || "/drivers";
  // const form = useForm<z.infer<typeof formSchema>>({
  //   resolver: zodResolver(formSchema),
  //   defaultValues: {
  //     email: "",
  //     password: "",
  //   },
  // });
  const form = useForm<z.infer<typeof formSchema>>({});

  async function onSubmit(values: z.infer<typeof formSchema>) {}
  const signInWithGoogle = () => {
    toast("Feature coming soon");
  };

  return (
    <Form {...form}>
      <div className="mb-6">
        <Button
          variant={"outline"}
          onClick={signInWithGoogle}
          className="w-full flex items-center gap-2 mt-3 cursor-pointer"
          disabled={loading}
        >
          <Image src={images.googleicon} alt="Google" className="size-5" />
          Login with Google
        </Button>
      </div>
      <div className="border-2 mb-6 relative">
        {/* <span className="absolute top-1/2 right-1/2 -translate-y-1/2 p-2 border bg-primary/5 z-10">
          OR
        </span> */}
      </div>
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
                    className="focus:outline-none focus:ring-0 focus-visible:ring-0 p-6"
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
                    className="focus:outline-none focus:ring-0 focus-visible:ring-0 p-6"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* checkbox */}
          <RadioGroup className="gap-2" defaultValue="card-1">
            <div className="relative flex cursor-pointer items-start space-x-3 rounded-lg border bg-background p-4 shadow-sm transition-colors hover:bg-accent">
              <RadioGroupItem id="card-1" value="card-1" />
              <div className="grid gap-1.5 leading-none">
                <Label className="cursor-pointer font-medium" htmlFor="card-1">
                  Register as a Client
                </Label>
                <p className="text-muted-foreground text-sm">
                  Get access to all our tools for the best experience
                </p>
              </div>
            </div>
            <div className="relative flex cursor-pointer items-start space-x-3 rounded-lg border bg-background p-4 shadow-sm transition-colors hover:bg-accent">
              <RadioGroupItem id="card-3" value="card-2" />
              <div className="grid gap-1.5 leading-none">
                <Label className="cursor-pointer font-medium" htmlFor="card-3">
                  Register as an Escort
                </Label>
                <p className="text-muted-foreground text-sm">
                  Get access to all our ad tools for 100% visibility
                </p>
              </div>
            </div>
          </RadioGroup>
          <div className="flex items-center w-full justify-start gap-3">
            <Input type="checkbox" className="size-4" />
            <span className="w-full">I agree to the terms and conditions</span>
          </div>
          <Button type="submit" className="w-full">
            {loading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              "Sign Up"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default RegisterForm;
