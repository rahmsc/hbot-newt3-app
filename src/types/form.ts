import { z } from "zod";

/**
 * HBOT Inquiry Form schema with Zod validation
 */
export const hbotInquiryFormSchema = z.object({
  // Contact Information
  email: z.string().email("Please enter a valid email address"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  phoneNumber: z.string().min(1, "Phone number is required"),
  country: z.string().min(1, "Country is required"),
  timezone: z.string().min(1, "Time zone is required"),
  
  // Product Information
  chamberModel: z.string().min(1, "Please select a chamber model"),
  
  // Usage Information
  purpose: z.string().min(1, "Please select a purpose"),
  usageType: z.array(z.string()).min(1, "Please select at least one usage type"),
  referralSource: z.string().min(1, "Please select how you heard about us"),
  additionalInfo: z.string().optional(),
});

/**
 * Inferred type from the HBOT inquiry form schema
 */
export type HBOTInquiryFormValues = z.infer<typeof hbotInquiryFormSchema>;

/**
 * Time zone option type
 */
export interface TimeZoneOption {
  label: string;
  value: string;
}

/**
 * Chamber model option type
 */
export interface ChamberModelOption {
  id: string;
  label: string;
}

/**
 * Usage type option
 */
export interface UsageTypeOption {
  id: string;
  label: string;
}

/**
 * Referral source option
 */
export interface ReferralSourceOption {
  id: string;
  label: string;
}

/**
 * Available time zones for the form
 */
export const timeZones: TimeZoneOption[] = [
  { label: "GMT-12:00", value: "GMT-12:00" },
  { label: "GMT-11:00", value: "GMT-11:00" },
  { label: "GMT-10:00", value: "GMT-10:00" },
  { label: "GMT-09:00", value: "GMT-09:00" },
  { label: "GMT-08:00", value: "GMT-08:00" },
  { label: "GMT-07:00", value: "GMT-07:00" },
  { label: "GMT-06:00", value: "GMT-06:00" },
  { label: "GMT-05:00", value: "GMT-05:00" },
  { label: "GMT-04:00", value: "GMT-04:00" },
  { label: "GMT-03:00", value: "GMT-03:00" },
  { label: "GMT-02:00", value: "GMT-02:00" },
  { label: "GMT-01:00", value: "GMT-01:00" },
  { label: "GMT+00:00", value: "GMT+00:00" },
  { label: "GMT+01:00", value: "GMT+01:00" },
  { label: "GMT+02:00", value: "GMT+02:00" },
  { label: "GMT+03:00", value: "GMT+03:00" },
  { label: "GMT+04:00", value: "GMT+04:00" },
  { label: "GMT+05:00", value: "GMT+05:00" },
  { label: "GMT+06:00", value: "GMT+06:00" },
  { label: "GMT+07:00", value: "GMT+07:00" },
  { label: "GMT+08:00", value: "GMT+08:00" },
  { label: "GMT+09:00", value: "GMT+09:00" },
  { label: "GMT+10:00", value: "GMT+10:00" },
  { label: "GMT+11:00", value: "GMT+11:00" },
  { label: "GMT+12:00", value: "GMT+12:00" },
];

/**
 * Available chamber models for the form
 */
export const chamberModels: ChamberModelOption[] = [
  { id: "zeugma", label: "ZEUGMA 1 Seater 2.0 ATA" },
  { id: "atlantis", label: "ATLANTIS 2 Seater 2.0 ATA" },
  { id: "giza", label: "GIZA 4 Seater 2.0 ATA" },
  { id: "mediterranean", label: "MEDITERRANEAN 4 Seater 2.0 ATA" },
  { id: "pro", label: "PRO 1 Person 1.5 - 2.0 ATA" },
  { id: "situp", label: "SIT UP 1 Person 1.3 - 1.5 ATA" },
];

/**
 * Available usage types for the form
 */
export const usageTypes: UsageTypeOption[] = [
  { id: "wellness", label: "Longevity & General Wellness" },
  { id: "brain", label: "Brain" },
  { id: "sport", label: "Sport" },
  { id: "covid", label: "Long Covid" },
  { id: "injury", label: "Injury Recovery" },
  { id: "medical", label: "Other Medical Condition" },
];

/**
 * Available referral sources for the form
 */
export const referralSources: ReferralSourceOption[] = [
  { id: "instagram", label: "Instagram" },
  { id: "search", label: "Search Engine" },
  { id: "friend", label: "From a friend" },
  { id: "podcast", label: "Podcast" },
  { id: "clinician", label: "Referred by clinician" },
];

/**
 * Form field names grouped by step for validation
 */
export const fieldsByStep = {
  contactInfo: ["email", "firstName", "lastName", "phoneNumber", "country", "timezone"] as const,
  productInfo: ["chamberModel"] as const,
  usageInfo: ["purpose", "usageType", "referralSource"] as const
};
