import type { FeatureTag } from "~/types/feature-tags";

const AWS_URL = "https://hbothq-bucket.s3.ap-southeast-2.amazonaws.com/joinhq";

export const featureTags: FeatureTag[] = [
  {
    id: "studies",
    label: "Studies",
    iconPath: "/logo/joinhq/symbols/studies_icon.png",
    description:
      "Access our curated library of peer-reviewed hyperbaric research organized by condition. From clinical studies to treatment protocols, find the scientific validation you need to make informed decisions about HBOT therapy.",
    images: {
      topHorizontal: `${AWS_URL}/studies/1.png`,
      bottomHorizontal: `${AWS_URL}/studies/2.png`,
      vertical: `${AWS_URL}/studies/3.png`,
    },
  },
  {
    id: "chambers",
    label: "Chambers",
    iconPath: "/logo/joinhq/symbols/chambers_icon.png",
    description:
      "Discover hyperbaric chambers that meet the highest safety and performance standards. Whether for clinical use or home therapy, find the perfect chamber with transparent specifications, expert ratings, and implementation guidance.",
    images: {
      topHorizontal: `${AWS_URL}/chambers/1.png`,
      bottomHorizontal: `${AWS_URL}/chambers/2.png`,
      vertical: `${AWS_URL}/chambers/3.png`,
    },
  },
  {
    id: "services",
    label: "Services",
    iconPath: "/logo/joinhq/symbols/service_icon.png",
    description:
      "Transform your practice or begin your healing journey with our end-to-end services. From space planning and installation to training and maintenance, we provide the expertise you need for successful HBOT integration.",
    images: {
      topHorizontal: `${AWS_URL}/services/1.png`,
      bottomHorizontal: `${AWS_URL}/services/2.png`,
      vertical: `${AWS_URL}/services/3.png`,
    },
  },
  {
    id: "practitioners",
    label: "Practitioners",
    iconPath: "/logo/joinhq/symbols/practitioners_icon.png",
    description:
      "Access our global network of qualified hyperbaric specialists. Find practitioners with proven experience, verified credentials, and condition-specific expertise to guide your treatment or enhance your professional network.",
    images: {
      topHorizontal: `${AWS_URL}/practitioners/1.png`,
      bottomHorizontal: `${AWS_URL}/practitioners/2.png`,
      vertical: `${AWS_URL}/practitioners/3.png`,
    },
  },
  {
    id: "support",
    label: "Support",
    iconPath: "/logo/joinhq/symbols/support_icon.png",
    description:
      "Never navigate HBOT alone. Our dedicated support team provides ongoing assistance, troubleshooting, protocol updates, and community connection to ensure optimal outcomes for both practitioners and patients.",
    images: {
      topHorizontal: `${AWS_URL}/support/1.png`,
      bottomHorizontal: `${AWS_URL}/support/2.png`,
      vertical: `${AWS_URL}/support/3.png`,
    },
  },
];
