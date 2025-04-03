export interface Testimonial {
  id: number;
  quote: string;
  author: string;
  title: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    quote:
      "After researching HBOT for months, Hyperbaric HQ provided the clarity and confidence I needed to move forward.",
    author: "Dr. Sarah K.",
    title: "Chiropractor",
  },
  {
    id: 2,
    quote:
      "Finding reliable information about hyperbaric therapy felt impossible until I discovered Hyperbaric HQ. Their evidence-based approach helped me make the right choice for my recovery journey.",
    author: "Michael T.",
    title: "Stroke Recovery Patient",
  },
  {
    id: 3,
    quote:
      "From selecting the perfect chamber to implementing protocols, their support has been invaluable. My practice has grown 30% since adding HBOT with their guidance.",
    author: "Jennifer L.",
    title: "Wellness Center Owner",
  },
];
