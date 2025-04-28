"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Building2, CheckCircle, Clock, Info } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useState } from "react";

import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { Textarea } from "~/components/ui/textarea";
import { toast } from "~/hooks/use-toast";

const businessTypes = [
  "wellness_centre",
  "hospital",
  "medical_practice",
  "chiropractor",
  "physiotherapist",
  "gym",
  "other",
] as const;

const businessTypeLabels: Record<(typeof businessTypes)[number], string> = {
  wellness_centre: "Wellness Centre",
  hospital: "Hospital",
  medical_practice: "Medical Practice",
  chiropractor: "Chiropractor",
  physiotherapist: "Physiotherapist",
  gym: "Gym",
  other: "Other",
};

const chamberTypes = [
  "Hard Shell",
  "Soft Shell",
  "Monoplace",
  "Multiplace",
] as const;

const chamberTypeLabels: Record<(typeof chamberTypes)[number], string> = {
  "Hard Shell": "Hard Shell",
  "Soft Shell": "Soft Shell",
  Monoplace: "Monoplace",
  Multiplace: "Multiplace",
};

const daysOfWeek = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
] as const;

const formSchema = z.object({
  businessType: z.enum(businessTypes),
  businessName: z.string().min(2, "Business name is required"),
  legalBusinessName: z.string().min(2, "Legal business name is required"),
  role: z.enum(["owner", "employee", "agency"]),
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Invalid email address"),
  website: z
    .union([z.string().url("Invalid website URL"), z.string().max(0)])
    .optional()
    .transform((val) => (val === "" ? undefined : val)),
  phone: z.string().min(10, "Phone number is required"),
  address: z.string().min(5, "Address is required"),
  bookingLink: z
    .union([z.string().url("Invalid booking URL"), z.string().max(0)])
    .optional()
    .transform((val) => (val === "" ? undefined : val)),
  chamberType: z.enum(chamberTypes),
  pressureCapacity: z.string().min(1, "Pressure capacity is required"),
  hours: z
    .record(
      z.enum(daysOfWeek),
      z.object({
        isOpen: z.boolean().default(false),
        openTime: z.string().optional(),
        closeTime: z.string().optional(),
      }),
    )
    .optional(),
  authorization: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms",
  }),
});

type FormValues = z.infer<typeof formSchema>;

export default function SubmitPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      authorization: false,
      role: "owner",
      hours: {
        monday: { isOpen: false },
        tuesday: { isOpen: false },
        wednesday: { isOpen: false },
        thursday: { isOpen: false },
        friday: { isOpen: false },
        saturday: { isOpen: false },
        sunday: { isOpen: false },
      },
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);

    try {
      for (const day of daysOfWeek) {
        if (data.hours?.[day]?.isOpen) {
          if (!data.hours[day].openTime || !data.hours[day].closeTime) {
            toast({
              title: "Invalid Hours",
              description: `Please set both open and close time for ${day}.`,
              variant: "destructive",
            });
            setIsSubmitting(false);
            return;
          }
        }
      }

      const response = await fetch("/api/providers/submit-provider", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          business_name: data.businessName,
          legal_business_name: data.legalBusinessName,
          first_name: data.firstName,
          last_name: data.lastName,
          email: data.email,
          phone: data.phone,
          website: data.website ?? "",
          address: data.address,
          booking_link: data.bookingLink ?? "",
          chamber_type: data.chamberType,
          pressure_capacity: data.pressureCapacity,
          hours: data.hours,
          approved: false,
          your_role: data.role,
          business_type: data.businessType,
          isAuthorized: data.authorization,
        }),
      });

      let responseData: {
        error?: string;
        message?: string;
        provider?: Record<string, unknown>;
      } = {};

      try {
        responseData = await response.json();
      } catch (parseError) {
        console.error("Error parsing response:", parseError);
        throw new Error("Failed to parse server response");
      }

      if (!response.ok) {
        throw new Error(
          responseData?.error ??
            responseData?.message ??
            `Failed to submit provider (Status: ${response.status})`,
        );
      }

      toast({
        title: "Application Submitted",
        description: "We'll review your application and get back to you soon.",
        variant: "default",
      });

      setTimeout(() => {
        router.push("/providers");
      }, 2000);
    } catch (error) {
      console.error("Submission error:", error);
      toast({
        title: "Error",
        description:
          error instanceof Error
            ? error.message
            : "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
          <p className="text-lg text-gray-200">
            Join our network of verified hyperbaric oxygen therapy providers.
          </p>
        </div>
      </section>

      <div className="container max-w-3xl py-12">
        <Card className="overflow-hidden border-none bg-white shadow-lg">
          <CardHeader className="space-y-4 text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-xl bg-[#2B5741]">
              <Building2 className="h-10 w-10 text-white" />
            </div>
            <div className="space-y-2">
              <h2 className="font-['Raleway'] text-2xl font-normal tracking-wider">
                ADD MY BUSINESS
              </h2>
              <p className="text-sm text-muted-foreground">
                Complete the form to submit your business for approval
              </p>
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
                  aria-invalid={!!form.formState.errors.businessType}
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
                    Please select a business type
                  </p>
                )}
              </div>

              <div className="space-y-4">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="businessName">Business Name</Label>
                    <Input
                      id="businessName"
                      {...form.register("businessName")}
                      placeholder="Enter your business name"
                      className="border-gray-200"
                    />
                    {form.formState.errors.businessName && (
                      <p className="text-sm text-red-500">
                        {form.formState.errors.businessName.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="legalBusinessName">
                      Legal Business Name
                    </Label>
                    <Input
                      id="legalBusinessName"
                      {...form.register("legalBusinessName")}
                      placeholder="Enter legal business name"
                      className="border-gray-200"
                    />
                    {form.formState.errors.legalBusinessName && (
                      <p className="text-sm text-red-500">
                        {form.formState.errors.legalBusinessName.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <Label>Your Role</Label>
                <RadioGroup
                  defaultValue="owner"
                  className="flex gap-4"
                  onValueChange={(value) =>
                    form.setValue(
                      "role",
                      value as "owner" | "employee" | "agency",
                    )
                  }
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
                  {form.formState.errors.firstName && (
                    <p className="text-sm text-red-500">
                      {form.formState.errors.firstName.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    {...form.register("lastName")}
                    placeholder="Enter your last name"
                    className="border-gray-200"
                  />
                  {form.formState.errors.lastName && (
                    <p className="text-sm text-red-500">
                      {form.formState.errors.lastName.message}
                    </p>
                  )}
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
                {form.formState.errors.email && (
                  <p className="text-sm text-red-500">
                    {form.formState.errors.email.message}
                  </p>
                )}
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
                {form.formState.errors.phone && (
                  <p className="text-sm text-red-500">
                    {form.formState.errors.phone.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Business Address</Label>
                <Textarea
                  id="address"
                  {...form.register("address")}
                  placeholder="Enter your business address"
                  className="min-h-[80px] border-gray-200"
                />
                {form.formState.errors.address && (
                  <p className="text-sm text-red-500">
                    {form.formState.errors.address.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  type="url"
                  {...form.register("website")}
                  placeholder="Enter your website URL"
                  className="border-gray-200"
                />
                {form.formState.errors.website && (
                  <p className="text-sm text-red-500">
                    {form.formState.errors.website.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="bookingLink">Booking Link</Label>
                <Input
                  id="bookingLink"
                  type="url"
                  {...form.register("bookingLink")}
                  placeholder="Enter your booking website URL"
                  className="border-gray-200"
                />
                {form.formState.errors.bookingLink && (
                  <p className="text-sm text-red-500">
                    {form.formState.errors.bookingLink.message}
                  </p>
                )}
              </div>

              <div className="space-y-4">
                <Label htmlFor="chamberType">Chamber Type</Label>
                <select
                  id="chamberType"
                  {...form.register("chamberType")}
                  className="w-full rounded-md border border-gray-200 p-2"
                  aria-invalid={!!form.formState.errors.chamberType}
                >
                  <option value="">Select chamber type</option>
                  {chamberTypes.map((type) => (
                    <option key={type} value={type}>
                      {chamberTypeLabels[type]}
                    </option>
                  ))}
                </select>
                {form.formState.errors.chamberType && (
                  <p className="text-sm text-red-500">
                    Please select a chamber type
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="pressureCapacity">Pressure Capacity</Label>
                <Input
                  id="pressureCapacity"
                  {...form.register("pressureCapacity")}
                  placeholder="Enter chamber pressure capacity (e.g., 2.4 ATA)"
                  className="border-gray-200"
                />
                {form.formState.errors.pressureCapacity && (
                  <p className="text-sm text-red-500">
                    {form.formState.errors.pressureCapacity.message}
                  </p>
                )}
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-[#2B5741]" />
                  <Label className="text-lg font-medium">Business Hours</Label>
                </div>

                <div className="space-y-4">
                  {daysOfWeek.map((day) => (
                    <div
                      key={day}
                      className="grid grid-cols-[1fr_2fr_2fr] items-center gap-4"
                    >
                      <Label className="capitalize">{day}</Label>

                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id={`${day}-open`}
                          checked={form.watch(`hours.${day}.isOpen`)}
                          onChange={(e) => {
                            form.setValue(
                              `hours.${day}.isOpen`,
                              e.target.checked,
                            );
                            if (!e.target.checked) {
                              form.setValue(`hours.${day}.openTime`, undefined);
                              form.setValue(
                                `hours.${day}.closeTime`,
                                undefined,
                              );
                            }
                          }}
                          className="h-4 w-4 rounded border-gray-300"
                        />
                        <Label htmlFor={`${day}-open`} className="text-sm">
                          Open
                        </Label>
                      </div>

                      {form.watch(`hours.${day}.isOpen`) && (
                        <div className="grid grid-cols-2 gap-2">
                          <select
                            {...form.register(`hours.${day}.openTime`, {
                              required: form.watch(`hours.${day}.isOpen`),
                            })}
                            className={`w-full rounded-md border ${
                              form.watch(`hours.${day}.isOpen`) &&
                              !form.watch(`hours.${day}.openTime`)
                                ? "border-red-300"
                                : "border-gray-200"
                            } p-2`}
                          >
                            <option value="">Open time</option>
                            {Array.from({ length: 48 }).map((_, i) => {
                              const hour = Math.floor(i / 2);
                              const minute = i % 2 === 0 ? "00" : "30";
                              const time = `${hour.toString().padStart(2, "0")}:${minute}`;
                              return (
                                <option key={`open-${time}`} value={time}>
                                  {time}
                                </option>
                              );
                            })}
                          </select>
                          <select
                            {...form.register(`hours.${day}.closeTime`, {
                              required: form.watch(`hours.${day}.isOpen`),
                            })}
                            className={`w-full rounded-md border ${
                              form.watch(`hours.${day}.isOpen`) &&
                              !form.watch(`hours.${day}.closeTime`)
                                ? "border-red-300"
                                : "border-gray-200"
                            } p-2`}
                          >
                            <option value="">Close time</option>
                            {Array.from({ length: 48 }).map((_, i) => {
                              const hour = Math.floor(i / 2);
                              const minute = i % 2 === 0 ? "00" : "30";
                              const time = `${hour.toString().padStart(2, "0")}:${minute}`;
                              return (
                                <option key={`close-${time}`} value={time}>
                                  {time}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-2">
                  <input
                    type="checkbox"
                    id="authorization"
                    className="mt-1"
                    {...form.register("authorization")}
                  />
                  <Label
                    htmlFor="authorization"
                    className="text-sm leading-none"
                  >
                    I have the legal authorisation to represent this business
                    and provide the verification documents if requested.
                  </Label>
                </div>
                {form.formState.errors.authorization && (
                  <p className="text-sm text-red-500">
                    {form.formState.errors.authorization.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full bg-[#2B5741] hover:bg-emerald-800"
                size="lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </Button>

              <p className="text-center text-sm text-muted-foreground">
                By continuing, you agree to our{" "}
                <Link
                  href="/terms"
                  className="text-[#2B5741] underline underline-offset-4 hover:text-emerald-800"
                >
                  Terms of Use
                </Link>{" "}
                and our{" "}
                <Link
                  href="/privacy"
                  className="text-[#2B5741] underline underline-offset-4 hover:text-emerald-800"
                >
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
                    <h3 className="font-['Raleway'] text-lg font-medium">
                      Verify Business
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Once your application is approved, you will be contacted
                      to verify your business and identification.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <Info className="h-6 w-6 text-[#2B5741]" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-['Raleway'] text-lg font-medium">
                      Assessment & Scoring
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Your business will be assessed, scored and listed. On
                      approval representatives may be sent to assess your
                      equipment safety, protocols and support which will also
                      reflect in rating assessment.
                    </p>
                  </div>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
