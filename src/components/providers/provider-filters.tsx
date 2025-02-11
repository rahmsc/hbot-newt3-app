"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { Checkbox } from "~/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "~/components/ui/form";

const filterSchema = z.object({
  chambers: z.array(z.string()),
  pressure: z.array(z.string()),
});

export type FilterValues = z.infer<typeof filterSchema>;

const chamberTypes = [
  "Hard Shell Lay Down",
  "Soft Shell Lay Down",
  "Hard Shell Seated",
  "Soft Shell Seated",
];

const pressureCapacities = [
  "1.3 ATA",
  "1.4 ATA",
  "1.5 ATA",
  "1.6 ATA",
  "1.7 ATA",
  "2.0 ATA",
  "2.4 ATA",
  "3.0 ATA",
];

interface ProviderFiltersProps {
  onFilterChange: (filters: FilterValues) => void;
}

export function ProviderFilters({ onFilterChange }: ProviderFiltersProps) {
  const form = useForm<FilterValues>({
    resolver: zodResolver(filterSchema),
    defaultValues: {
      chambers: [],
      pressure: [],
    },
  });

  function onSubmit(data: FilterValues) {
    onFilterChange(data);
  }

  return (
    <Card className="h-fit bg-white">
      <CardContent className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="chamber-type">
                <AccordionTrigger className="font-['Raleway'] text-sm uppercase tracking-wider text-gray-900">
                  Type of Chamber
                </AccordionTrigger>
                <AccordionContent>
                  <FormField
                    control={form.control}
                    name="chambers"
                    render={() => (
                      <FormItem>
                        <div className="space-y-2">
                          {chamberTypes.map((chamber) => (
                            <FormField
                              key={chamber}
                              control={form.control}
                              name="chambers"
                              render={({ field }) => (
                                <FormItem className="flex items-center space-x-2">
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(chamber)}
                                      onCheckedChange={(checked) => {
                                        const current = field.value || [];
                                        const updated = checked
                                          ? [...current, chamber]
                                          : current.filter(
                                              (value) => value !== chamber,
                                            );
                                        field.onChange(updated);
                                        form.handleSubmit(onSubmit)();
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="text-sm font-normal text-gray-700">
                                    {chamber}
                                  </FormLabel>
                                </FormItem>
                              )}
                            />
                          ))}
                        </div>
                      </FormItem>
                    )}
                  />
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="pressure">
                <AccordionTrigger className="font-['Raleway'] text-sm uppercase tracking-wider text-gray-900">
                  Pressure Capacity (ATA)
                </AccordionTrigger>
                <AccordionContent>
                  <FormField
                    control={form.control}
                    name="pressure"
                    render={() => (
                      <FormItem>
                        <div className="space-y-2">
                          {pressureCapacities.map((pressure) => (
                            <FormField
                              key={pressure}
                              control={form.control}
                              name="pressure"
                              render={({ field }) => (
                                <FormItem className="flex items-center space-x-2">
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(pressure)}
                                      onCheckedChange={(checked) => {
                                        const current = field.value || [];
                                        const updated = checked
                                          ? [...current, pressure]
                                          : current.filter(
                                              (value) => value !== pressure,
                                            );
                                        field.onChange(updated);
                                        form.handleSubmit(onSubmit)();
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="text-sm font-normal text-gray-700">
                                    {pressure}
                                  </FormLabel>
                                </FormItem>
                              )}
                            />
                          ))}
                        </div>
                      </FormItem>
                    )}
                  />
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <Button
              type="submit"
              className="w-full bg-[#2B5741] hover:bg-[#1e3d2d]"
            >
              Apply Filters
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
