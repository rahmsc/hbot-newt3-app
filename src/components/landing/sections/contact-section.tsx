"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { sendGAEvent } from "@next/third-parties/google"
import { ArrowRight, Mail } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { motion } from "framer-motion"

import { Button } from "~/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormMessage } from "~/components/ui/form"
import { Input } from "~/components/ui/input"
import { useToast } from "~/hooks/use-toast"
import { subscribeToNewsletter } from "~/actions/subscribe"

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
})

const ContactSection = () => {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    try {
      const formData = new FormData()
      formData.append("email", values.email)

      const result = await subscribeToNewsletter(null, formData)

      if (result.success) {
        toast({
          title: "Success!",
          description: result.message,
        })
        form.reset()
      } else {
        toast({
          title: "Error",
          description: result.message,
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }

    sendGAEvent("event", "buttonClicked", {
      value: "Subscribe(HQ Insider)",
    })
  }

  return (
    <section className="relative w-full py-12 sm:py-24">
      <div className="container mx-auto max-w-4xl px-4 text-center">
        <motion.div
          className="space-y-6 sm:space-y-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="font-['Raleway'] text-3xl sm:text-4xl md:text-5xl font-bold tracking-[0.2em] text-gray-900">
            HQ INSIDER
          </h3>
          <div className="space-y-4">
            <motion.p
              className="text-xl sm:text-2xl font-medium text-gray-700"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              YOUR MONTHLY DIVE INTO HBOT!
            </motion.p>
            <motion.p
              className="mx-auto max-w-3xl text-base sm:text-lg text-gray-600"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              STAY INFORMED WITH THE LATEST NEWS, RESEARCH, NEW WELLNESS PRODUCTS AND UNBEATABLE DEALS—ALL DELIVERED
              STRAIGHT TO YOUR INBOX.
            </motion.p>
          </div>
        </motion.div>

        <motion.div
          className="mx-auto mt-8 sm:mt-12 max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 sm:left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                        <Input
                          placeholder="Enter your email"
                          {...field}
                          className="h-12 sm:h-14 rounded-full bg-white border-gray-300 pl-10 sm:pl-12 pr-4 sm:pr-6 text-base sm:text-lg shadow-sm transition-all focus:border-emerald-500 focus:ring-emerald-500"
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-left text-sm sm:text-base mt-2" />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="h-12 sm:h-14 w-full rounded-full bg-[#2B5741] px-4 sm:px-6 text-base sm:text-lg font-semibold text-white transition-all hover:bg-emerald-500 hover:shadow-lg active:scale-95 touch-none"
                disabled={isLoading}
              >
                {isLoading ? "Subscribing..." : "Subscribe Now"}
                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </form>
          </Form>
        </motion.div>

        <motion.p
          className="mt-4 sm:mt-6 text-center text-xs sm:text-sm text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          We respect your privacy. Your information is safe and will never be shared.
        </motion.p>
      </div>
    </section>
  )
}

export default ContactSection

