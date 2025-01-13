import React, { type ReactNode } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

export interface AccordionProp {
  trigger: ReactNode;
  content: ReactNode;
}

export default function AccordionTemplate({ trigger, content }: AccordionProp) {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>{trigger}</AccordionTrigger>
        <AccordionContent className="pt-6">{content}</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
