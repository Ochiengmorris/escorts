import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const RenewSbuFormSchema = z.object({
  period: z.enum(["monthly", "yearly"]),
  amount: z.number(),
  // payment_method: z.enum(["card", "mpesa"]),
  payment_number: z.string(),
});

type RenewSbuFormType = z.infer<typeof RenewSbuFormSchema>;

const RenewSbuForm = () => {
  const form = useForm<RenewSbuFormType>({
    defaultValues: {
      period: "monthly",
      amount: 0,
      payment_number: "",
    },
  });

  async function onSubmit(values: RenewSbuFormType) {
    console.log(values);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex gap-4 items-center w-full">
          <FormField
            control={form.control}
            name="period"
            render={({ field }) => (
              <FormItem className="grid gap-2 mt-4">
                <FormLabel htmlFor="period" className="font-semibold">
                  Period
                </FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="text-xs md:text-sm">
                      <SelectValue placeholder="Select a period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="yearly">Yearly</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="payment_number"
            render={({ field }) => (
              <FormItem className="grid gap-2 mt-4 w-full">
                <FormLabel htmlFor="payment_number" className="font-semibold ">
                  Payment Number
                </FormLabel>
                <FormControl>
                  <Input
                    id="payment_number"
                    placeholder="Enter payment number"
                    type="text"
                    autoComplete="payment_number"
                    className="focus:outline-none focus:ring-0 focus-visible:ring-0 text-xs md:text-sm"
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="my-6">
          <h3 className="font-semibold text-sm">Amount</h3>
          <p className="text-2xl text-muted-foreground font-semibold">
            {Number(
              form.watch("period") === "monthly" ? "1000" : "10000"
            ).toLocaleString()}{" "}
            KES
          </p>
        </div>

        <Button type="submit" className="w-full font-semibold">
          Renew
        </Button>
      </form>
    </Form>
  );
};

export default RenewSbuForm;
