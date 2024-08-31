import { ChatBubbleIcon, Pencil1Icon } from "@radix-ui/react-icons";
import placeholderImage from "../../../public/testImages/img4.jpg";
import Image from "next/image";

const UserGuideComponent = () => {
  return (
    <div className="flex overflow-hidden rounded-lg bg-gray-500 bg-opacity-20 shadow-lg">
      {/* Image Section */}
      <div className="h-64 md:w-1/2">
        <Image
          src={placeholderImage}
          alt="Photoshoot Scene"
          width={500}
          height={500}
        />
      </div>

      {/* Text Section */}
      <div className="p-6 md:w-1/2">
        <div className="mb-2 text-sm uppercase text-gray-500">Inspiration</div>
        <div className="mb-4 text-sm text-gray-400">Dec 15, 2021</div>
        <h2 className="mb-4 text-xl font-bold">
          How to build photoshoots scene for product impress more
        </h2>
        <div className="flex items-center text-sm text-gray-500">
          <div className="mr-4 flex items-center">
            <ChatBubbleIcon className="mr-1 h-4 w-4" />
            12 Comments
          </div>
          <div className="flex items-center">
            <Pencil1Icon />
            by Admin
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserGuideComponent;
