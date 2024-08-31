import Image from "next/image";
import backgroundImage from "../../../public/womanBreathing.jpg";

const ImageSection = () => {
  return (
    <section className="relative h-[600px] w-full">
      <div className="absolute inset-0">
        <Image src={backgroundImage} alt="Background Image" className="z-0" />
      </div>
      <div className="relative z-10 flex h-full w-full items-center justify-center bg-black bg-opacity-50 text-white">
        <div className="px-4 py-8 text-center">
          <p className="text-4xl">
            Experience a new level of wellness - with <br />
            Oxygen
          </p>
        </div>
      </div>
    </section>
  );
};

export default ImageSection;
