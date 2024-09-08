export interface ResearchItem {
  id: number;
  category: string;
  condition: string;
  conditionTag: string;
}

export const conditionCategories: string[] = ["All", "Neurological"];

export const conditions: ResearchItem[] = [
  {
    id: 1,
    category: "Neurological",
    condition: "Alzheimer's Disease",
    conditionTag: "alzheimers-disease",
  },
  {
    id: 2,
    category: "Neurological",
    condition: "Autism",
    conditionTag: "autism",
  },
  {
    id: 3,
    category: "Neurological",
    condition: "Brain Health",
    conditionTag: "brain-health",
  },
  {
    id: 4,
    category: "Neurological",
    condition: "Cerebral Palsy",
    conditionTag: "cerebral-palsy",
  },
  {
    id: 5,
    category: "Neurological",
    condition: "Concussion",
    conditionTag: "concussion",
  },
  {
    id: 6,
    category: "Neurological",
    condition: "Traumatic Brain Injury (TBI)",
    conditionTag: "tbi",
  },
  {
    id: 7,
    category: "Neurological",
    condition: "Parkinson's Disease",
    conditionTag: "parkinsons",
  },
  {
    id: 8,
    category: "Neurological",
    condition: "Stroke",
    conditionTag: "stroke",
  },
  {
    id: 9,
    category: "Neurological",
    condition: "Degenerative Disc Disease",
    conditionTag: "ddd",
  },
  {
    id: 10,
    category: "Neurological",
    condition: "Fibromyalgia",
    conditionTag: "fibromyalgia",
  },
  {
    id: 11,
    category: "Neurological",
    condition: "Fragile X Syndrome",
    conditionTag: "fragilex",
  },
  {
    id: 12,
    category: "Neurological",
    condition: "Multiple Sclerosis",
    conditionTag: "ms",
  },
];
