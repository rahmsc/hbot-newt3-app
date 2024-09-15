export interface ResearchItem {
  id: number;
  category: string;
  condition: string;
  conditionTag: string;
}

export const conditionCategories: string[] = [
  "All",
  "Neurological",
  "Immune and Chronic Conditions",
  "Bone and Tissue Health",
  "Cardiovascular and Blood Conditions",
  "Mental Health",
];

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
  {
    id: 13,
    category: "Immune and Chronic Conditions",
    condition: "Liver Disease",
    conditionTag: "liver-disease",
  },
  {
    id: 14,
    category: "Immune and Chronic Conditions",
    condition: "Diabetes",
    conditionTag: "diabetes",
  },
  {
    id: 15,
    category: "Immune and Chronic Conditions",
    condition: "Chronic Infection",
    conditionTag: "chronic-infection",
  },
  {
    id: 16,
    category: "Immune and Chronic Conditions",
    condition: "HIV Infection",
    conditionTag: "hiv-infection",
  },
  {
    id: 17,
    category: "Immune and Chronic Conditions",
    condition: "Inflammation",
    conditionTag: "inflammation",
  },
  {
    id: 18,
    category: "Immune and Chronic Conditions",
    condition: "Arthritis",
    conditionTag: "arthritis",
  },
  {
    id: 19,
    category: "Immune and Chronic Conditions",
    condition: "Mold Exposure",
    conditionTag: "mold-exposure",
  },
  {
    id: 20,
    category: "Immune and Chronic Conditions",
    condition: "Obesity",
    conditionTag: "obesity",
  },
  {
    id: 21,
    category: "Immune and Chronic Conditions",
    condition: "COVID-19",
    conditionTag: "covid-19",
  },
  {
    id: 22,
    category: "Immune and Chronic Conditions",
    condition: "Pulmonary Fibrosis",
    conditionTag: "pulmonary-fibrosis",
  },
  {
    id: 23,
    category: "Bone and Tissue Health",
    condition: "Aging",
    conditionTag: "aging",
  },
  {
    id: 24,
    category: "Cardiovascular and Blood Conditions",
    condition: "Cardiovascular System",
    conditionTag: "cardiovascular-system",
  },
  {
    id: 25,
    category: "Cardiovascular and Blood Conditions",
    condition: "Heart Conditions",
    conditionTag: "heart-conditions",
  },
  {
    id: 26,
    category: "Cardiovascular and Blood Conditions",
    condition: "High Blood Pressure",
    conditionTag: "high-blood-pressure",
  },
  {
    id: 27,
    category: "Mental Health",
    condition: "PTSD",
    conditionTag: "ptsd",
  },
  {
    id: 28,
    category: "Mental Health",
    condition: "Drug & Alcohol Dependency",
    conditionTag: "drug-and-alcohol-dependency",
  },
  {
    id: 29,
    category: "Mental Health",
    condition: "Anxiety",
    conditionTag: "anxiety",
  },
  {
    id: 30,
    category: "Mental Health",
    condition: "Depression",
    conditionTag: "depression",
  },
];
