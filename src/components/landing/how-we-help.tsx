"use client";

import Image from "next/image";

import VideoPlayer from "./video-player";

const videoData = [
  { id: 1, src: "vid1" },
  { id: 2, src: "vid2" },
  { id: 3, src: "vid3" },
  { id: 4, src: "vid4" },
];

export default function HowWeHelpSection() {
  const imgSrc = "https://d144dqt8e4woe2.cloudfront.net/landing/img1.jpeg";
  return (
    <section className="bg-white py-20">
      <div className="container mx-auto max-w-4xl px-4">
        <h2 className="mb-10 text-center text-4xl font-bold text-gray-800">
          How We Help
        </h2>

        <div className="space-y-8 text-center">
          <p className="text-lg leading-relaxed text-gray-700">
            With the rapid results in people using hyperbaric oxygen therapy, we
            now want to help more wellness providers serve their community to
            live better, more fulfilling, and longer lives.
          </p>

          <p className="text-lg leading-relaxed text-gray-700">
            We want to bring hyperbaric oxygen therapy to more people that want
            a more fulfilling, vital, and desirable life and want access to
            treatments that help them achieve that.
          </p>
        </div>

        <h3 className="mb-12 mt-16 text-center text-3xl font-semibold text-gray-800">
          Here Are Some People That Benefited From This Therapy
        </h3>

        <div className="mb-16 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {videoData.map((video) => (
            <div
              key={video.id}
              className="relative aspect-video overflow-hidden rounded-lg bg-blue-200 shadow-md"
            >
              <VideoPlayer publicId={`${video.src}`} />
            </div>
          ))}
        </div>

        <h3 className="mb-8 text-center text-3xl font-semibold text-gray-800">
          Benefits of Hyperbaric Oxygen Therapy
        </h3>

        <p className="mb-12 text-center text-lg leading-relaxed text-gray-700">
          A typical session is 60 to 120 minutes where users lay or sit and
          breathe naturally through a mask. As pressure builds, oxygen is
          dissolved into the bloodstream, bringing systemic benefits.
        </p>

        <div className="flex justify-center">
          <Image
            src={imgSrc}
            alt="Benefits of Hyperbaric Oxygen Therapy"
            width={800}
            height={600}
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>
    </section>
  );
}
