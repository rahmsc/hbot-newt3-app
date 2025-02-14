// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { Badge } from "~/components/ui/badge";
// import type { TrendingArticle } from "~/utils/supabase/articles/getTrendingArticles";

// interface HeaderArticleProps {
//   post: TrendingArticle;
// }

// export function HeaderArticle({ post }: HeaderArticleProps) {
//   return (
//     <Link href={post.link} className="group block">
//       <div className="relative h-[300px] w-full overflow-hidden sm:h-[350px] md:h-[400px]">
//         <Image
//           src={post.image}
//           alt={post.title}
//           fill
//           className="object-cover transition-transform duration-300 group-hover:scale-105"
//           priority
//         />
//         <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

//         <div className="absolute bottom-0 left-0 p-6 text-white">
//           <div className="mb-4 flex gap-2">
//             <Badge
//               variant="default"
//               className={`backdrop-blur-sm ${
//                 post.category.main.toLowerCase() === "blog"
//                   ? "bg-emerald-700"
//                   : post.category.main.toLowerCase() === "guide"
//                     ? "bg-orange-700"
//                     : "bg-white/20"
//               }`}
//             >
//               {post.category.main}
//             </Badge>
//             <Badge variant="secondary" className="bg-white/50 backdrop-blur-sm">
//               {post.category.sub}
//             </Badge>
//           </div>

//           <h1 className="mb-2 text-2xl font-bold sm:text-3xl md:text-4xl">
//             {post.title}
//           </h1>

//           <p className="line-clamp-2 text-sm text-gray-200 sm:text-base md:text-lg">
//             {post.description}
//           </p>
//         </div>
//       </div>
//     </Link>
//   );
// }
