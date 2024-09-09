import Image from "next/image";
import { Cross2Icon } from "@radix-ui/react-icons";
import { chamberData } from "~/data/chamberData";
import { useState, useEffect } from "react";

interface ImagePopupProps {
  chamberId: number;
  onClose: () => void;
}

export default function ImagePopup({ chamberId, onClose }: ImagePopupProps) {
  const chamberImageUrl =
    "https://hbothq-bucket.s3.ap-southeast-2.amazonaws.com/chambers/products/";

  const [currentChamberId, setCurrentChamberId] = useState(chamberId);

  useEffect(() => {
    setCurrentChamberId(chamberId);
  }, [chamberId]);

  const findChamber = chamberData.find(
    (chamber) => chamber.id === currentChamberId,
  );

  if (!findChamber) {
    return null;
  }

  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const goToNextChamber = () => {
    if (currentChamberId < 5) {
      setCurrentChamberId((prevId) => prevId + 1);
    }
  };

  const goToPreviousChamber = () => {
    if (currentChamberId > 1) {
      setCurrentChamberId((prevId) => prevId - 1);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={handleOutsideClick}
      onKeyDown={() => handleOutsideClick}
    >
      <div
        className="relative max-w-4xl rounded-lg bg-white p-8 shadow-xl"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4"
          type="button"
        >
          <Cross2Icon className="h-6 w-6" />
        </button>
        <div className="flex flex-row items-center justify-between">
          {/* Left Arrow */}
          {currentChamberId > 1 && (
            <button
              onClick={goToPreviousChamber}
              className="text-2xl font-bold text-gray-700 hover:text-black"
              type="button"
            >
              &larr;
            </button>
          )}

          <div className="flex w-full flex-col items-center md:flex-row">
            <div className="w-full md:w-1/2">
              <Image
                src={`${chamberImageUrl}${currentChamberId}.png`}
                alt={findChamber.title}
                width={400}
                height={400}
                className="rounded-lg"
              />
            </div>
            <div className="mt-4 w-full md:ml-8 md:mt-0 md:w-1/2">
              <h2 className="mb-4 text-2xl font-bold">{findChamber.title}</h2>
              <ul className="list-inside list-disc">
                {findChamber.description.map((descriptionPoint, index) => (
                  // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                  <li key={index}>{descriptionPoint}</li>
                ))}
              </ul>
            </div>
          </div>
          {currentChamberId < 5 && (
            <button
              onClick={goToNextChamber}
              className="text-2xl font-bold text-gray-700 hover:text-black"
              type="button"
            >
              &rarr;
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
