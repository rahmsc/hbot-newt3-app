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
    <section className="w-full">
      <div className="mx-auto max-w-6xl space-y-12">
        <div className="mx-auto flex flex-col items-center justify-center space-y-4">
          <h2 className="font-['Raleway'] text-4xl font-medium tracking-[0.3em] text-gray-900">
            MEMBER BENEFITS
          </h2>
          <p className="text-xl font-light text-gray-600">
            Exclusive access to leading chambers, products and services
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {partners.map((partner) => (
            <Card
              key={partner.name}
              className="group flex items-center justify-center border-none bg-white p-8 shadow-md transition-shadow hover:shadow-lg"
            >
              <div className="relative h-16 w-full">
                <Image
                  src={partner.logo || "/placeholder.svg"}
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
    </section>
  );
}
