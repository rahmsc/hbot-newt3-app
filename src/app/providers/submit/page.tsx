"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Building2, CheckCircle, Info } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Badge } from "~/components/ui/badge"
import { Button } from "~/components/ui/button"
import { Card, CardContent, CardHeader } from "~/components/ui/card"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group"
import { toast } from "~/hooks/use-toast"

const businessTypes = [
  "wellness_centre",
  "hospital",
  "medical_practice",
  "chiropractor",
  "physiotherapist",
  "gym",
  "other",
] as const

const businessTypeLabels: Record<(typeof businessTypes)[number], string> = {
  wellness_centre: "Wellness Centre",
  hospital: "Hospital",
  medical_practice: "Medical Practice",
  chiropractor: "Chiropractor",
  physiotherapist: "Physiotherapist",
  gym: "Gym",
  other: "Other",
}

const formSchema = z.object({
  businessType: z.enum(businessTypes),
  businessName: z.string().min(2, "Business name is required"),
  legalName: z.string().min(2, "Legal business name is required"),
  role: z.enum(["owner", "employee", "agency"]),
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Invalid email address"),
  website: z.string().url("Invalid website URL").optional(),
  phone: z.string().min(10, "Phone number is required"),
  authorization: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms",
  }),
})

type FormValues = z.infer<typeof formSchema>

export default function SubmitPage() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      authorization: false,
    },
  })

  const onSubmit = async (data: FormValues) => {
    try {
      const response = await fetch("/api/providers/submit-provider", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          businessType: data.businessType,
          businessName: data.businessName,
          legalName: data.legalName,
          userRole: data.role,
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phone: data.phone,
          isAuthorized: data.authorization,
          website: data.website,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || "Failed to submit provider")
      }

      toast({
        title: "Application Submitted",
        description: "We'll review your application and get back to you soon.",
      })
    } catch (error) {
      console.error("Submission error:", error)
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <main className="w-full">
      {/* Hero Section */}
      <section className="relative h-[400px] w-full overflow-hidden">
        <Image
          src="/images/banners/provider-banner.png"
          alt="Hyperbaric Oxygen Therapy Providers"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="container relative flex h-full flex-col justify-end p-6">
          <div className="mb-4 flex gap-2">
            <Badge variant="default" className="bg-[#2B5741] backdrop-blur-sm">
              Providers
            </Badge>
            <Badge variant="secondary" className="bg-white/50 backdrop-blur-sm">
              HBOT
            </Badge>
          </div>
          <h1 className="mb-2 font-['Raleway'] text-4xl font-normal tracking-[0.3em] text-white">
            SUBMIT YOUR BUSINESS
          </h1>
          <p className="text-lg text-gray-200">Join our network of verified hyperbaric oxygen therapy providers.</p>
        </div>
      </section>

      <div className="container max-w-3xl py-12">
        <Card className="overflow-hidden border-none bg-white shadow-lg">
          <CardHeader className="space-y-4 text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-xl bg-[#2B5741]">
              <Building2 className="h-10 w-10 text-white" />
            </div>
            <div className="space-y-2">
              <h2 className="font-['Raleway'] text-2xl font-normal tracking-wider">ADD MY BUSINESS</h2>
              <p className="text-sm text-muted-foreground">Complete the form to submit your business for approval</p>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="space-y-4">
                <Label htmlFor="businessType">Business Type</Label>
                <select
                  id="businessType"
                  {...form.register("businessType")}
                  className="w-full rounded-md border border-gray-200 p-2"
                >
                  <option value="">Select a business type</option>
                  {businessTypes.map((type) => (
                    <option key={type} value={type}>
                      {businessTypeLabels[type]}
                    </option>
                  ))}
                </select>
                {form.formState.errors.businessType && (
                  <p className="text-sm text-red-500">
                    {form.formState.errors.businessType.message}
                  </p>
                )}
              </div>

              <div className="space-y-4">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="businessName">Business Name</Label>
                    <Input
                      id="business_name"
                      {...form.register("businessName")}
                      placeholder="Enter your business name"
                      className="border-gray-200"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="legalName">Legal Business Name</Label>
                    <Input
                      id="legal_name"
                      {...form.register("legalName")}
                      placeholder="Enter legal business name"
                      className="border-gray-200"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <Label>Your Role</Label>
                <RadioGroup
                  defaultValue="owner"
                  className="flex gap-4"
                  onValueChange={(value) => form.setValue("role", value as "owner" | "employee" | "agency")}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="owner" id="owner" />
                    <Label htmlFor="owner">Owner</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="employee" id="employee" />
                    <Label htmlFor="employee">Employee</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="agency" id="agency" />
                    <Label htmlFor="agency">Agency</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    {...form.register("firstName")}
                    placeholder="Enter your first name"
                    className="border-gray-200"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    {...form.register("lastName")}
                    placeholder="Enter your last name"
                    className="border-gray-200"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  {...form.register("email")}
                  placeholder="Enter your email"
                  className="border-gray-200"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  type="url"
                  {...form.register("website")}
                  placeholder="Enter your website"
                  className="border-gray-200"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  type="tel"
                  {...form.register("phone")}
                  placeholder="Enter your phone number"
                  className="border-gray-200"
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-2">
                  <input type="checkbox" id="authorization" className="mt-1" {...form.register("authorization")} />
                  <Label htmlFor="authorization" className="text-sm leading-none">
                    I have the legal authorisation to represent this business and provide the verification documents if
                    requested.
                  </Label>
                </div>
              </div>

              <Button type="submit" className="w-full bg-[#2B5741] hover:bg-emerald-800" size="lg">
                Submit Application
              </Button>

              <p className="text-center text-sm text-muted-foreground">
                By continuing, you agree to our{" "}
                <Link href="/terms" className="text-[#2B5741] underline underline-offset-4 hover:text-emerald-800">
                  Terms of Use
                </Link>{" "}
                and our{" "}
                <Link href="/privacy" className="text-[#2B5741] underline underline-offset-4 hover:text-emerald-800">
                  Privacy Policy
                </Link>
                .
              </p>

              <div className="space-y-6 rounded-xl border border-gray-100 bg-gray-50/50 p-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <CheckCircle className="h-6 w-6 text-[#2B5741]" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-['Raleway'] text-lg font-medium">Verify Business</h3>
                    <p className="text-sm text-muted-foreground">
                      Once your application is approved, you will be contacted to verify your business and
                      identification.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <Info className="h-6 w-6 text-[#2B5741]" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-['Raleway'] text-lg font-medium">Assessment & Scoring</h3>
                    <p className="text-sm text-muted-foreground">
                      Your business will be assessed, scored and listed. On approval representatives may be sent to
                      assess your equipment safety, protocols and support which will also reflect in rating assessment.
                    </p>
                  </div>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}

