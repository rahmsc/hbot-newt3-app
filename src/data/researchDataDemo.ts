export interface ResearchItem {
  id: number;
  category: string;
  condition: string;
  conditionTag: string;
}
function generateUrlFriendlyTag(condition: string): string {
  return condition
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export const researchItems: ResearchItem[] = [
  {
    id: 1,
    category: "Neurological",
    condition: "Alzheimer's Disease",
    conditionTag: generateUrlFriendlyTag("Alzheimer's Disease"),
  },
  {
    id: 2,
    category: "Neurological",
    condition: "Autism",
    conditionTag: generateUrlFriendlyTag("Autism"),
  },
  {
    id: 3,
    category: "Neurological",
    condition: "Brain Health",
    conditionTag: generateUrlFriendlyTag("Brain Health"),
  },
  {
    id: 4,
    category: "Neurological",
    condition: "Cerebral Palsy",
    conditionTag: generateUrlFriendlyTag("Cerebral Palsy"),
  },
  {
    id: 5,
    category: "Neurological",
    condition: "Concussion",
    conditionTag: generateUrlFriendlyTag("Concussion"),
  },
  {
    id: 6,
    category: "Neurological",
    condition: "Traumatic Brain Injury (TBI)",
    conditionTag: generateUrlFriendlyTag("Traumatic Brain Injury (TBI)"),
  },
  {
    id: 7,
    category: "Neurological",
    condition: "Parkinson's Disease",
    conditionTag: generateUrlFriendlyTag("Parkinson's Disease"),
  },
  {
    id: 8,
    category: "Neurological",
    condition: "Stroke",
    conditionTag: generateUrlFriendlyTag("Stroke"),
  },
  {
    id: 9,
    category: "Neurological",
    condition: "Degenerative Disc Disease",
    conditionTag: generateUrlFriendlyTag("Degenerative Disc Disease"),
  },
  {
    id: 10,
    category: "Neurological",
    condition: "Fibromyalgia",
    conditionTag: generateUrlFriendlyTag("Fibromyalgia"),
  },
  {
    id: 11,
    category: "Neurological",
    condition: "Fragile X Syndrome",
    conditionTag: generateUrlFriendlyTag("Fragile X Syndrome"),
  },
  {
    id: 12,
    category: "Neurological",
    condition: "Multiple Sclerosis",
    conditionTag: generateUrlFriendlyTag("Multiple Sclerosis"),
  },
];
