"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { Textarea } from "~/components/ui/textarea";
import { Checkbox } from "~/components/ui/checkbox";
import { cn } from "~/lib/utils";
import { Check } from "lucide-react";
import {
  hbotInquiryFormSchema,
  type HBOTInquiryFormValues,
  timeZones,
  chamberModels,
  usageTypes,
  referralSources,
  fieldsByStep,
} from "~/types/form";

export function HBOTInquiryForm() {
  const [open, setOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<HBOTInquiryFormValues>({
    resolver: zodResolver(hbotInquiryFormSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      country: "",
      timezone: "",
      chamberModel: "",
      purpose: "",
      usageType: [],
      referralSource: "",
      additionalInfo: "",
    },
  });

  function onSubmit(data: HBOTInquiryFormValues) {
    setIsSubmitted(true);

    // Reset form after submission
    setTimeout(() => {
      setIsSubmitted(false);
      form.reset();
      setOpen(false);
    }, 3000);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size="lg"
          className="flex-1 rounded-full bg-[#2B5741] text-lg font-medium text-white hover:bg-emerald-800"
        >
          Speak To An Expert
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] p-6 sm:max-w-[680px] md:max-w-[800px]">
        {!isSubmitted ? (
          <>
            <DialogHeader className="mb-6">
              <DialogTitle className="text-2xl font-bold">
                HBOT Inquiry Form
              </DialogTitle>
              <DialogDescription className="mt-2 text-base">
                Book a call with an expert - Get answers now.
              </DialogDescription>
            </DialogHeader>

            <div className="-mr-2 max-h-[calc(70vh-130px)] overflow-y-auto px-1 py-1">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-10 px-2"
                >
                  {/* Contact Information Section */}
                  <div className="space-y-6">
                    <h3 className="border-b pb-2 text-lg font-medium">
                      Contact Information
                    </h3>

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem className="mb-6">
                          <FormLabel className="text-base">Email</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Your email"
                              {...field}
                              className="h-12 bg-white"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-base">
                              First Name
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="First name"
                                {...field}
                                className="h-12 bg-white"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-base">
                              Last Name
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Last name"
                                {...field}
                                className="h-12 bg-white"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="phoneNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-base">
                              Mobile Phone Number
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Your phone number"
                                {...field}
                                className="h-12 bg-white"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="country"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-base">Country</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Your country"
                                {...field}
                                className="h-12 bg-white"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="timezone"
                      render={({ field }) => (
                        <FormItem className="mt-6">
                          <FormLabel className="text-base">Time Zone</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="h-12 bg-white">
                                <SelectValue placeholder="Select your time zone" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {timeZones.map((timezone) => (
                                <SelectItem
                                  key={timezone.value}
                                  value={timezone.value}
                                >
                                  {timezone.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormDescription className="mt-1.5">
                            Please select your time zone so we know when to
                            contact you
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Product Information Section */}
                  <div className="space-y-6">
                    <h3 className="border-b pb-2 text-lg font-medium">
                      Product Information
                    </h3>

                    <FormField
                      control={form.control}
                      name="chamberModel"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel className="text-base">
                            Please select the chamber model you are considering
                          </FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="grid grid-cols-1 gap-3 md:grid-cols-2"
                            >
                              {chamberModels.map((model) => (
                                <FormItem
                                  key={model.id}
                                  className="flex items-center space-x-3 space-y-0 p-2"
                                >
                                  <FormControl>
                                    <RadioGroupItem
                                      value={model.id}
                                      className="ml-1"
                                    />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    {model.label}
                                  </FormLabel>
                                </FormItem>
                              ))}
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Usage Information Section */}
                  <div className="space-y-6">
                    <h3 className="border-b pb-2 text-lg font-medium">
                      Usage Information
                    </h3>

                    <FormField
                      control={form.control}
                      name="purpose"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel className="text-base">
                            For what purpose are you interested in HBOT?
                          </FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="grid grid-cols-1 gap-3 md:grid-cols-2"
                            >
                              <FormItem className="flex items-center space-x-3 space-y-0 p-2">
                                <FormControl>
                                  <RadioGroupItem
                                    value="personal"
                                    className="ml-1"
                                  />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  Personal use
                                </FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0 p-2">
                                <FormControl>
                                  <RadioGroupItem
                                    value="clinic"
                                    className="ml-1"
                                  />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  Clinic
                                </FormLabel>
                              </FormItem>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="usageType"
                      render={() => (
                        <FormItem className="mt-8">
                          <div className="mb-4">
                            <FormLabel className="text-base">
                              For what usage are you interested in HBOT?
                            </FormLabel>
                            <FormDescription className="mt-1">
                              Select all that apply
                            </FormDescription>
                          </div>
                          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                            {usageTypes.map((item) => (
                              <FormField
                                key={item.id}
                                control={form.control}
                                name="usageType"
                                render={({ field }) => {
                                  return (
                                    <FormItem
                                      key={item.id}
                                      className="flex flex-row items-start space-x-3 space-y-0 p-2"
                                    >
                                      <FormControl>
                                        <Checkbox
                                          checked={field.value?.includes(
                                            item.id,
                                          )}
                                          onCheckedChange={(checked) => {
                                            return checked
                                              ? field.onChange([
                                                  ...field.value,
                                                  item.id,
                                                ])
                                              : field.onChange(
                                                  field.value?.filter(
                                                    (value) =>
                                                      value !== item.id,
                                                  ),
                                                );
                                          }}
                                          className="ml-1"
                                        />
                                      </FormControl>
                                      <FormLabel className="font-normal">
                                        {item.label}
                                      </FormLabel>
                                    </FormItem>
                                  );
                                }}
                              />
                            ))}
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="referralSource"
                      render={({ field }) => (
                        <FormItem className="mt-8 space-y-3">
                          <FormLabel className="text-base">
                            How did you hear about us?
                          </FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="grid grid-cols-1 gap-3 md:grid-cols-2"
                            >
                              {referralSources.map((source) => (
                                <FormItem
                                  key={source.id}
                                  className="flex items-center space-x-3 space-y-0 p-2"
                                >
                                  <FormControl>
                                    <RadioGroupItem
                                      value={source.id}
                                      className="ml-1"
                                    />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    {source.label}
                                  </FormLabel>
                                </FormItem>
                              ))}
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="additionalInfo"
                      render={({ field }) => (
                        <FormItem className="mt-8">
                          <FormLabel className="text-base">
                            Would you like to add anything else?
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Any additional information you'd like to share"
                              className="min-h-[100px] resize-none bg-white"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Submit Button Inside Form */}
                  <Button
                    type="submit"
                    className="mt-8 h-12 w-full rounded-md bg-[#2B5741] text-base hover:bg-emerald-800"
                  >
                    Submit
                  </Button>
                </form>
              </Form>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center space-y-4 py-12">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
              <Check className="h-8 w-8 text-emerald-600" />
            </div>
            <DialogTitle className="text-center text-xl font-medium">
              Thank you for your inquiry about HBOT
            </DialogTitle>
            <DialogDescription className="text-center">
              We&apos;ll contact you shortly.
            </DialogDescription>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
