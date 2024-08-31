import CallToAction from "../../../components/call-to-action";
import OneImageGuideCarousel from "../../../components/guides/carousels/one-image-guide-carousel";
import CategoriesComponent from "../../../components/guides/categories-component";
import GuidesListing from "../../../components/guides/guide-listings";
import PopularPosts from "../../../components/guides/popular-guides";

const ProviderGuides = () => {
  return (
    <section className="flex flex-col items-center pt-32">
      <div className="w-full max-w-4xl px-4">
        <h1 className="mb-8 text-center text-3xl font-bold">
          Wellness Provider Guides
        </h1>
        <div className="mx-auto mb-8 w-full max-w-xl">
          <OneImageGuideCarousel />
        </div>
      </div>
      <div className="w-full bg-gray-100">
        {" "}
        {/* Adjust background color as needed */}
        <CallToAction />
      </div>
      <div className="flex w-full max-w-4xl flex-col gap-8 px-4 md:flex-row">
        <GuidesListing />
        <div className="w-full md:w-1/3">
          <PopularPosts />
          <CategoriesComponent />
        </div>
      </div>
    </section>
  );
};

export default ProviderGuides;
