"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "../components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form";
import { Input } from "../components/ui/input";
import { api } from "~/trpc/react";

const formSchema = z.object({
  email: z.string().email(),
});

const CallToAction = () => {
  const subscribeToGuides = api.guides.subscribeToProviderGuides.useMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    subscribeToGuides.mutate({
      email: values.email,
    });
    console.log(values);
    console.log("Email has been subscribed");
  }

  return (
    <div className="bg-gray-100 py-8">
      <div className="container mx-auto flex flex-col items-center justify-between px-6 lg:flex-row">
        <div className="mb-4 lg:mb-0">
          <h2 className="text-2xl font-bold text-gray-800">
            Want to receive our guides?
          </h2>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormDescription>
                    Enter your email below to get them directly in your inbox.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CallToAction;
