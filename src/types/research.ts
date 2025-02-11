import type { JsonValue } from "@prisma/client/runtime/library";

export interface Category {
  id: number;
  category_name: string;
}

export interface Condition {
  id: number;
  condition_name: string;
  category_id: number;
}

export interface Article {
  id: number;
  title: string;
  content: string;
  category_id: number;
  condition_id?: number;
  date: string;
  // Add other article fields as needed
}

export interface CategoryWithConditions {
  id: number;
  category_name: string;
  conditions: Condition[];
}

export interface ArticleItemProps {
  id: number;
  category: string;
  heading: string;
  condition: string;
  conditionTag: string;
  pressureUsed: string;
  numberOfTreatments: string;
  outcomes: string;
  studyLink: string;
  publishedDate: string;
  authors: string;
  introduction: string;
  results: string;
  conclusion: string;
  faqs: string;
  conflictsOfInterest: string;
  funding: string;
  keywords: string;
  faqsArray: (JsonValue & { question: string; answer: string })[];
}
