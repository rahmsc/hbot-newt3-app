import Image from "next/image";
import { blogContent } from "../../data/articlesDemo";
import { type ArticleItemProps } from "../../components/sections/article-section";

const blogPosts: ArticleItemProps[] = blogContent.map((post) => ({
  id: post.id,
  title: post.title,
  meta: post.meta,
  img: post.img,
}));

const BlogPage = () => {
  return (
    <section className="flex w-full flex-col items-center justify-center pt-32">
      <div className="container mx-auto px-4">
        Hello
        <div className="grid grid-cols-1 gap-8 pt-16 md:grid-cols-3">
          {blogPosts.map((post) => (
            <div key={post.id} className="flex flex-col items-center">
              <div className="relative h-72 w-72 overflow-hidden rounded-lg border">
                <Image
                  src={post.img}
                  alt={post.title}
                  className="absolute inset-0"
                />
              </div>
              <div className="p-4 text-center">
                <h4 className="mb-2 text-xl font-semibold">{post.title}</h4>
                <p className="text-gray-600">{post.meta}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogPage;
