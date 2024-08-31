import ChamberMasonryGrid from "~/components/chambers/chamber-masonry-grid";
import Footer from "../../components/sections/footer";
import Link from "next/link";
import { ArrowRightIcon } from "@radix-ui/react-icons";

export const metadata = {
  title: "Chambers || Moonex Portfolio and Agency NextJS Template",
};

const Chambers = () => {
  return (
    <section className="flex w-full flex-col items-center justify-center pt-32">
      <div className="container mx-auto px-4">
        <div className="mb-10 text-center">
          <h1 className="mt-2 text-4xl font-bold text-gray-900">Chambers</h1>
        </div>

        <div className="flex justify-center">
          <ChamberMasonryGrid />
        </div>

        <div className="mb-10 flex justify-center">
          <Link href="/explore" passHref>
            <div className="flex h-48 w-48 cursor-pointer flex-col items-center justify-center rounded-full border-2 border-gray-300 border-opacity-75 text-black transition-colors duration-300 hover:border-orange-500 hover:text-orange-500">
              <span className="text-md">Explore</span>
              <ArrowRightIcon className="ml-2 text-2xl" />
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Chambers;
