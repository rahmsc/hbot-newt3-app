"use client";

import { sendGAEvent } from "@next/third-parties/google";
import Link from "next/link";

interface BlogPostLinkProps {
  href: string;
  title: string;
  children: React.ReactNode;
}

export default function BlogPostLink({
  href,
  title,
  children,
}: BlogPostLinkProps) {
  return (
    <Link
      href={href}
      onClick={() =>
        sendGAEvent("event", "buttonClicked", {
          value: `Blog Post ${title}`,
        })
      }
    >
      {children}
    </Link>
  );
}
