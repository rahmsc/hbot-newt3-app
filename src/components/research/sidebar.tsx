"use client";

import { ChevronDown } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import { Button } from "~/components/ui/button";

// Make sure to export the interface if you need it elsewhere
export interface SidebarProps {
  categories: {
    categoryId: number;
    categoryName: string;
    conditions: {
      id: number;
      name: string;
      articleCount?: number;
    }[];
  }[];
  isSidebarOpen: boolean;
  selectedConditionId: number | null;
  openCategory: string | undefined;
  onCategoryChange: (value: string | undefined) => void;
  onConditionSelect: (id: number) => void;
  onSidebarToggle: () => void;
}

// Make sure to export the component
export function Sidebar({
  categories,
  isSidebarOpen,
  selectedConditionId,
  openCategory,
  onCategoryChange,
  onConditionSelect,
}: SidebarProps) {
  return (
    <div
      className={`h-[calc(100vh-127px)] overflow-hidden transition-all duration-300 ${
        isSidebarOpen ? "w-[400px]" : "w-0"
      }`}
    >
      <div className="flex h-full w-[400px] flex-col bg-white shadow-xl">
        <div className="sticky top-0 z-20 bg-white px-4 py-3 shadow-sm">
          <h2 className="text-lg font-semibold">Categories</h2>
        </div>

        <div className="custom-scrollbar flex-1 overflow-y-auto px-4 py-4">
          <Accordion
            type="single"
            collapsible
            value={openCategory}
            onValueChange={onCategoryChange}
            className="w-full divide-y divide-black"
          >
            {categories.map((category) => (
              <AccordionItem
                key={category.categoryId}
                value={category.categoryId.toString()}
                className="first:rounded-t-md last:rounded-b-md [&:not(:first-child)]:-mt-[2px]"
              >
                <AccordionTrigger className="px-4 hover:no-underline">
                  <div className="flex w-full items-center justify-between py-2">
                    <span className="text-base font-medium text-gray-900">
                      {category.categoryName}
                    </span>
                    <div className="flex items-center gap-2">
                      {/* <ChevronDown className="h-4 w-4 text-gray-500" /> */}
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col divide-y divide-gray-200">
                    {category.conditions.map((condition, index, array) => (
                      <div key={condition.id}>
                        <Button
                          variant="ghost"
                          className={`w-full justify-start rounded-none px-4 py-3 text-left text-sm hover:bg-gray-50 ${
                            condition.id === selectedConditionId
                              ? "bg-gray-100 font-medium text-gray-900"
                              : "text-gray-600"
                          }`}
                          onClick={() => onConditionSelect(condition.id)}
                        >
                          <div className="flex w-full items-center justify-between">
                            <span>{condition.name}</span>
                            {condition.articleCount !== undefined && (
                              <span className="ml-2 rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">
                                {condition.articleCount}
                              </span>
                            )}
                          </div>
                        </Button>
                        {index < array.length - 1 && (
                          <div className="mx-4 border-t border-gray-200" />
                        )}
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
}
