"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

interface GuideData {
  id: string;
  fields: {
    "Guide Title": string;
    Guide: string;
  };
}

export function RichTextGuide({ data }: { data: GuideData | GuideData[] }) {
  const guides = Array.isArray(data) ? data : [data];

  if (guides.length === 0) {
    return <div>No guide data available</div>;
  }

  return (
    <div className="space-y-6">
      {guides.map((item) => (
        <Card key={item.id} className="overflow-hidden">
          <CardHeader>
            <CardTitle>{item.fields["Guide Title"]}</CardTitle>
          </CardHeader>
          <CardContent>
            <ReactMarkdown
              className="prose max-w-none dark:prose-invert"
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
              {item.fields.Guide}
            </ReactMarkdown>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
