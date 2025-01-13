export interface BlogPostFields {
  "ID Blog": string;
  "Content Idea": string;
  "Enriched Blog": string;
  Date: Date;
  Introduction: string;
  "URL Slug": string;
  Approved: boolean;
}

export interface BlogPost {
  id: string;
  fields: BlogPostFields;
}
