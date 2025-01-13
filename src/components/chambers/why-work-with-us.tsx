import { Card, CardContent, CardHeader } from "~/components/ui/card";

export function WhyWorkSection() {
  return (
    <section className="w-full bg-gray-50/50 py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-16 text-center text-4xl font-bold tracking-tight">
            Why work with Hyperbaric HQ
          </h2>
          <div className="grid gap-8 md:grid-cols-3 md:gap-12">
            {/* Best Value */}
            <Card className="group relative overflow-hidden border-none bg-white shadow-md transition-all hover:shadow-lg">
              <CardHeader className="space-y-2 pb-4">
                <h3 className="text-2xl font-bold">Best Value</h3>
              </CardHeader>
              <CardContent>
                <p className="leading-relaxed text-gray-600">
                  All HBOT HQ members get lifetime warranty on premium chambers,
                  access to leading hyperbaric oxygen specialists, 24/7 support,
                  protocol support and market leading technology.
                </p>
              </CardContent>
            </Card>

            {/* Certified & Authentic */}
            <Card className="group relative overflow-hidden border-none bg-white shadow-md transition-all hover:shadow-lg">
              <CardHeader className="space-y-2 pb-4">
                <h3 className="text-2xl font-bold">Certified & Authentic</h3>
              </CardHeader>
              <CardContent>
                <p className="leading-relaxed text-gray-600">
                  Chambers are certified authentic from manufacturers with the
                  following certifications. Our rigorous verification process
                  ensures the highest quality standards.
                </p>
              </CardContent>
            </Card>

            {/* Expertly curated */}
            <Card className="group relative overflow-hidden border-none bg-white shadow-md transition-all hover:shadow-lg">
              <CardHeader className="space-y-2 pb-4">
                <h3 className="text-2xl font-bold">Expertly curated</h3>
              </CardHeader>
              <CardContent>
                <p className="leading-relaxed text-gray-600">
                  Save 1,000s of hours on research with decades of peer reviewed
                  data expertly tailored to your needs. Our team ensures you get
                  the most relevant information.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
