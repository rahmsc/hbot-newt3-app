export interface Testimonial {
  id: number;
  quote: string;
  author: string;
  title: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    quote: "Becoming a healthier dad for my kids - priceless.",
    author: "Josh Watts",
    title: "Founder of Capital",
  },
  {
    id: 2,
    quote: "HBOT therapy changed my recovery journey completely.",
    author: "Sarah Chen",
    title: "Professional Athlete",
  },
  {
    id: 3,
    quote: "The support and expertise from the HQ team is unmatched.",
    author: "Dr. Michael Roberts",
    title: "Medical Director",
  },
  {
    id: 4,
    quote: "A game-changer for our patients' treatment outcomes.",
    author: "Dr. Emma Thompson",
    title: "Clinical Specialist",
  },
];
