"use client";
import React from "react";
import CountdownTimer from "@/components/time-remaining";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bell, Edit, KeyRound, User } from "lucide-react";
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

const formSchema = z.object({
  email: z.string().email(),
  display_name: z.string(),
  account_type: z.string(),
  description: z.string(),
});

const AccountPage = () => {
  const form = useForm<z.infer<typeof formSchema>>({});

  async function onSubmit(values: z.infer<typeof formSchema>) {}

  return (
    <div className=" border min-h-[calc(100vh-200px)] w-full p-4">
      <Tabs className="w-full " defaultValue="account">
        <TabsList>
          <TabsTrigger value="account" className="">
            <User />
            Account
          </TabsTrigger>
          <TabsTrigger value="edit" className="">
            <Edit />
            Edit
          </TabsTrigger>
          <TabsTrigger value="notifications" className="">
            <KeyRound />
            Change password
          </TabsTrigger>
        </TabsList>
        <TabsContent value="account" className="w-full h-full">
          <div className="grid grid-cols-3 text-card-foreground gap-1 rounded-xl overflow-hidden">
            <div className="flex items-start p-4 gap-4  rounded-xl overflow-hidden bg-card">
              <div className="aspect-square h-30 border-none flex items-center justify-center rounded-lg bg-primary/20">
                <User className="size-14" />
              </div>
              <div className="flex flex-col">
                <span className="font-semibold">SteveSang46</span>
                <span>
                  <b>Account type:</b> Escort
                </span>
                <span>
                  <b>Email:</b> sangsteve@testmail.com
                </span>
              </div>
            </div>
            <div className="flex flex-col items-start border-x p-4 gap-4 w-full overflow-hidden">
              <span className="font-semibold">
                Subscription time remaining:
              </span>
              <CountdownTimer
                from={Date.now().toString()}
                target={"2025-12-31T00:00:00"}
              />
            </div>
            <div className="flex flex-col items-start p-4 gap-4 w-full rounded-xl overflow-hidden">
              <span className="font-semibold"> NewsLetter:</span>
              <span>Subscribe to monthly updates and special offers:</span>

              <div className="flex gap-2">
                <Button>Subscribe</Button>
                <Button variant={"outline"}>Unsubscribe</Button>
              </div>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="edit">
          <div className="flex rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col"
              >
                <span className="font-semibold">Account Type</span>
                {/* checkbox */}
                <RadioGroup className="gap-2 my-4" defaultValue="card-1">
                  <div className="relative flex cursor-pointer items-start space-x-3 rounded-lg border bg-background p-4 shadow-sm transition-colors hover:bg-accent">
                    <RadioGroupItem id="card-1" value="card-1" />
                    <div className="grid gap-1.5 leading-none">
                      <Label
                        className="cursor-pointer font-medium"
                        htmlFor="card-1"
                      >
                        Client account
                      </Label>
                      <p className="text-muted-foreground text-sm">
                        You have access to all our tools for the best experience
                      </p>
                    </div>
                  </div>
                  <div className="relative flex cursor-pointer items-start space-x-3 rounded-lg border bg-background p-4 shadow-sm transition-colors hover:bg-accent">
                    <RadioGroupItem id="card-3" value="card-2" />
                    <div className="grid gap-1.5 leading-none">
                      <Label
                        className="cursor-pointer font-medium"
                        htmlFor="card-3"
                      >
                        Escort account
                      </Label>
                      <p className="text-muted-foreground text-sm">
                        Get access to all our ad tools for 100% visibility
                      </p>
                    </div>
                  </div>
                </RadioGroup>

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
                  name="display_name"
                  render={({ field }) => (
                    <FormItem className="grid gap-2 mt-4">
                      <FormLabel htmlFor="display_name">Display Name</FormLabel>
                      <FormControl>
                        <Input
                          id="display_name"
                          placeholder="John Doe"
                          type="text"
                          autoComplete="display_name"
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
                  name="description"
                  render={({ field }) => (
                    <FormItem className="grid gap-2 mt-4">
                      <FormLabel htmlFor="description">Description</FormLabel>
                      <FormControl>
                        <Textarea
                          id="description"
                          placeholder="Description"
                          autoComplete="description"
                          className="focus:outline-none focus:ring-0 focus-visible:ring-0 p-6"
                          rows={4}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  variant={"default"}
                  type="submit"
                  className="mt-4 font-semibold"
                >
                  Save
                </Button>
              </form>
            </Form>
            <div className="ml-8 flex border-l pl-8 flex-col">
              <span className="font-semibold mb-4">Profile Picture</span>

              <div className="aspect-square h-30 border-none flex items-center w-fit justify-center rounded-lg bg-primary/20">
                <User className="size-14" />
              </div>

              <p className="mt-2 italic text-xs">
                JPEG, JPG, PNG, GIF (max. size 4MB)
              </p>

              <div className="flex gap-2 mt-4">
                <Button variant={"outline"}>Remove</Button>
                <Button>Change</Button>
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
