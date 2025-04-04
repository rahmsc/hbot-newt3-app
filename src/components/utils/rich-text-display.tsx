// /* eslint-disable @typescript-eslint/no-unsafe-assignment */
// /* eslint-disable @typescript-eslint/no-redundant-type-constituents */
// "use client";

// import React from "react";
// import ReactMarkdown from "react-markdown";
// import rehypeRaw from "rehype-raw";
// import remarkGfm from "remark-gfm";

// import type { BlogDbEntry } from "~/types/blog";

// import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

// export function RichTextDisplay({ data }: { data: BlogDbEntry | BlogDbEntry[] }) {
//   const posts = Array.isArray(data) ? data : [data];

//   if (posts.length === 0) {
//     return <div>No data available</div>;
//   }

//   return (
//     <div className="space-y-6">
//       {posts.map((item) => (
//         <Card key={item.blog_id} className="overflow-hidden">
//           <CardHeader>
//             <CardTitle>{item.title}</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <ReactMarkdown
//               className="prose max-w-none dark:prose-invert"
//               remarkPlugins={[remarkGfm]}
//               rehypePlugins={[rehypeRaw]}
//               components={{
//                 a: ({ ...props }) => (
//                   <a
//                     {...props}
//                     className="text-blue-600 underline hover:text-blue-500"
//                     target="_blank"
//                     rel="noopener noreferrer"
//                   />
//                 ),
//                 p: ({ ...props }) => <p {...props} className="mb-4" />,
//               }}
//             >
//               {item.body}
//             </ReactMarkdown>
//           </CardContent>
//         </Card>
//       ))}
//     </div>
//   );
// }
