import { HydrateClient } from "~/trpc/server";

import ArticleSection from "../components/sections/article-section";
import BlogSection from "../components/sections/blog-section";
import ContactSection from "../components/sections/contact-section";
import EmailInputForm from "../components/sections/email-input-form";
import HeroSection from "../components/sections/hero-section";
import ImageSection from "~/components/sections/image-section";

export default async function Home() {
  return (
    <HydrateClient>
      <main className="flex w-full flex-row items-center justify-center pt-32">
        <div>
          <ImageSection />
          <HeroSection />
          <EmailInputForm />
          <ArticleSection />

          <BlogSection />
          <ContactSection />
        </div>
      </main>
    </HydrateClient>
  );
}
