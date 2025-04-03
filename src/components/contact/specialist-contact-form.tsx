"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ArrowRight, User, Mail, MessageSquare, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "~/components/ui/dialog";
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
import { submitContactForm } from "~/actions/contact";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormData = z.infer<typeof formSchema>;

interface SpecialistContactFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SpecialistContactForm({
  isOpen,
  onClose,
}: SpecialistContactFormProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "I would like to speak with a HBOT specialist about:",
    },
  });

  async function onSubmit(data: FormData) {
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("message", data.message);

      const result = await submitContactForm(null, formData);

      if (result.success) {
        toast({
          title: "Message Sent",
          description: result.message,
        });
        form.reset();
        onClose();
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
      setIsSubmitting(false);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md sm:max-w-lg md:max-w-xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-900 sm:text-2xl">
            Speak to a HBOT Specialist
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            Fill out the form below and our team will get back to you quickly.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium text-gray-700">
                    Your Name
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-400" />
                      <Input
                        placeholder="Enter your name"
                        {...field}
                        className="h-12 rounded-md border-gray-300 pl-10 focus:border-emerald-500 focus:ring-emerald-500"
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium text-gray-700">
                    Email Address
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-400" />
                      <Input
                        placeholder="Enter your email"
                        {...field}
                        className="h-12 rounded-md border-gray-300 pl-10 focus:border-emerald-500 focus:ring-emerald-500"
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium text-gray-700">
                    Message
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <MessageSquare className="absolute left-3 top-3 text-gray-400" />
                      <Textarea
                        placeholder="Tell us what you'd like to discuss"
                        className="min-h-[120px] rounded-md border-gray-300 pl-10 focus:border-emerald-500 focus:ring-emerald-500"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            <div className="flex justify-end space-x-4 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="px-6"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex items-center gap-2 bg-[#2B5741] px-6 text-white hover:bg-emerald-600"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
