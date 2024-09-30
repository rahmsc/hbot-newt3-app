"use client";

import ChamberMasonryGrid from "~/components/chambers/chamber-masonry-grid";
import Link from "next/link";

const Chambers = () => {
  return (
    <section className="flex w-full flex-col items-center justify-center pt-32">
      <div className="mx-auto w-full max-w-7xl p-4 text-center">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-4 font-editors-note text-3xl font-bold text-gray-900 sm:text-4xl">
            Considering HBOT For Your Home Or Clinic?
          </h2>
          <p className="mb-8 text-xl text-gray-600">
            Navigating hyperbaric oxygen therapy can be overwhelming. We make it
            easy. Access specialist knowledge, the latest research, and
            reputable HBOT solutions – all in one place.
          </p>
          <h4 className="mb-8 text-2xl font-semibold text-gray-800">
            Get Your Free Guide To HBOT Chambers Below
          </h4>
          <Link
            href="/contact"
            className="mb-5 inline-block rounded-full bg-orange-500 px-8 py-3 text-lg font-bold text-white transition duration-300 hover:bg-orange-600"
          >
            Contact Us
          </Link>
        </div>
        <div className="my-12 border-t border-gray-300" />
        <div className="container mx-auto px-4">
          <div className="mb-10 text-center">
            <h1 className="mt-2 text-4xl font-bold text-gray-900">
              Types of Chambers
            </h1>
          </div>

          <div className="flex justify-center">
            <ChamberMasonryGrid />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Chambers;
