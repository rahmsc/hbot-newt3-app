"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { sendGAEvent } from "@next/third-parties/google";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { ArrowRight } from "lucide-react";

import { api } from "~/trpc/react";

import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { useToast } from "~/hooks/use-toast";

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
});

export default function EmailSubscriptionForm() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const emailMutation = api.email.saveEmail.useMutation({
    onSuccess: () => {
      toast({
        title: "Subscribed!",
        description: "Thank you for subscribing to our newsletter.",
      });
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      await emailMutation.mutateAsync(values);
    } catch (error) {
      // Error is handled in the onError callback of the mutation
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="w-full bg-[#FAF7F4] py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl space-y-12 text-center">
          <h2 className="font-['Raleway'] text-4xl font-medium tracking-[0.3em] text-gray-900">
            HQ INSIDER
          </h2>
          <div className="space-y-6">
            <p className="text-2xl font-light text-gray-600">
              YOUR MONTHLY DIVE INTO HBOT!
            </p>
            <p className="text-lg text-gray-800">
              STAY INFORMED WITH THE LATEST NEWS, RESEARCH, NEW WELLNESS
              PRODUCTS AND UNBEATABLE DEALS—ALL DELIVERED STRAIGHT TO YOUR
              INBOX.
            </p>
          </div>

          <div className="mx-auto max-w-md">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Enter your email"
                          {...field}
                          className="rounded-full border-gray-300 px-6 py-3 text-lg"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full rounded-full bg-gray-900 px-6 py-3 text-lg font-medium text-white transition-colors hover:bg-gray-800"
                  disabled={isLoading}
                  onClick={() =>
                    sendGAEvent("event", "buttonClicked", {
                      value: "Subscribe(HQ Insider)",
                    })
                  }
                >
                  {isLoading ? "Subscribing..." : "Subscribe"}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </form>
            </Form>
          </div>

          <p className="text-sm text-gray-500">
            We'll never share your email with anyone else.
          </p>
        </div>
      </div>
    </section>
  );
}
