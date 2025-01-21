import Image from "next/image";
import ContactSection from "~/components/landing/contact-section";

import { Button } from "~/components/ui/button";

const JoinHQPage = () => {
  // const imageUrl = `https://picsum.photos/${Math.floor(Math.random() * 1000)}`;
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-[400px] w-full bg-black">
        <div className="absolute inset-0">
          <Image
            src={`https://picsum.photos/${Math.floor(Math.random() * 1000)}`}
            alt="HBOT Therapy Ecosystem"
            fill
            className="object-cover opacity-55"
          />
        </div>
        <div className="container relative mx-auto h-full">
          <div className="relative z-10 flex h-full flex-col justify-center px-6 sm:px-12">
            <div className="max-w-3xl">
              <h1 className="mb-2 text-4xl font-bold tracking-tight text-white sm:text-5xl">
                JOIN THE WORLD&apos;S MOST ADVANCED HYPERBARIC OXYGEN THERAPY
                ECOSYSTEM.
              </h1>
              <p className="text-lg text-white/90">
                Access the latest research. Find the best support. Get the best
                hyperbaric oxygen chambers, wellness products and services. All
                at your finger tips.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Save Everything Section */}
      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="mb-12">
          <h2 className="mb-4 text-4xl font-bold italic">
            Save everything you need in one place.
          </h2>
          <p className="text-gray-600">
            Save 1,000&apos;s of hours on research. Save the research that
            supports your needs. Get the best hyperbaric chambers. Have your
            questions answered, find Save 1,000&apos;s of hours on research.
            Save the research that supports your needs. Get the best hyperbaric
            chambers. Have your questions answered, find Save 1,000&apos;s of
            hours on research. Save the research that supports your needs. Get
            the best hyperbaric chambers. Have your questions answered, find
          </p>
        </div>

        {/* Resource Cards */}
        <div className="rounded-lg border border-gray-200 p-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="relative aspect-square overflow-hidden rounded-lg">
              <Image
                src={`https://picsum.photos/${Math.floor(Math.random() * 1000)}`}
                alt="Peer Reviewed Research"
                fill
                className="object-cover"
              />
              <div className="absolute bottom-0 w-full bg-black p-2 text-center text-sm text-white">
                Peer Reviewed Research
              </div>
            </div>

            <div className="relative aspect-square overflow-hidden rounded-lg">
              <Image
                src={`https://picsum.photos/${Math.floor(Math.random() * 1000)}`}
                alt="Guidance & Support"
                fill
                className="object-cover"
              />
              <div className="absolute bottom-0 w-full bg-black p-2 text-center text-sm text-white">
                Guidance & Support
              </div>
            </div>

            <div className="relative aspect-square overflow-hidden rounded-lg">
              <Image
                src={`https://picsum.photos/${Math.floor(Math.random() * 1000)}`}
                alt="Advanced Hyperbaric Systems"
                fill
                className="object-cover"
              />
              <div className="absolute bottom-0 w-full bg-black p-2 text-center text-sm text-white">
                Advanced Hyperbaric Systems
              </div>
            </div>

            <div className="relative aspect-square overflow-hidden rounded-lg">
              <Image
                src={`https://picsum.photos/${Math.floor(Math.random() * 1000)}`}
                alt="Supporting Supplements"
                fill
                className="object-cover"
              />
              <div className="absolute bottom-0 w-full bg-black p-2 text-center text-sm text-white">
                Supporting Supplements
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Proactive Research Section */}
      <div className="bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-12">
            <h2 className="mb-4 text-4xl font-bold italic">
              Proactive research that covers the whole you
            </h2>
            <p className="text-gray-600">
              Save the research that shows the science that supports your own
              journey and what you need and how to use it. Save the research
              that shows the science that supports your own journey and what you
              need and how to use it. Save the research that shows the science
              that supports your own journey.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {/* First Row */}
            {[1, 2, 3, 4].map((index) => (
              <div
                key={`row1-${index}`}
                className="relative aspect-square overflow-hidden rounded-lg"
              >
                <Image
                  src={`https://picsum.photos/${Math.floor(Math.random() * 1000)}`}
                  alt={`Research Item ${index}`}
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-0 w-full bg-black p-2 text-center text-sm text-white">
                  {index === 1 && "Peer Reviewed Research"}
                  {index === 2 && "Guidance & Support"}
                  {index === 3 && "Advanced Hyperbaric Systems"}
                  {index === 4 && "Supporting Supplements"}
                </div>
              </div>
            ))}

            {/* Second Row */}
            {[1, 2, 3, 4].map((index) => (
              <div
                key={`row2-${index}`}
                className="relative aspect-square overflow-hidden rounded-lg"
              >
                <Image
                  src={`https://picsum.photos/${Math.floor(Math.random() * 1000)}`}
                  alt={`Research Item ${index + 4}`}
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-0 w-full bg-black p-2 text-center text-sm text-white">
                  {index === 1 && "Peer Reviewed Research"}
                  {index === 2 && "Guidance & Support"}
                  {index === 3 && "Advanced Hyperbaric Systems"}
                  {index === 4 && "Supporting Supplements"}
                </div>
              </div>
            ))}

            {/* Third Row */}
            {[1, 2, 3, 4].map((index) => (
              <div
                key={`row3-${index}`}
                className="relative aspect-square overflow-hidden rounded-lg"
              >
                <Image
                  src={`https://picsum.photos/${Math.floor(Math.random() * 1000)}`}
                  alt={`Research Item ${index + 8}`}
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-0 w-full bg-black p-2 text-center text-sm text-white">
                  {index === 1 && "Peer Reviewed Research"}
                  {index === 2 && "Guidance & Support"}
                  {index === 3 && "Advanced Hyperbaric Systems"}
                  {index === 4 && "Supporting Supplements"}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* For People Who Want More Section */}
      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="mb-12">
          <h2 className="mb-4 text-2xl font-bold">For people who want more</h2>
          <div className="space-y-6">
            <p className="text-gray-600">
              Save 1,000&apos;s of hours on research. Save the research that
              supports your needs. Get the best hyperbaric chambers. have your
              questions answered, find Save 1,000&apos;s of hours on research.
              Save the research that supports your needs. Get the best
              hyperbaric chambers. have your questions answered, find Save
              1,000&apos;s of hours on research. Save the research that supports
              your needs. Get the best hyperbaric chambers. have your questions
              answered, find
            </p>
            <p className="text-gray-600">
              Save 1,000&apos;s of hours on research. Save the research that
              supports your needs. Get the best hyperbaric chambers. have your
              questions answered, find Save 1,000&apos;s of hours on research.
              Save the research that supports your needs. Get the best
              hyperbaric chambers. have your questions answered, find Save
              1,000&apos;s of hours on research. Save the research that supports
              your needs. Get the best hyperbaric chambers. have your questions
              answered, find
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-50 py-16 text-center">
        <Button
          size="lg"
          className="bg-[#F8E7DD] px-8 text-black hover:bg-[#F8E7DD]/90"
        >
          Join HQ
        </Button>
      </div>
      <ContactSection />
    </div>
  );
};

export default JoinHQPage;
