import Image from "next/image";
import Link from "next/link";

import { Button } from "~/components/ui/button";
import { Card, CardContent, CardFooter } from "~/components/ui/card";

interface WellnessProductCardProps {
  image: string;
  publisher: string;
  title: string;
  description: string;
  productUrl: string;
}

export function WellnessProductCard({
  image,
  publisher,
  title,
  description,
  productUrl,
}: WellnessProductCardProps) {
  return (
    <Card className="h-full">
      <CardContent className="p-6">
        <div className="aspect-square overflow-hidden rounded-lg">
          <Image
            src={image}
            alt={title}
            width={400}
            height={400}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="mt-6 space-y-2">
          <p className="text-sm text-muted-foreground">{publisher}</p>
          <h3 className="text-2xl font-bold">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-stretch gap-3 p-6 pt-0">
        <Button
          variant="secondary"
          className="w-full bg-gray-100 hover:bg-gray-200"
        >
          Get Now
        </Button>
        <Link
          href={productUrl}
          className="text-center text-sm italic text-muted-foreground underline-offset-4 hover:underline"
        >
          view product
        </Link>
      </CardFooter>
    </Card>
  );
}
