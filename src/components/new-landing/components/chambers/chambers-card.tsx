"use client";

import Link from "next/link";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "~/components/ui/card";
import Image from "next/image";
import type { chambersDataProp } from "~/data/rebrandData";
import { useState } from "react";
import { ChambersContactForm } from "./chambers-contact-form";

interface ChamberCardProps extends chambersDataProp {
  onQuickView: () => void;
}

export function ChamberCard({
  id,
  name,
  type,
  pressure,
  persons,
  brand,
  image,
  description,
  onQuickView,
}: ChamberCardProps) {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);
  const slug = name.toLowerCase().replace(/\s+/g, "-");

  return (
    <>
      <Link href={`/chambers/${slug}`} className="block">
        <Card className="relative overflow-hidden transition-transform hover:scale-[1.02]">
          <Badge
            className="absolute right-4 top-4 z-10 bg-orange-400 text-white hover:bg-orange-500"
            variant="secondary"
          >
            {pressure}
          </Badge>
          <CardHeader className="p-0">
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image src={image} alt={name} fill className="object-cover" />
            </div>
          </CardHeader>
          <CardContent className="space-y-2 p-4">
            <p className="text-sm text-muted-foreground">{type}</p>
            <h3 className="text-xl font-semibold">{name}</h3>
            <p className="text-sm text-muted-foreground">
              Max Pressure: {pressure}
            </p>
            <Badge variant="secondary" className="bg-gray-200">
              {persons} Person
            </Badge>
          </CardContent>
          <CardFooter className="grid grid-cols-2 gap-2 p-4 pt-0">
            <Button
              variant="outline"
              className="w-full"
              onClick={(e) => {
                e.preventDefault();
                onQuickView();
              }}
            >
              Quick View
            </Button>
            <Button
              variant="default"
              className="w-full bg-black text-white hover:bg-gray-800"
              onClick={(e) => {
                e.preventDefault();
                setIsContactFormOpen(true);
              }}
            >
              Speak To An Expert
            </Button>
          </CardFooter>
        </Card>
      </Link>

      <ChambersContactForm
        isOpen={isContactFormOpen}
        onClose={() => setIsContactFormOpen(false)}
        chamber={{
          id,
          name,
          type,
          pressure,
          persons,
          brand,
          image,
          description,
        }}
      />
    </>
  );
}
