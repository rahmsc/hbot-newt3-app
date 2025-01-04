"use client";

import { useState } from "react";
import { ArticlesList } from "./articles-list";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

interface ResearchContentProps {
  categories: {
    categoryId: number;
    categoryName: string;
    conditions: {
      id: number;
      name: string;
    }[];
  }[];
}

export function ResearchContent({ categories }: ResearchContentProps) {
  const [selectedConditionId, setSelectedConditionId] = useState<number | null>(
    null,
  );
  const [openCategory, setOpenCategory] = useState<string | undefined>(
    undefined,
  );

  return (
    <div className="flex flex-col gap-16">
      <div className="grid gap-8 md:grid-cols-[400px,1fr]">
        <div className="sticky top-32">
          <Accordion
            type="single"
            collapsible
            value={openCategory}
            onValueChange={setOpenCategory}
            className="mx-auto w-full max-w-3xl"
          >
            {categories.map((category) => (
              <AccordionItem
                key={category.categoryId}
                value={category.categoryId.toString()}
              >
                <AccordionTrigger className="text-xl hover:no-underline">
                  {category.categoryName}
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col gap-2 p-2">
                    {category.conditions.map((condition) => (
                      <Button
                        key={condition.id}
                        variant="ghost"
                        className="w-full justify-start rounded-lg p-2 text-left hover:bg-slate-100"
                        onClick={() => setSelectedConditionId(condition.id)}
                      >
                        {condition.name}
                      </Button>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        <ArticlesList selectedConditionId={selectedConditionId} />
      </div>
    </div>
  );
}
