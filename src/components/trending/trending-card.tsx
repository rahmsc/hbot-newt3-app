import Image from "next/image";
import Link from "next/link";

export interface TrendingArticleProps {
  category: {
    main: string;
    sub: string;
  };
  title: string;
  description: string;
  image: string;
  link: string;
}

export function TrendingCard({ article }: { article: TrendingArticleProps }) {
  return (
    <div className="overflow-hidden rounded-3xl bg-white">
      <div className="relative h-[200px] w-full">
        <Image
          src={article.image}
          alt={article.title}
          fill
          className="object-cover"
        />
      </div>
      <div className="space-y-3 p-5">
        <div className="flex items-center gap-2">
          {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
          >
            <path
              d="M19 5v14H5V5h14zm0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"
              fill="currentColor"
            />
            <path
              d="M14 17H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"
              fill="currentColor"
            />
          </svg>
          <span className="text-sm font-medium text-gray-600">
            {article.category.main}
          </span>
          <span className="text-sm font-medium text-gray-600">/</span>
          <span className="text-sm font-medium text-gray-600">
            {article.category.sub}
          </span>
        </div>
        <h3 className="text-2xl font-bold leading-tight">{article.title}</h3>
        <p className="text-base text-gray-600">{article.description}</p>
        <Link
          href={article.link}
          className="inline-flex items-center gap-2 font-semibold"
        >
          See More
          {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
          >
            <path
              d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8-8-8z"
              fill="currentColor"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
}
