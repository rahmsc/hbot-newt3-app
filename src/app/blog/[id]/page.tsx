import Image from "next/image";
import React from "react";

const BlogId = ({
  params,
}: {
  params: {
    articleId: string;
  };
}) => {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Article Header Section */}
      <div className="mb-8">
        <h1 className="mb-2 text-center text-4xl font-bold">
          Site inspiration with Swiss style
        </h1>
        <p className="text-center text-gray-500">INSPIRATION / DEC 7, 2021</p>
      </div>

      {/* Article Content Section */}
      <div className="mb-8">
        <Image
          src="/path/to/image.jpg"
          alt="Article Image"
          className="mb-4 w-full rounded-md"
        />
        <p className="leading-relaxed text-gray-700">
          To mark the first UK show of artist Henri Barande, graphic designer
          Pavel Murren and German studio Schultzschultz have created The Lodge
          Wooden.
          {params.articleId}
        </p>
        {/* More Content Here */}
      </div>

      {/* Tweet Section */}
      <div className="mb-8 rounded-md bg-gray-100 p-4">
        <p className="mb-2 text-gray-600">
          @moonex – a studio with passionate, professional & full creativity...
        </p>
      </div>

      {/* Related Posts Section */}
      <div className="mb-8">
        <h2 className="mb-4 text-2xl font-bold">Related Posts</h2>
        <div className="flex flex-col gap-4 md:flex-row">
          <div className="flex-1">
            <Image
              src="/path/to/related-post-1.jpg"
              alt="Related Post 1"
              className="w-full rounded-md"
            />
            <h3 className="mt-2 text-xl">Review product BWIB</h3>
          </div>
          <div className="flex-1">
            <Image
              src="/path/to/related-post-2.jpg"
              alt="Related Post 2"
              className="w-full rounded-md"
            />
            <h3 className="mt-2 text-xl">Contrast in Brand Design</h3>
          </div>
        </div>
      </div>

      {/* Comment Section */}
      <div className="mb-8">
        <h2 className="mb-4 text-2xl font-bold">03 Comments:</h2>
        <div className="mb-4">
          <p className="font-semibold">Robert Downey Jr</p>
          <p className="text-gray-600">Lorem ipsum dolor sit amet...</p>
        </div>
        {/* More Comments */}
        <div>
          <textarea
            className="w-full rounded-md border border-gray-300 p-2"
            placeholder="Write your comment here"
          >
            ...
          </textarea>
          <button
            type="button"
            className="mt-2 rounded-md bg-blue-500 px-4 py-2 text-white"
          >
            Submit
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-gray-500">
        <p>Eden Hazard - Content Editor</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </div>
    </div>
  );
};

export default BlogId;
