import Image from "next/image"
import { Card } from "~/components/ui/card"

const partners = [
  {
    name: "Troscriptions TX",
    logo: "/images/chambers/member-benefits/troscription.png",
    alt: "Troscriptions TX by Smarter Not Harder Inc",
  },
  {
    name: "HPO Tech",
    logo: "/images/chambers/member-benefits/hpotech.png",
    alt: "HPO Tech logo",
  },
  {
    name: "OneBase",
    logo: "/images/chambers/member-benefits/onebase.png",
    alt: "OneBase logo",
  },
]

export function TrustedPartners() {
  return (
    <section className="w-full px-4 sm:px-0">
      <div className="mx-auto max-w-6xl space-y-8 sm:space-y-12">
        <div className="mx-auto flex flex-col items-center justify-center space-y-3 sm:space-y-4">
          <h2 className="text-center font-['Raleway'] text-2xl sm:text-3xl md:text-4xl font-medium tracking-[0.2em] sm:tracking-[0.3em] text-gray-900">
            MEMBER BENEFITS
          </h2>
          <p className="text-center text-base sm:text-lg md:text-xl font-light text-gray-600">
            Exclusive access to leading chambers, products and services
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {partners.map((partner) => (
            <Card
              key={partner.name}
              className="group flex items-center justify-center border-none bg-white p-6 sm:p-8 shadow-md transition-shadow hover:shadow-lg"
            >
              <div className="relative h-12 sm:h-16 w-full">
                <Image
                  src={partner.logo || "/placeholder.svg"}
                  alt={partner.alt}
                  fill
                  className="object-contain"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  priority
                />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

