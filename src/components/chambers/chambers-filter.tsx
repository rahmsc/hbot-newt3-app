"use client";

import * as React from "react";
import { Check, ChevronsUpDown, X } from "lucide-react";

import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "~/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { Badge } from "~/components/ui/badge";

// Organize filters hierarchically for easier selection
const filterOptions = [
  {
    id: "type",
    name: "Chamber Type",
    options: [
      { value: "sit up", label: "Sit Up" },
      { value: "lay down", label: "Lay Down" },
    ],
  },
  {
    id: "shell",
    name: "Shell Type",
    options: [
      { value: "hard shell", label: "Hard Shell" },
      { value: "soft shell", label: "Soft Shell" },
    ],
  },
  {
    id: "capacity",
    name: "Capacity",
    options: [
      { value: "1", label: "1 Person" },
      { value: "2", label: "2 People" },
      { value: "4", label: "4 People" },
    ],
  },
];

export function ChambersFilter({
  onFilterChange,
}: {
  onFilterChange: (filters: Record<string, string>) => void;
}) {
  const [open, setOpen] = React.useState(false);
  const [selectedFilters, setSelectedFilters] = React.useState<
    Record<string, string>
  >({
    type: "all",
    shell: "all",
    capacity: "all",
  });

  // Count active filters (excluding "all" values)
  const activeFilterCount = Object.values(selectedFilters).filter(
    (value) => value !== "all",
  ).length;

  const handleFilterSelect = (category: string, value: string) => {
    const newFilters = {
      ...selectedFilters,
      [category]: selectedFilters[category] === value ? "all" : value,
    };
    setSelectedFilters(newFilters);
    onFilterChange(newFilters);
  };

  const resetFilters = () => {
    const resetValues = {
      type: "all",
      shell: "all",
      capacity: "all",
    };
    setSelectedFilters(resetValues);
    onFilterChange(resetValues);
  };

  // Display text for the button based on selected filters
  const getButtonDisplayText = () => {
    const activeFilters = Object.entries(selectedFilters)
      .filter(([_, value]) => value !== "all")
      .map(([category, value]) => {
        const categoryData = filterOptions.find((c) => c.id === category);
        const option = categoryData?.options.find((o) => o.value === value);
        return option?.label || value;
      });

    if (activeFilters.length === 0) {
      return "Filter Chambers";
    }

    if (activeFilters.length === 1) {
      return activeFilters[0];
    }

    return `${activeFilters[0]} +${activeFilters.length - 1}`;
  };

  return (
    <div className="flex items-center gap-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="relative w-full justify-between sm:w-[220px]"
          >
            <span className="truncate">{getButtonDisplayText()}</span>
            {activeFilterCount > 0 && (
              <Badge
                variant="secondary"
                className="ml-1 mr-1 rounded-full px-1 font-normal"
              >
                {activeFilterCount}
              </Badge>
            )}
            <ChevronsUpDown className="ml-1 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[calc(100%-2rem)] p-0 sm:w-[300px]">
          <Command>
            <CommandInput placeholder="Search filters..." />
            <CommandList>
              <CommandEmpty>No filter found.</CommandEmpty>
              {filterOptions.map((category, index) => (
                <React.Fragment key={category.id}>
                  {index > 0 && <CommandSeparator />}
                  <CommandGroup heading={category.name}>
                    {category.options.map((option) => (
                      <CommandItem
                        key={`${category.id}-${option.value}`}
                        value={`${category.name} ${option.label}`}
                        onSelect={() =>
                          handleFilterSelect(category.id, option.value)
                        }
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            selectedFilters[category.id] === option.value
                              ? "opacity-100"
                              : "opacity-0",
                          )}
                        />
                        {option.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </React.Fragment>
              ))}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {activeFilterCount > 0 && (
        <Button
          variant="ghost"
          size="icon"
          onClick={resetFilters}
          className="h-8 w-8 rounded-full"
          aria-label="Reset filters"
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
