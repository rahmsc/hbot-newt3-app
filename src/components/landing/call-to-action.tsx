import Image from "next/image";
import Link from "next/link";

import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

export default function CallToAction() {
  const imageUrl =
    "https://d144dqt8e4woe2.cloudfront.net/chambers/gallery/6.png";
  return (
    <section className="relative mb-0 h-[600px] overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={imageUrl || "/placeholder.svg"}
          alt="Two people in a hyperbaric chamber"
          fill
          className="h-full w-full object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />
      <div className="relative z-10 flex h-full items-center justify-end px-8">
        <Card className="w-full max-w-md bg-white/90 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="font-['Raleway'] text-sm font-medium uppercase tracking-[0.2em] text-gray-900">
              Client Service and Relations
            </CardTitle>
            <CardDescription className="mt-2 text-3xl font-bold text-gray-900">
              Discover Game-Changing Hyperbaric Solutions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-6 text-lg text-gray-600">
              Book a consultation with our experts to explore how our
              cutting-edge technology can help with treating a wide range of
              medical conditions, including time-tested hyperbaric oxygen
              therapy solutions.
            </p>
            <div className="flex space-x-4">
              <Button
                asChild
                className="rounded-full bg-gray-900 px-6 py-3 text-base font-medium text-white transition-colors hover:bg-gray-800"
              >
                <a
                  href="https://calendly.com/your-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Book a Talk
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="rounded-full border-gray-900 px-6 py-3 text-base font-medium text-gray-900 transition-colors hover:bg-gray-100"
              >
                <Link href="/contact">Request a Quote</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
