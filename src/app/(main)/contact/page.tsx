"use client";

import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useState } from "react";

import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { useToast } from "~/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import LinkSection from "~/components/sections/link-section";

import ImageSection from "~/components/sections/image-section";
import { GuideDialog } from "~/components/guides/guide-dialog";

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

const guideDetails = [
  "The Science Behind HBOT: Understand how increased pressure and pure oxygen help regeneration, longevity and wellness.",
  "Types of HBOT Chambers: Compare soft-shell, hard-shell monoplace, and multiplace chambers to find the perfect fit for your space.",
  "Space and Installation Requirements: Plan your space with confidence using our spatial guidelines.",
  "Investment and ROI Analysis: Detailed breakdown of costs, pressure ranges, potential earnings, and long-term value considerations.",
  "Health Benefits for You and Your Clients: Explore the wide range of conditions HBOT can address, from chronic fatigue to sports recovery.",
  "Safety and Regulatory Information: Ensure you're well-informed about the proper use and maintenance of HBOT chambers.",
  "Peer Reviewed Studies: Real-world Peer Reviewed Studies that show efficacy of HBOT.",
  "Financing Options: Flexible ways to efficiently integrate HBOT.",
];

export default function ContactPage() {
  const { toast } = useToast();
  const [selectedTemplate, setSelectedTemplate] = useState("custom");
  const [isGuideDialogOpen, setIsGuideDialogOpen] = useState(false);

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

  const handleGuideDownload = () => {
    setIsGuideDialogOpen(true);
  };

  const handleGuideSubmit = (email: string) => {
    console.log("Guide requested for email:", email);
    toast({
      title: "Guide Sent",
      description:
        "Your free HBOT Chamber Buyer's Guide has been sent to your email!",
    });
    setIsGuideDialogOpen(false);
  };

  return (
    <div className="min-h-screen pt-20 md:pt-36">
      <div className="container mx-auto px-4">
        <div className="mb-8 px-4 text-center md:mb-16">
          <h1 className="mb-4 text-3xl font-bold text-gray-900 md:mb-6 md:text-4xl lg:text-5xl">
            Considering an HBOT Chamber for Your Home or Clinic?
          </h1>
          <p className="mb-4 text-lg text-gray-700 md:mb-8 md:text-xl">
            Our comprehensive guide will help you make an informed decision and
            unlock the potential of this cutting-edge treatment.
          </p>
          <h2 className="text-xl font-semibold text-gray-800 md:text-2xl">
            Get Your Free Guide To HBOT Chambers Below
          </h2>
        </div>

        <div className="mb-8 overflow-hidden rounded-2xl bg-white shadow-lg md:mb-16">
          <div className="flex flex-col md:flex-row">
            <div className="w-full space-y-4 p-4 md:w-1/2 md:space-y-6 md:p-8">
              <h2 className="text-center text-2xl font-bold text-gray-900 md:text-3xl">
                Contact Us
              </h2>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4 md:space-y-6"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Your name"
                            {...field}
                            className="rounded-md"
                          />
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
                          <Input
                            placeholder="Your email"
                            {...field}
                            className="rounded-md"
                          />
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
                          <Input
                            placeholder="Message subject"
                            {...field}
                            className="rounded-md"
                          />
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
                        <SelectTrigger className="rounded-md">
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
                            className="min-h-[150px] rounded-md"
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
                  <Button
                    type="submit"
                    className="w-full rounded-md bg-orange-500 hover:bg-orange-600"
                  >
                    Send Message
                  </Button>
                </form>
              </Form>
            </div>
            <div className="relative hidden h-auto md:block md:w-1/2">
              <Image
                src="https://d144dqt8e4woe2.cloudfront.net/chambers/gallery/3.png"
                alt="HBOT Chamber"
                layout="fill"
                objectFit="cover"
              />
            </div>
          </div>
        </div>

        <div className="mb-8 md:mb-16">
          <h2 className="mb-4 p-2 text-center text-2xl font-bold text-gray-900 md:mb-8 md:text-3xl">
            What&apos;s Included In Our Free Guide
          </h2>
          <ul className="grid gap-4 md:grid-cols-2 md:gap-6">
            {guideDetails.map((detail, index) => (
              <li
                // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                key={index}
                className="flex items-start rounded-lg bg-white p-3 shadow-md md:p-4"
              >
                <span className="mr-2 text-xl text-orange-500 md:mr-4 md:text-2xl">
                  •
                </span>
                <span className="text-sm text-gray-700 md:text-base">
                  {detail}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-8 text-center md:mb-16">
          <p className="mb-4 px-4 text-lg text-gray-700 md:mb-8 md:text-xl">
            Have clarity when exploring HBOT with our complete guide and make
            the best decision for your home or business and clients.
          </p>
          <Button
            size="lg"
            className="rounded-full bg-orange-600 px-6 py-4 text-base font-semibold hover:bg-orange-600 md:px-8 md:py-6 md:text-lg"
            onClick={handleGuideDownload}
          >
            Download Your Free HBOT Chamber Buyer&apos;s Guide
          </Button>
        </div>

        <ImageSection />
        <LinkSection />
      </div>
      <GuideDialog
        isOpen={isGuideDialogOpen}
        onOpenChange={setIsGuideDialogOpen}
        onSubmit={handleGuideSubmit}
      />
    </div>
  );
}
