import Image from "next/image";
import Link from "next/link";

import { combinedChamberData } from "~/data/combinedChambersData";

export default function ChambersShowcase() {
  const chambers = combinedChamberData.slice(0, 3);

  return (
    <aside className="sticky top-8 ml-8 w-72 self-start rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <div className="mb-4 text-center">
        <div className="mb-2">
          <Image
            src="/images/save-to-collection.png"
            alt="Save to collection"
            width={24}
            height={24}
            className="mx-auto"
          />
          <span className="text-sm text-gray-600">Save to collection</span>
        </div>
        <h2 className="text-lg font-semibold">Shop CHAMBERS</h2>
      </div>
      <div className="flex flex-col gap-4">
        {chambers.map((chamber) => (
          <Link
            key={chamber.id}
            href={`/chambers/${chamber.name}`}
            className="group flex flex-col"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
              <Image
                src={chamber.image}
                alt={chamber.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="mt-2 flex flex-col items-center">
              <button
                type="button"
                className="rounded-full border border-blue-600 bg-white px-4 py-1.5 text-sm text-blue-600 transition-colors hover:bg-blue-600 hover:text-white"
              >
                Shop Chambers
              </button>
              <span className="mt-1 text-xs text-gray-500">view product</span>
            </div>
          </Link>
        ))}
      </div>
    </aside>
  );
}
