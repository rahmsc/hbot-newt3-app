"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Checkbox } from "~/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "~/components/ui/form";
import { Slider } from "~/components/ui/slider";

const filterSchema = z.object({
  distance: z.number().min(0).max(100),
  services: z.array(z.string()),
  specialties: z.array(z.string()),
});

type FilterValues = z.infer<typeof filterSchema>;

export function ProviderFilters() {
  const form = useForm<FilterValues>({
    resolver: zodResolver(filterSchema),
    defaultValues: {
      distance: 25,
      services: [],
      specialties: [],
    },
  });

  function onSubmit(data: FilterValues) {
    console.log(data);
    // TODO: Implement filter logic
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Filters</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="distance"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Distance (km)</FormLabel>
                  <FormControl>
                    <Slider
                      min={0}
                      max={100}
                      step={5}
                      value={[field.value]}
                      onValueChange={([value]) => field.onChange(value)}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="services"
              render={() => (
                <FormItem>
                  <FormLabel>Services</FormLabel>
                  <div className="space-y-2">
                    {["Hyperbaric Oxygen", "IV Therapy", "Cryotherapy"].map(
                      (service) => (
                        <FormField
                          key={service}
                          control={form.control}
                          name="services"
                          render={({ field }) => (
                            <FormItem className="flex items-center space-x-2">
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(service)}
                                  onCheckedChange={(checked) => {
                                    const current = field.value || [];
                                    const updated = checked
                                      ? [...current, service]
                                      : current.filter(
                                          (value) => value !== service,
                                        );
                                    field.onChange(updated);
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="text-sm font-normal">
                                {service}
                              </FormLabel>
                            </FormItem>
                          )}
                        />
                      ),
                    )}
                  </div>
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              Apply Filters
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
