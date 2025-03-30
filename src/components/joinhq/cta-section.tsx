import Link from "next/link";

export const CTASection = () => {
  return (
    <section className="container mx-auto flex justify-center gap-6 px-6 py-24">
      <Link
        href="/enquire"
        className="rounded-md bg-orange-500 px-8 py-3 text-lg font-medium text-white transition-colors hover:bg-orange-600"
      >
        Enquire Now
      </Link>
      <Link
        href="/join-hq/register"
        className="rounded-md bg-orange-500 px-8 py-3 text-lg font-medium text-white transition-colors hover:bg-orange-600"
      >
        Join HQ
      </Link>
    </section>
  );
};
