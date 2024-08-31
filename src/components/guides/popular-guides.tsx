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
      <h3 className="text-xl font-bold mb-4">Popular Posts</h3>
      {popularPostContent.map((val, i) => (
        <Link key={val.id} href={`/blog/${val.id}`} className="flex mb-4">
          <div className="font-bold text-gray-700 mr-4">{val.postNumber}</div>
          <div>
            <span className="text-gray-500 text-sm">{val.catName}</span>
            <h6 className="text-gray-800">{val.title}</h6>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default PopularPosts;
