"use client";

import { Button } from "~/components/ui/button";

import {
  type TrendingArticleProps,
  TrendingCard,
} from "../trending/trending-card";

const articles: TrendingArticleProps[] = [
  {
    category: {
      main: "Blogs",
      sub: "Technology",
    },
    title: "The Latest Chamber Technology",
    description:
      "Chambers making headway into 2025 with the latest technology leading the market",
    image: "https://picsum.photos/id/210/200/300",
    link: "/blog/latest-chamber-technology",
  },
  {
    category: {
      main: "Blogs",
      sub: "Case Studies",
    },
    title: "Wellness Centres are LOVING HBOT",
    description:
      "Chambers making headway into 2025 with the latest technology leading the market",
    image: "https://picsum.photos/id/130/200/300",
    link: "/blog/wellness-centres-loving-hbot",
  },
  {
    category: {
      main: "Blogs",
      sub: "Set Ups",
    },
    title: "Home Hyperbaric Set Ups",
    description:
      "Chambers making headway into 2025 with the latest technology leading the market",
    image: "https://picsum.photos/id/98/200/300",
    link: "/blog/home-hyperbaric-setups",
  },
  // Duplicate articles for the second row with slightly different descriptions
  {
    category: {
      main: "Blogs",
      sub: "Technology",
    },
    title: "The Latest Chamber Technology",
    description:
      "Chambers making headway into 2025 with the latest technology leading the market",
    image: "https://picsum.photos/id/120/200/300",
    link: "/blog/latest-chamber-technology-2",
  },
  {
    category: {
      main: "Blogs",
      sub: "Case Studies",
    },
    title: "Wellness Centres are LOVING HBOT",
    description:
      "Wellness centres opening an hbot are loving their new set ups almost as much as their clients...",
    image: "https://picsum.photos/id/29/200/300",
    link: "/blog/wellness-centres-loving-hbot-2",
  },
  {
    category: {
      main: "Blogs",
      sub: "Set Ups",
    },
    title: "Home Hyperbaric Set Ups",
    description:
      "The sleekest home hyperbaric setups we've seen from the north to the south! Its all here",
    image: "https://picsum.photos/id/32/200/300",
    link: "/blog/home-hyperbaric-setups-2",
  },
];

export default function TrendingSection() {
  return (
    <section className="w-full px-4 py-12 md:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-center justify-between">
          <div className="rounded-full bg-black px-6 py-2 text-white">
            <h2 className="text-lg font-semibold">Trending</h2>
          </div>
          <Button
            variant="outline"
            className="rounded-full bg-black text-white hover:bg-black/90"
          >
            Filter
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <TrendingCard key={article.title} article={article} />
          ))}
        </div>
      </div>
    </section>
  );
}
