"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { sendGAEvent } from "@next/third-parties/google";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

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
import { subscribeToNewsletter } from "~/actions/subscribe";

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
});

const ContactSection = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("email", values.email);

      const result = await subscribeToNewsletter(null, formData);

      if (result.success) {
        toast({
          title: "Success!",
          description: result.message,
        });
        form.reset();
      } else {
        toast({
          title: "Error",
          description: result.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }

    // Send GA event after attempt (success or failure)
    sendGAEvent("event", "buttonClicked", {
      value: "Subscribe(HQ Insider)",
    });
  }

  return (
    <section className="relative w-full">
      <div className="container mx-auto max-w-3xl px-4 pt-8 text-center">
        <div className="space-y-6">
          <h3 className="font-['Raleway'] text-3xl font-medium tracking-[0.2em] text-gray-900">
            HQ INSIDER
          </h3>
          <div className="space-y-4">
            <p className="text-xl font-medium text-gray-600">
              YOUR MONTHLY DIVE INTO HBOT!
            </p>
            <p className="mx-auto max-w-4xl text-lg text-gray-800">
              STAY INFORMED WITH THE LATEST NEWS, RESEARCH, NEW WELLNESS
              PRODUCTS AND UNBEATABLE DEALS—ALL DELIVERED STRAIGHT TO YOUR
              INBOX.
            </p>
          </div>
        </div>

        <div className="mx-auto mt-12 max-w-sm">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Enter your email"
                        {...field}
                        className="h-12 rounded-full border-gray-300 px-6 text-lg shadow-sm transition-all focus:border-emerald-500 focus:ring-emerald-500"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="h-12 w-full rounded-full bg-black px-6 text-lg font-medium text-white transition-all hover:bg-emerald-600"
                disabled={isLoading}
              >
                {isLoading ? "Subscribing..." : "Subscribe"}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </form>
          </Form>
        </div>

        <p className="mt-6 text-center text-sm text-gray-500">
          We&apos;ll never share your email with anyone else.
        </p>
      </div>
    </section>
  );
};

export default ContactSection;
