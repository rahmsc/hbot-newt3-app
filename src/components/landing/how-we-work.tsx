import { Cog, HeartHandshake,Lightbulb, Truck, Users } from "lucide-react";

export default function HowWeWorkSection() {
  return (
    <section className="bg-gradient-to-b from-white to-gray-100 py-20">
      <div className="container mx-auto max-w-4xl px-4">
        <h2 className="mb-12 text-center text-4xl font-bold text-gray-800">
          How HBOT HQ Works
        </h2>

        <div className="mb-16 space-y-6 text-center">
          <p className="text-lg text-gray-700">
            We partner with commercial wellness providers and private clientele
            to discover, source, and integrate the most appropriate hyperbaric
            oxygen solution for their needs.
          </p>

          <p className="text-lg text-gray-700">
            We provide end-to-end support from consultation to commerce,
            warranty, training, ongoing support, delivery, installation, and
            maintenance.
          </p>

          <p className="text-lg text-gray-700">
            This includes sourcing chambers from leading brands, accessing our
            network of HBOT specialists for training, negotiating the latest
            research, and leveraging real case studies to ensure you&apos;re
            getting the most appropriate solution for your needs.
          </p>
        </div>
        <h3 className="mb-10 text-center text-3xl font-bold text-gray-800">
          What It&apos;s Like Working with HBOT HQ
        </h3>

        <ol className="space-y-8">
          {[
            {
              title: "Initial Consultation",
              icon: <Lightbulb className="h-8 w-8 text-blue-500" />,
              content: (
                <>
                  <p>
                    Before integrating our revolutionary treatment, we hold a
                    free 30-minute initial consult to see if it&apos;s the right
                    fit.
                  </p>
                  <p className="mt-2">
                    This consultation includes discussing your intentions,
                    analyzing your location (spatial, ventilation, and power
                    requirements), and reviewing any existing alternative
                    treatment offerings.
                  </p>
                </>
              ),
            },
            {
              title: "Strategy Workshop",
              icon: <Users className="h-8 w-8 text-green-500" />,
              content:
                "If it's a good fit, we host a workshop to identify the most appropriate chamber options based on the initial consultation and create an implementation strategy.",
            },
            {
              title: "Sourcing and Delivery",
              icon: <Truck className="h-8 w-8 text-yellow-500" />,
              content:
                "We source the chamber at the best possible price and organize delivery right to your door.",
            },
            {
              title: "Setup and Training (Optional)",
              icon: <Cog className="h-8 w-8 text-purple-500" />,
              content:
                "We come to you and set up your chamber, train your team on proper usage, maintenance, client safety, and effectively onboard the right people to start benefiting from HBOT.",
            },
            {
              title: "Ongoing Support",
              icon: <HeartHandshake className="h-8 w-8 text-red-500" />,
              content:
                "We provide access to leading hyperbaric specialist doctors, optional servicing, and ongoing support through access to the latest research and case studies to help you grow your platform and community for years to come.",
            },
          ].map((step, index) => (
            <li
              // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
              key={index}
              className="rounded-lg bg-white p-6 shadow-md transition-all hover:shadow-lg"
            >
              <div className="flex items-center space-x-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                  {step.icon}
                </div>
                <h4 className="text-xl font-semibold text-gray-800">
                  Step {index + 1}: {step.title}
                </h4>
              </div>
              <div className="mt-4 text-gray-600">{step.content}</div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
