const cateContent = [
  { catName: "All", postNumber: "18", id: 1 },
  { catName: "Inspirations", postNumber: "4", id: 2 },
  { catName: "Experiences", postNumber: "3", id: 3 },
  { catName: "Reviews", postNumber: "5", id: 4 },
  { catName: "Tips & Tricks", postNumber: "1", id: 5 },
  { catName: "Others", postNumber: "4", id: 6 },
];

const CategoriesComponent = () => {
  return (
    <div>
      <h3 className="text-xl font-bold mb-4">Categories</h3>
      <ul>
        {cateContent.map((val, i) => (
          <li key={val.id} className="mb-2">
            <a
              href="/"
              className="flex justify-between text-gray-700 hover:text-blue-500"
            >
              <span>{val.catName}</span>
              <span>{val.postNumber}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoriesComponent;
