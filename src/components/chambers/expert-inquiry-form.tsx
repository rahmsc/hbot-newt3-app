"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { motion } from "framer-motion"
import { ArrowRight, User, Mail, MessageSquare } from "lucide-react"

import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Textarea } from "~/components/ui/textarea"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form"
import { toast } from "~/hooks/use-toast"
import type { chambersDataProp } from "~/types/chambers"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
})

interface InquiryFormProps {
  chamber: chambersDataProp
  onClose: () => void
}

export function ExpertInquiryForm({ chamber, onClose }: InquiryFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    // Here you would typically send the form data to your server
    // along with the chamber data
    console.log("Form data:", values)
    console.log("Chamber data:", chamber)

    // Simulating an API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsSubmitting(false)
    toast({
      title: "Inquiry Sent",
      description: "We'll get back to you soon!",
    })
    onClose()
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="rounded-lg shadow-lg"
    >
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Speak to an Expert</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700">Name</FormLabel>
                <FormControl>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input
                      placeholder="Your name"
                      {...field}
                      className="bg-white pl-10 h-12 border-gray-300 rounded-md focus:border-emerald-500 focus:ring-emerald-500"
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
                <FormLabel className="text-gray-700">Email</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input
                      placeholder="Your email"
                      {...field}
                      className="bg-white pl-10 h-12 border-gray-300 rounded-md focus:border-emerald-500 focus:ring-emerald-500"
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
                <FormLabel className="text-gray-700">Message</FormLabel>
                <FormControl>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-3 text-gray-400" />
                    <Textarea
                      placeholder="Your message"
                      className="bg-white pl-10 pt-2 min-h-[140px] resize-none border-gray-300 rounded-md focus:border-emerald-500 focus:ring-emerald-500"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-12 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-md transition-colors duration-300"
          >
            {isSubmitting ? "Sending..." : "Send Inquiry"}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </form>
      </Form>
    </motion.div>
  )
}

