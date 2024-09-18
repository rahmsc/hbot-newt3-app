import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../components/ui/accordion";

export interface FaqItem {
  question: string;
  answer: string;
}

interface FaqAccordionProps {
  faqData: FaqItem[];
}

export default function FaqAccordion({ faqData }: FaqAccordionProps) {
  if (!Array.isArray(faqData) || faqData.length === 0) {
    return <p>No FAQs available.</p>;
  }

  return (
    <Accordion type="single" collapsible className="w-full">
      {faqData.map((item, index) => (
        <AccordionItem
          key={`${item.question}-${index}`}
          value={`item-${index + 1}`}
          className="border-b-0"
        >
          <AccordionTrigger className="text-md justify-start border-b-0 text-left font-semibold !no-underline hover:text-orange-500 hover:no-underline">
            {item.question}
          </AccordionTrigger>
          <AccordionContent className="font text-thin p-4 text-left">
            {item.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
