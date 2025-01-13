import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

import { cn } from "../lib/utils";

interface RichTextProps {
  content: string;
  className?: string;
}

export default function RichText({ content, className }: RichTextProps) {
  return (
    <div className={cn("prose max-w-none dark:prose-invert", className)}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          a: ({ ...props }) => (
            <a
              {...props}
              className="text-blue-600 underline transition-colors duration-200 hover:text-blue-800"
              target="_blank"
              rel="noopener noreferrer"
            />
          ),
          p: ({ ...props }) => (
            <p {...props} className="mb-6 leading-relaxed last:mb-0" />
          ),
          h1: ({ ...props }) => (
            <h1
              {...props}
              className="mb-6 font-editors-note text-3xl font-bold"
            />
          ),
          h2: ({ ...props }) => (
            <h2
              {...props}
              className="mb-4 font-editors-note text-2xl font-semibold"
            />
          ),
          h3: ({ ...props }) => (
            <h3
              {...props}
              className="mb-3 font-editors-note text-xl font-semibold"
            />
          ),
          h4: ({ ...props }) => (
            <h4
              {...props}
              className="mb-2 font-editors-note text-lg font-semibold"
            />
          ),
          h5: ({ ...props }) => (
            <h5
              {...props}
              className="mb-2 font-editors-note text-base font-semibold"
            />
          ),
          h6: ({ ...props }) => (
            <h6
              {...props}
              className="mb-2 font-editors-note text-sm font-semibold"
            />
          ),
          ul: ({ ...props }) => (
            <ul {...props} className="mb-6 list-disc pl-6" />
          ),
          ol: ({ ...props }) => (
            <ol {...props} className="mb-6 list-decimal pl-6" />
          ),
          li: ({ ...props }) => <li {...props} className="mb-2" />,
          blockquote: ({ ...props }) => (
            <blockquote
              {...props}
              className="mb-6 border-l-4 border-gray-300 pl-4 italic"
            />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
