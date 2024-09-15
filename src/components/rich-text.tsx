import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

import { cn } from "../lib/utils";

interface RichTextProps {
  content: string;
  className?: string;
}

function splitIntoTwoSentenceParagraphs(text: string): string {
  // Split the text into sentences
  const sentences = text.match(/[^.!?]+[.!?]+/g) ?? [];

  // Group sentences into pairs
  const paragraphs: string[] = [];
  for (let i = 0; i < sentences.length; i += 2) {
    if (i + 1 < sentences.length) {
      paragraphs.push(`${sentences[i]?.trim()} ${sentences[i + 1]?.trim()}`);
    } else {
      paragraphs.push(sentences[i]?.trim() ?? "");
    }
  }

  // Join paragraphs with double line breaks
  return paragraphs.join("\n\n");
}

export default function RichText({ content, className }: RichTextProps) {
  const processedContent = splitIntoTwoSentenceParagraphs(content);

  return (
    <div className={cn("prose dark:prose-invert", className)}>
      <ReactMarkdown
        className={cn("prose max-w-none dark:prose-invert", className)}
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          a: ({ ...props }) => (
            <a
              {...props}
              className="text-blue-600 underline hover:text-blue-500"
              target="_blank"
              rel="noopener noreferrer"
            />
          ),
          p: ({ ...props }) => <p {...props} className="mb-4" />,
        }}
      >
        {processedContent}
      </ReactMarkdown>
    </div>
  );
}
