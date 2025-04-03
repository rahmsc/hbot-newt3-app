import Image from "next/image";
import Link from "next/link";
import { Badge } from "~/components/ui/badge";
import { useState } from "react";
import type { BlogDbEntry, RichContent } from "~/types/blog";
import RichText from "../utils/rich-text";
import { Bookmark } from "lucide-react";
import { Button } from "~/components/ui/button";
import { useTrendingBookmark } from "~/hooks/use-trending-bookmark";
import { useAuth } from "~/contexts/auth-context";

interface TrendingCardProps {
  article: BlogDbEntry;
  size?: "small" | "medium" | "large" | "featured-side";
}

// Helper function to extract text from rich content
const richContentToMarkdown = (content: RichContent | null): string => {
  if (!content?.content || !Array.isArray(content.content)) {
    return "";
  }

  let markdown = "";

  for (const node of content.content) {
    if (!node) continue;

    // Handle text nodes
    if ("text" in node && node.text) {
      if ("marks" in node && node.marks && Array.isArray(node.marks)) {
        let formattedText = node.text;

        for (const mark of node.marks) {
          if (mark.type === "bold") {
            formattedText = `**${formattedText}**`;
          } else if (mark.type === "italic") {
            formattedText = `*${formattedText}*`;
          } else if (mark.type === "underline") {
            formattedText = `<u>${formattedText}</u>`;
          }
        }

        markdown += formattedText;
      } else {
        markdown += node.text;
      }
    }

    // Handle block nodes
    else if ("type" in node) {
      if (node.type === "paragraph") {
        const innerContent = node.content
          ? richContentToMarkdown({ content: node.content } as RichContent)
          : "";
        markdown += `${innerContent}\n\n`;
      } else if (node.type?.startsWith("heading")) {
        const level = node.type.charAt(node.type.length - 1);
        const headingMarks = "#".repeat(Number.parseInt(level) || 1);
        const innerContent = node.content
          ? richContentToMarkdown({ content: node.content } as RichContent)
          : "";
        markdown += `${headingMarks} ${innerContent}\n\n`;
      } else if (node.type === "bulletList") {
        const listItems = node.content ?? [];
        for (const item of listItems) {
          if (item.type === "listItem" && item.content) {
            const itemContent = richContentToMarkdown({
              content: item.content,
            } as RichContent);
            markdown += `* ${itemContent}\n`;
          }
        }
        markdown += "\n";
      } else if (node.type === "orderedList") {
        const listItems = node.content ?? [];
        let i = 1;
        for (const item of listItems) {
          if (item.type === "listItem" && item.content) {
            const itemContent = richContentToMarkdown({
              content: item.content,
            } as RichContent);
            markdown += `${i}. ${itemContent}\n`;
            i++;
          }
        }
        markdown += "\n";
      }
    }
  }

  return markdown;
};

export function TrendingCard({ article, size = "medium" }: TrendingCardProps) {
  const [imgError, setImgError] = useState(false);
  const category = article.category.toLowerCase();
  const summaryText = article.summary
    ? richContentToMarkdown(article.summary as unknown as RichContent)
    : "";

  // Get user and bookmark functionality
  const { user } = useAuth();
  const { isBookmarked, isLoading, toggleBookmark } = useTrendingBookmark(
    article.blog_id,
    user?.id,
  );

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Stop the event from reaching the Link
    void toggleBookmark();
  };

  return (
    <div className="relative h-full w-full">
      {user && (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className={`absolute right-6 top-6 z-20 overflow-hidden rounded-full bg-black/30 p-2 text-white backdrop-blur-sm transition-all hover:scale-110 hover:bg-black/40 sm:right-8 sm:top-8 sm:p-3 ${
            isBookmarked
              ? "bg-[#2B5741] ring-2 ring-[#2B5741] hover:bg-[#2B5741]/90"
              : ""
          }`}
          onClick={handleBookmarkClick}
          disabled={isLoading}
        >
          <Bookmark
            className={`h-6 w-6 transition-colors sm:h-8 sm:w-8 ${
              isBookmarked ? "fill-white stroke-white" : "stroke-white"
            }`}
            strokeWidth={2.5}
          />
        </Button>
      )}
      <Link
        href={`/${category}/${article.url_slug}`}
        className="group block h-full"
      >
        <article className="relative h-full w-full overflow-hidden rounded-[2rem] bg-white">
          <Image
            src={
              imgError
                ? "/placeholder.png"
                : `https://hbothq-bucket.s3.ap-southeast-2.amazonaws.com/blogs/${article.blog_id}_1.png`
            }
            alt={article.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 85vw, (max-width: 1200px) 50vw, 33vw"
            onError={() => setImgError(true)}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />

          <div className="absolute inset-0 flex flex-col justify-end p-4 text-white sm:p-6">
            <div className="mb-2 sm:mb-4">
              <Badge
                className={`w-fit font-mono text-xs uppercase tracking-wider text-white ${
                  category === "blog"
                    ? "bg-[#2B5741] hover:bg-emerald-800"
                    : "bg-orange-500 hover:bg-orange-600"
                }`}
                variant="secondary"
              >
                {article.category === "Blog" ? "Blog" : "Guide"}
              </Badge>
            </div>

            <h3
              className={`mb-2 font-['Raleway'] font-normal leading-tight ${
                size === "large"
                  ? "text-xl sm:text-2xl md:text-3xl"
                  : size === "medium"
                    ? "text-lg sm:text-xl md:text-2xl"
                    : size === "featured-side"
                      ? "text-base sm:text-lg"
                      : "text-base sm:text-xl"
              }`}
            >
              {article.title}
            </h3>

            {(size === "large" || size === "medium") && summaryText && (
              <RichText
                content={summaryText as unknown as RichContent}
                className="mb-2 line-clamp-2 text-xs leading-relaxed text-gray-300 sm:mb-4 sm:text-sm"
              />
            )}

            <div className="font-['Space_Mono'] text-[10px] uppercase tracking-wider text-gray-400 sm:text-xs">
              {new Date(article.publish_date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              })}
            </div>
          </div>
        </article>
      </Link>
    </div>
  );
}
