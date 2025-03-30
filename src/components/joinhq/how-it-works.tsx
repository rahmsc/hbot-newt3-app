import Image from "next/image";

type WorkSection = {
  title: string;
  description: string;
  subDescription?: string;
  imagePath: string;
};

const sections: WorkSection[] = [
  {
    title: "Research Library",
    description:
      "Explore the research and save the studies that support your needs.",
    imagePath: "/research-screen.png",
  },
  {
    title: "Expert Support",
    description: "Speak to an expert.",
    subDescription:
      "Connect with hyperbaric specialists for personlised guidance on chamber selection, treatment protocols and implementation support.",
    imagePath: "/expert-screen.png",
  },
  {
    title: "Chamber Solutions",
    description: "Find the right chamber expertly curated for you",
    imagePath: "/chamber-screen.png",
  },
  {
    title: "Provider Network",
    description:
      "Find an approved clinic so you can start your treament while you wait.",
    imagePath: "/chamber-screen.png",
  },
];

export const HowItWorksSection = () => {
  const imgUrl = "https://hbothq-bucket.s3.ap-southeast-2.amazonaws.com/joinhq";

  return (
    <div className="py-6">
      {/* Top divider */}
      <div className="mb-8 flex flex-col items-center">
        <div className="h-36 w-0.5 bg-gray-300" />
        <div className="h-0.5 w-24 bg-gray-300" />
      </div>

      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center">
          <h2 className="mb-4 max-w-[600px] text-center text-xl font-medium italic underline">
            How It Works
          </h2>
          <h3 className="mb-6 max-w-[800px] text-center text-3xl font-bold">
            An all-in-one resource, for people who want evidence-based solutions
            for optimal health
          </h3>

          {/* Section divider */}
          <div className="mb-12 flex flex-col items-center">
            <div className="h-8 w-0.5 bg-gray-300" />
            <div className="h-0.5 w-24 bg-gray-300" />
          </div>

          {/* Work Sections */}
          <div className="space-y-12">
            {sections.map((section, index) => (
              <div key={section.title} className="flex flex-col items-center">
                <h3 className="mb-2 text-center text-2xl font-medium">
                  {section.description}
                </h3>

                {section.subDescription && (
                  <p className="mb-6 max-w-[600px] text-center text-lg italic tracking-wider text-gray-600">
                    {section.subDescription}
                  </p>
                )}

                <div className="relative my-3 h-72 w-full max-w-[800px] md:h-80">
                  <Image
                    src={`${imgUrl}${section.imagePath}`}
                    alt={section.title}
                    fill
                    className="rounded-lg object-contain"
                  />
                </div>

                {/* Section dividers */}
                {index < sections.length - 1 && (
                  <div className="mt-6 flex flex-col items-center">
                    <div className="h-24 w-0.5 bg-gray-300" />
                    {index === sections.length - 4 && (
                      <div className="h-0.5 w-24 bg-gray-300" />
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="mt-12 flex flex-col items-center">
            <div className="h-8 w-0.5 bg-gray-300" />
            <div className="h-0.5 w-48 bg-gray-300" />
          </div>
        </div>
      </div>
    </div>
  );
};
