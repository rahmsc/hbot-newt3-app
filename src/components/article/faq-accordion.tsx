import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../components/ui/accordion";
import { type ArticleItemProps } from "./article-content";

type FaqItem = ArticleItemProps["faqsArray"][number];

interface FaqAccordionProps {
  faqData: FaqItem[];
}

export default function FaqAccordion({ faqData }: FaqAccordionProps) {
  return (
    <Accordion type="single" collapsible className="w-full">
      {faqData.map((item, index) => (
        <AccordionItem
          key={`${item.question}-${index}`}
          value={`item-${index + 1}`}
        >
          <AccordionTrigger className="text-lg font-semibold">
            {item.question}
          </AccordionTrigger>
          <AccordionContent className="font p-4 text-lg">
            {item.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
