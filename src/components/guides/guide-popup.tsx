import { useRouter } from "next/navigation";
import type { FC } from "react";

import { X } from "lucide-react";

interface RolePopupProps {
  onSelectRole: (role: "provider" | "user") => void;
}

const RolePopup: FC<RolePopupProps> = ({ onSelectRole }) => {
  const router = useRouter();

  const handleClose: () => void = () => {
    router.push("/");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative flex flex-col justify-center rounded-lg bg-white p-8 shadow-lg">
        <button
          onClick={handleClose}
          type="button"
          className="absolute -right-3 -top-3 flex h-10 w-10 items-center justify-center rounded-full border-2 border-orange-500 bg-white text-orange-500 transition-colors hover:bg-orange-100"
        >
          <X size={20} />
        </button>
        <h2 className="mb-4 text-2xl font-bold">
          We would love to tailor our guide options to suit your needs!
        </h2>
        <div className="flex flex-row items-center justify-center space-x-4 font-light">
          <button
            onClick={() => onSelectRole("provider")}
            className="mr-4 w-[250px] rounded bg-orange-500 px-4 py-2 font-editors-note text-xl text-white"
            type="button"
          >
            Wellness Provider
          </button>
          <button
            onClick={() => onSelectRole("user")}
            className="w-[250px] rounded bg-gray-500 px-4 py-2 font-editors-note text-xl text-white"
            type="button"
          >
            Home User
          </button>
        </div>
      </div>
    </div>
  );
};

export default RolePopup;
