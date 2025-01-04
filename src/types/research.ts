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
