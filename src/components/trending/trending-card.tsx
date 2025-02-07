import Image from "next/image";
import Link from "next/link";
import { Badge } from "~/components/ui/badge";

export interface TrendingArticleProps {
  category: {
    main: string;
    sub: string;
  };
  title: string;
  description: string;
  image: string;
  link: string;
  date: string;
  type: "blog" | "guide";
}

interface TrendingCardProps {
  article: TrendingArticleProps;
  size: "small" | "medium" | "large";
}

export function TrendingCard({ article, size }: TrendingCardProps) {
  return (
    <Link href={article.link} className="group block h-full">
      <article className="relative h-full w-full overflow-hidden rounded-[2rem] bg-white">
        <Image
          src={article.image || "/placeholder.svg"}
          alt={article.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />

        <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
          <Badge
            className="mb-4 w-fit bg-orange-500 font-mono text-xs uppercase tracking-wider text-white hover:bg-orange-600"
            variant="secondary"
          >
            {article.type === "blog" ? "Blog" : "Guide"}
          </Badge>

          <h3
            className={`mb-2 font-['Raleway'] font-normal leading-tight ${size === "large" ? "text-3xl" : size === "medium" ? "text-2xl" : "text-xl"}`}
          >
            {article.title}
          </h3>

          {(size === "large" || size === "medium") && (
            <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-gray-300">
              {article.description}
            </p>
          )}

          <div className="font-['Space_Mono'] text-xs uppercase tracking-wider text-gray-400">
            {new Date(article.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            })}
          </div>
        </div>
      </article>
    </Link>
  );
}
