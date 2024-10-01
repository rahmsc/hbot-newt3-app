import Image from "next/image";

export default function ImageSection() {
  return (
    <div className="relative h-[50vh] min-h-[400px] w-full overflow-hidden">
      <Image
        src="https://d144dqt8e4woe2.cloudfront.net/contact/clouds.png"
        alt="Person experiencing HBOT therapy"
        quality={100}
        fill
        style={{ objectFit: "cover" }}
        priority
      />
      <div className="absolute inset-0 bg-black bg-opacity-30" />
      <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center text-white">
        <h2 className="mb-4 text-3xl font-bold leading-tight md:text-4xl lg:text-5xl">
          Enter The World Of HBOT...
          <br />
          And Renew From The Inside Out
        </h2>
        <h2 className="text-lg md:text-xl lg:text-2xl">
          Experience a new level of wellness — with Oxygen
        </h2>
      </div>
    </div>
  );
}
