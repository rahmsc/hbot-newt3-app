import Image from "next/image"
import Link from "next/link"
import { Badge } from "~/components/ui/badge"
import { useState } from "react"
import type { BlogDbEntry, RichContent } from "~/types/blog"
import RichText from "../utils/rich-text"

interface TrendingCardProps {
  article: BlogDbEntry
  size?: "small" | "medium" | "large" | "featured-side"
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
    if ('text' in node && node.text) {
      if ('marks' in node && node.marks && Array.isArray(node.marks)) {
        let formattedText = node.text;
        
        for (const mark of node.marks) {
          if (mark.type === 'bold') {
            formattedText = `**${formattedText}**`;
          } else if (mark.type === 'italic') {
            formattedText = `*${formattedText}*`;
          } else if (mark.type === 'underline') {
            formattedText = `<u>${formattedText}</u>`;
          }
        }
        
        markdown += formattedText;
      } else {
        markdown += node.text;
      }
    }
    
    // Handle block nodes
    else if ('type' in node) {
      if (node.type === 'paragraph') {
        const innerContent = node.content ? richContentToMarkdown({ content: node.content } as RichContent) : "";
        markdown += `${innerContent}\n\n`;
      } 
      else if (node.type?.startsWith('heading')) {
        const level = node.type.charAt(node.type.length - 1);
        const headingMarks = '#'.repeat(Number.parseInt(level) || 1);
        const innerContent = node.content ? richContentToMarkdown({ content: node.content } as RichContent) : "";
        markdown += `${headingMarks} ${innerContent}\n\n`;
      }
      else if (node.type === 'bulletList') {
        const listItems = node.content ?? [];
        for (const item of listItems) {
          if (item.type === 'listItem' && item.content) {
            const itemContent = richContentToMarkdown({ content: item.content } as RichContent);
            markdown += `* ${itemContent}\n`;
          }
        }
        markdown += '\n';
      }
      else if (node.type === 'orderedList') {
        const listItems = node.content ?? [];
        let i = 1;
        for (const item of listItems) {
          if (item.type === 'listItem' && item.content) {
            const itemContent = richContentToMarkdown({ content: item.content } as RichContent);
            markdown += `${i}. ${itemContent}\n`;
            i++;
          }
        }
        markdown += '\n';
      }
    }
  }
  
  return markdown;
};

export function TrendingCard({ article, size = "medium" }: TrendingCardProps) {
  const [imgError, setImgError] = useState(false);
  const category = article.category.toLowerCase();
  // Convert rich content summary to markdown string
  const summaryText = article.summary ? richContentToMarkdown(article.summary as unknown as RichContent) : "";

  return (
    <Link href={`/${category}/${article.url_slug}`} className="group block h-full">
      <article className="relative h-full w-full overflow-hidden rounded-[2rem] bg-white">
        <Image
          src={imgError ? "/placeholder.png" : `https://hbothq-bucket.s3.ap-southeast-2.amazonaws.com/${article.category === "Guide" ? "guide" : "blog"}/header/${article.blog_id}.png`}
          alt={article.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 85vw, (max-width: 1200px) 50vw, 33vw"
          onError={() => setImgError(true)}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />

        <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-6 text-white">
          <Badge
            className={`mb-2 sm:mb-4 w-fit font-mono text-xs uppercase tracking-wider text-white ${
             category === "blog" ? "bg-[#2B5741] hover:bg-emerald-800" : "bg-orange-500 hover:bg-orange-600"
            }`}
            variant="secondary" 
          >
            {article.category === "Blog" ? "Blog" : "Guide"}
          </Badge>

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
            <RichText content={summaryText as unknown as RichContent} className="mb-2 sm:mb-4 line-clamp-2 text-xs sm:text-sm leading-relaxed text-gray-300" />
          )}

          <div className="font-['Space_Mono'] text-[10px] sm:text-xs uppercase tracking-wider text-gray-400">
            {new Date(article.publish_date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            })}
          </div>
        </div>
      </article>
    </Link>
  )
}

