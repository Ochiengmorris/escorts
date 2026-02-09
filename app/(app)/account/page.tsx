"use client";

import CountdownTimer from "@/components/time-remaining";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bell, Edit, KeyRound, Loader2, User } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import RenewSbuForm from "./RenewSbuForm";
import Image from "next/image";
import { dummyImages } from "@/lib/data";
import { useQuery } from "@tanstack/react-query";
import { fetchUser, updateUser } from "@/app/actions/user";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import CldUploadButtonComponent from "@/components/cld-upoad-button";
import ImageSection from "./image-section";
import ImagekitView from "@/components/ImagekitView";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  display_name: z.string().min(1, "Display name is required"),
  account_type: z.enum(["user", "escort"]),
  description: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const AccountPage = () => {
  const { data: session } = authClient.useSession();
  const [isEditing, setIsEditing] = useState(false);

  const { data, isLoading, error } = useQuery({
    queryKey: ["user", session?.user?.id],
    queryFn: fetchUser,
    enabled: !!session?.user,
  });

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      display_name: "",
      account_type: "user",
      description: "",
    },
  });

  useEffect(() => {
    if (data?.user) {
      form.reset({
        email: data.user.email || "",
        display_name: data.user.name || "",
        account_type: data.user.type || "user",
        description: data.user.description || "",
      });
    }
  }, [data?.user, form]);

  async function onSubmit(values: FormValues) {
    try {
      // TODO: Implement your update logic here
      const result = await updateUser(values);

      if (result.success) {
        toast.success("Profile updated successfully");
      } else {
        toast.error("Failed to update profile");
      }
    } catch (error) {
      toast.error("Failed to update profile");
      console.error("Update error:", error);
    }
  }

  if (!session?.user) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
        Login to view this page
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
        <Loader2 className="size-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
        <div className="text-center">
          <p className="text-destructive">Failed to load user data</p>
          <Button onClick={() => window.location.reload()} className="mt-4">
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className=" border min-h-[calc(100vh-200px)] w-full p-4">
      <Tabs className="w-full " defaultValue="account">
        <TabsList>
          <TabsTrigger value="account">
            <User className="mr-2 size-4" />
            Account
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="mr-2 size-4" />
            Notifications
          </TabsTrigger>
        </TabsList>

        <TabsContent value="account" className="w-full h-full">
          <div className="grid grid-cols-1 md:grid-cols-2 w-full lg:grid-cols-3 text-card-foreground gap-4 rounded-xl">
            {/* Profile Section */}
            <div className="flex flex-col gap-4">
              <div className="flex flex-col items-start p-4 gap-4 rounded-xl bg-card">
                <div className="flex items-start gap-4 w-full">
                  <div className="relative aspect-square h-30 border-none overflow-hidden flex items-center justify-center rounded-lg bg-primary/20 shrink-0">
                    {/* <User className="size-14" /> */}
                    <ImagekitView
                      src={data?.user?.images[0] || "default-image.jpg"}
                      alt="Profile picture"
                      fill
                      sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                      className="object-cover h-auto"
                    />
                    <Edit className="size-8 text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                    <button
                      onClick={() => toast("Upload profile picture")}
                      className="absolute cursor-pointer top-0 z-10 right-0 w-full h-full bg-black/20 hover:bg-black/30 transition-colors"
                      aria-label="Upload profile picture"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-semibold">{data?.user?.name}</span>
                    <span className="capitalize text-sm">
                      <b>Account type:</b> {data?.user?.type}
                    </span>
                    <span className="text-sm">
                      <b>Email:</b> {data?.user?.email}
                    </span>
                  </div>
                </div>
                <p className="italic text-xs text-muted-foreground">
                  JPEG, JPG, PNG (max. size 4MB)
                </p>
              </div>

              {/* Edit Form */}
              <div className="rounded-xl border bg-card p-6 shadow-sm">
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex flex-col gap-4"
                  >
                    <div>
                      <div className="flex justify-between items-center gap-2 ">
                        <span className="font-semibold">Account Type</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="cursor-pointer"
                          onClick={() => setIsEditing(!isEditing)}
                          type="button"
                        >
                          <Edit className="size-4" />
                        </Button>
                      </div>
                      <FormField
                        control={form.control}
                        name="account_type"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <RadioGroup
                                className="gap-2 my-4"
                                value={field.value}
                                onValueChange={field.onChange}
                              >
                                {data?.user?.type === "user" ? (
                                  <div className="relative flex cursor-pointer items-start space-x-3 rounded-lg border bg-background p-4 shadow-sm transition-colors hover:bg-accent">
                                    <RadioGroupItem id="user" value="user" />
                                    <div className="grid gap-1.5 leading-none">
                                      <Label
                                        className="cursor-pointer font-medium"
                                        htmlFor="user"
                                      >
                                        Client account
                                      </Label>
                                      <p className="text-muted-foreground text-xs md:text-sm">
                                        You have access to all our tools for the
                                        best experience.
                                      </p>
                                    </div>
                                  </div>
                                ) : (
                                  <div className="relative flex cursor-pointer items-start space-x-3 rounded-lg border bg-background p-4 shadow-sm transition-colors hover:bg-accent">
                                    <RadioGroupItem
                                      id="escort"
                                      value="escort"
                                    />
                                    <div className="grid gap-1.5 leading-none">
                                      <Label
                                        className="cursor-pointer font-medium"
                                        htmlFor="escort"
                                      >
                                        Escort account
                                      </Label>
                                      <p className="text-muted-foreground text-xs md:text-sm">
                                        Get access to all our ad tools for 100%
                                        visibility
                                      </p>
                                    </div>
                                  </div>
                                )}
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

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
                              {...field}
                              disabled={!isEditing}
                              className="disabled:text-foreground disabled:opacity-100 focus:outline-none focus:ring-0 focus-visible:ring-0 text-xs md:text-sm"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="display_name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel htmlFor="display_name">
                            Display Name
                          </FormLabel>
                          <FormControl>
                            <Input
                              id="display_name"
                              placeholder="John Doe"
                              type="text"
                              autoComplete="name"
                              {...field}
                              disabled={!isEditing}
                              className="disabled:text-foreground disabled:opacity-100 focus:outline-none focus:ring-0 focus-visible:ring-0 text-xs md:text-sm"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel htmlFor="description">
                            Description
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              id="description"
                              placeholder="Tell us about yourself..."
                              rows={4}
                              {...field}
                              disabled={!isEditing}
                              className="disabled:text-foreground disabled:opacity-100 disabled:cursor-default focus:outline-none focus:ring-0 focus-visible:ring-0 text-xs md:text-sm"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      variant="default"
                      type="submit"
                      className={cn(
                        "font-semibold text-xs md:text-sm",
                        !isEditing && "hidden"
                      )}
                      disabled={form.formState.isSubmitting}
                    >
                      {form.formState.isSubmitting && (
                        <Loader2 className="mr-2 size-4 animate-spin" />
                      )}
                      Save Changes
                    </Button>
                  </form>
                </Form>
              </div>
            </div>

            {/* Images Section */}
            <ImageSection images={data?.user?.images} />

            {/* Subscription Section */}
            <div className="flex flex-col items-start p-4 gap-4 rounded-xl">
              <div className="flex flex-col gap-4 w-full">
                <span className="font-semibold">
                  Subscription Time Remaining
                </span>
                <CountdownTimer
                  from={Date.now().toString()}
                  target="2025-12-31T00:00:00"
                />
              </div>

              <div>
                <span className="font-semibold">Renew your subscription</span>
                <p className="text-xs text-muted-foreground mt-2 mb-3">
                  Avoid missing out on important updates and features and not
                  being listed on the platform.
                </p>
                <RenewSbuForm />
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="notifications">
          <div className="rounded-xl border bg-card p-6 text-card-foreground shadow-sm w-fit">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-full bg-primary/10">
                <Bell className="size-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Notifications</h3>
                <p className="text-muted-foreground text-sm">
                  Configure notification preferences
                </p>
              </div>
            </div>
            <p className="text-muted-foreground text-sm">
              Choose which notifications you want to receive and how you'd like
              to be notified.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AccountPage;
