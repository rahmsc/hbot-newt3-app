"use client";

import { Filter } from "lucide-react";
import { useState } from "react";

import { ProviderFilters } from "~/components/providers/provider-filters";
import { Button } from "~/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet";

export function FilterButton() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="w-[100px] lg:hidden">
          <Filter className="mr-2 h-4 w-4" />
          Filter
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Filters</SheetTitle>
          <SheetDescription>Adjust your search criteria here.</SheetDescription>
        </SheetHeader>
        <div className="mt-4 flex flex-col space-y-4">
          <ProviderFilters />
        </div>
      </SheetContent>
    </Sheet>
  );
}
