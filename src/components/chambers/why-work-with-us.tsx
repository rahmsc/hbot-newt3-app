import { Card, CardContent, CardHeader } from "~/components/ui/card"

export function WhyWorkSection() {
  return (
    <section className="w-full px-4 py-8 sm:px-6 md:px-8 lg:py-12">
      <div className="mx-auto max-w-6xl space-y-6 sm:space-y-8 lg:space-y-12">
        <div className="space-y-3 sm:space-y-4 text-center">
          <h2 className="font-['Raleway'] text-2xl sm:text-3xl md:text-4xl font-medium tracking-[0.2em] sm:tracking-[0.3em] text-gray-900">
            WHY WORK WITH HYPERBARIC HQ
          </h2>
          <p className="text-base sm:text-lg md:text-xl font-light text-gray-600">
            Experience excellence in hyperbaric solutions
          </p>
        </div>

        <div className="grid gap-4 sm:gap-6 md:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {/* Best Value */}
          <Card className="group relative overflow-hidden border-none bg-white shadow-md transition-all hover:shadow-lg">
            <CardHeader className="space-y-3 sm:space-y-4 pb-2 sm:pb-4 text-center">
              <h3 className="font-['Raleway'] text-xl sm:text-2xl font-medium tracking-wide text-gray-900">
                Best Value
              </h3>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-base sm:text-lg leading-relaxed text-gray-600">
                All HBOT HQ members get lifetime warranty on premium chambers, access to leading hyperbaric oxygen
                specialists, 24/7 support, protocol support and market leading technology.
              </p>
            </CardContent>
          </Card>

          {/* Certified & Authentic */}
          <Card className="group relative overflow-hidden border-none bg-white shadow-md transition-all hover:shadow-lg">
            <CardHeader className="space-y-3 sm:space-y-4 pb-2 sm:pb-4 text-center">
              <h3 className="font-['Raleway'] text-xl sm:text-2xl font-medium tracking-wide text-gray-900">
                Certified & Authentic
              </h3>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-base sm:text-lg leading-relaxed text-gray-600">
                Chambers are certified authentic from manufacturers with the following certifications. Our rigorous
                verification process ensures the highest quality standards.
              </p>
            </CardContent>
          </Card>

          {/* Expertly curated */}
          <Card className="group relative overflow-hidden border-none bg-white shadow-md transition-all hover:shadow-lg">
            <CardHeader className="space-y-3 sm:space-y-4 pb-2 sm:pb-4 text-center">
              <h3 className="font-['Raleway'] text-xl sm:text-2xl font-medium tracking-wide text-gray-900">
                Expertly Curated
              </h3>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-base sm:text-lg leading-relaxed text-gray-600">
                Save 1,000s of hours on research with decades of peer reviewed data expertly tailored to your needs. Our
                team ensures you get the most relevant information.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

