import Image from "next/image";

import { Card } from "~/components/ui/card";

const partners = [
  {
    name: "Troscriptions TX",
    logo: "/chamber-associate-logos/troscription.png",
    alt: "Troscriptions TX by Smarter Not Harder Inc",
  },
  {
    name: "HPO Tech",
    logo: "/chamber-associate-logos/hpotech.png",
    alt: "HPO Tech logo",
  },
  {
    name: "OneBase",
    logo: "/chamber-associate-logos/onebase.png",
    alt: "OneBase logo",
  },
  {
    name: "OXYREVO",
    logo: "/chamber-associate-logos/oxyrevo.png",
    alt: "OXYREVO Hyperbaric Chamber",
  },
  {
    name: "MACY-PAN",
    logo: "/chamber-associate-logos/macy-pain.png",
    alt: "MACY-PAIN hyperbaric O2 chamber",
  },
  {
    name: "Feel Good",
    logo: "/chamber-associate-logos/feelgood.png",
    alt: "Feel Good",
  },
];

export function TrustedPartners() {
  return (
    <section className="w-full bg-gray-50/50 py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          <div className="relative mb-16">
            <h2 className="text-4xl font-bold tracking-tight">
              Member&apos;s Only Benefits on Leading Chambers, Products and
              Services.
            </h2>
            {/* <span className="absolute -right-4 top-0 rounded-full bg-orange-100 px-4 py-1 text-sm text-orange-600">
              Our Curation Standard
            </span> */}
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {partners.map((partner) => (
              <Card
                key={partner.name}
                className="group flex items-center justify-center p-8 transition-shadow hover:shadow-md"
              >
                <div className="relative h-16 w-full">
                  <Image
                    src={partner.logo}
                    alt={partner.alt}
                    fill
                    className="object-contain"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
