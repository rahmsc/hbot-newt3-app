"use client";

import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useState } from "react";

import { Button } from "../../components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { useToast } from "~/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  subject: z.string().min(5, {
    message: "Subject must be at least 5 characters.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
});

const messageTemplates = [
  { id: "custom", label: "Custom Message", content: "" },
  {
    id: "quote",
    label: "Get a Quote",
    content: "I would like to request a price list of the products.",
  },
  {
    id: "info",
    label: "More Information",
    content: "I would like more information about Hyperbaric Oxygen Chambers.",
  },
  {
    id: "trial",
    label: "Try a Chamber",
    content: "I would like to try out one of the chambers.",
  },
];

export default function ContactPage() {
  const { toast } = useToast();
  const [selectedTemplate, setSelectedTemplate] = useState("custom");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({
      title: "Message Sent",
      description: "Thank you for your message. We'll get back to you soon!",
    });
    form.reset();
  }

  const handleTemplateChange = (templateId: string) => {
    setSelectedTemplate(templateId);
    const template = messageTemplates.find((t) => t.id === templateId);
    if (template) {
      form.setValue("message", template.content);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background pt-32">
      <div className="flex w-full max-w-4xl overflow-hidden rounded-xl bg-card shadow-md">
        <div className="w-full space-y-6 p-8 md:w-1/2">
          <h1 className="text-center text-2xl font-bold">Contact Us</h1>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Your email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subject</FormLabel>
                    <FormControl>
                      <Input placeholder="Message subject" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormItem>
                <FormLabel>Message Template</FormLabel>
                <Select
                  onValueChange={handleTemplateChange}
                  defaultValue={selectedTemplate}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a message template" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {messageTemplates.map((template) => (
                      <SelectItem key={template.id} value={template.id}>
                        {template.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Your message"
                        {...field}
                        value={
                          selectedTemplate === "custom"
                            ? field.value
                            : (messageTemplates.find(
                                (t) => t.id === selectedTemplate,
                              )?.content ?? "")
                        }
                        onChange={(e) => {
                          field.onChange(e);
                          setSelectedTemplate("custom");
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                Send Message
              </Button>
            </form>
          </Form>
        </div>
        <div className="relative hidden md:block md:w-1/2">
          <Image
            src="https://hbothq-bucket.s3.ap-southeast-2.amazonaws.com/chambers/gallery/3.png"
            alt="Contact Us"
            layout="fill"
            objectFit="cover"
          />
        </div>
      </div>
    </div>
  );
}
