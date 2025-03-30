import { VideoPlayer } from "../utils/video-player";

const journeyVideos = [
  { id: 1, title: "Success Journey Part 1" },
  { id: 2, title: "Success Journey Part 2" },
  { id: 3, title: "Success Journey Part 3" },
  { id: 4, title: "Success Journey Part 4" },
] as const;

export const JourneyVideos = () => {
  const videoUrl =
    "https://hbothq-bucket.s3.ap-southeast-2.amazonaws.com/joinhq/videos/";
  return (
    <section className="container mx-auto px-6 py-16">
      <h2 className="mb-12 text-center text-3xl font-bold">
        Beyond Traditional Healthcare
      </h2>
      <p className="mx-auto mb-16 max-w-[600px] text-center text-xl leading-relaxed text-gray-700">
        No matter what stage you&apos;re at in your healthcare journey, whether
        seeking advanced medical solutions, practical tips, research findings,
        and expertise in hyperbaric and cellular health, we&apos;ve created a
        platform for exceptional knowledge together with revolutionary devices.
      </p>

      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 md:grid-cols-4">
        {journeyVideos.map((video) => (
          <div key={video.id} className="relative aspect-[9/16] w-full">
            <VideoPlayer
              src={`${videoUrl}${video.id}.mp4`}
              poster={`${videoUrl}${video.id}.mp4`}
              alt={video.title}
              controls
              className="h-full w-full rounded-lg object-cover"
            />
          </div>
        ))}
      </div>
    </section>
  );
};
