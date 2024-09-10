import Link from "next/link";

export const popularPostContent = [
  {
    id: "plant-based-diet",
    postNumber: "1",
    catName: "Nutrition",
    title: "The Benefits of a Plant-Based Diet",
  },
  {
    id: "importance-of-sleep",
    postNumber: "2",
    catName: "Wellness",
    title: "The Importance of Sleep for Mental Health",
  },
  {
    id: "yoga-for-beginners",
    postNumber: "3",
    catName: "Fitness",
    title: "Yoga for Beginners: A Step-by-Step Guide",
  },
  {
    id: "superfoods-immune-system",
    postNumber: "4",
    catName: "Nutrition",
    title: "Superfoods to Boost Your Immune System",
  },
];

const PopularPosts = () => {
  return (
    <div className="mb-8">
      <h3 className="mb-4 text-xl font-bold">Popular Posts</h3>
      {popularPostContent.map((val) => (
        <Link key={val.id} href={`/blog/${val.id}`} className="mb-4 flex">
          <div className="mr-4 font-bold text-gray-700">{val.postNumber}</div>
          <div>
            <span className="text-sm text-gray-500">{val.catName}</span>
            <h6 className="text-gray-800">{val.title}</h6>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default PopularPosts;
