import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import type { FC } from "react";

interface RolePopupProps {
  onSelectRole: (role: "provider" | "user") => void;
}

const RolePopup: FC<RolePopupProps> = ({ onSelectRole }) => {
  const router = useRouter();

  const handleClose = () => {
    router.push("/");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4">
      <div className="relative flex w-full max-w-md flex-col justify-center rounded-lg bg-white p-6 shadow-lg sm:p-8">
        <button
          onClick={handleClose}
          type="button"
          className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full border-2 border-orange-500 bg-white text-orange-500 transition-colors hover:bg-orange-100 sm:-right-3 sm:-top-3 sm:h-10 sm:w-10"
          aria-label="Close"
        >
          <X size={16} className="sm:h-5 sm:w-5" />
        </button>
        <h2 className="mb-6 text-center text-xl font-bold sm:text-2xl">
          We would love to tailor our guide options to suit your needs!
        </h2>
        <div className="flex flex-col items-center justify-center space-y-4 font-light sm:flex-row sm:space-x-4 sm:space-y-0">
          <button
            onClick={() => onSelectRole("provider")}
            className="w-full rounded bg-orange-500 px-4 py-3 font-editors-note text-lg text-white transition-colors hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 sm:text-xl"
            type="button"
          >
            Wellness Provider
          </button>
          <button
            onClick={() => onSelectRole("user")}
            className="w-full rounded bg-gray-500 px-4 py-3 font-editors-note text-lg text-white transition-colors hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 sm:text-xl"
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
