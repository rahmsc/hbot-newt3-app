import Image from "next/image";

export const HeroSection = () => {
  const imgUrl = "https://hbothq-bucket.s3.ap-southeast-2.amazonaws.com/joinhq";
  return (
    <div className="relative h-[500px] w-full">
      <div className="absolute inset-0">
        <Image
          src={`${imgUrl}/joinhq-header.png`}
          alt="HBOT Therapy Ecosystem"
          fill
          className="object-cover"
          style={{ objectPosition: "center 75%" }}
        />
      </div>
      <div className="container relative mx-auto h-full">
        <div className="relative z-10 flex h-full flex-col justify-center px-6 sm:px-12">
          <div className="max-w-8xl space-y-8">
            <h1 className="text-4xl font-bold tracking-wider text-white md:text-6xl">
              THE WORLD&apos;S MOST ADVANCED
            </h1>
            <h1 className="text-4xl font-bold tracking-wider text-white md:text-6xl">
              HYPERBARIC OXYGEN THERAPY
            </h1>
            <h1 className="text-4xl font-bold tracking-wider text-white md:text-6xl">
              ECOSYSTEM.
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};
