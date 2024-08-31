"use client";

import { type FC } from "react";

interface RolePopupProps {
  onSelectRole: (role: "provider" | "user") => void;
}

const RolePopup: FC<RolePopupProps> = ({ onSelectRole }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="rounded-lg bg-white p-8 shadow-lg">
        <h2 className="mb-4 text-2xl font-bold">Who are you?</h2>
        <button
          onClick={() => onSelectRole("provider")}
          className="mr-4 rounded bg-orange-500 px-4 py-2 text-white"
          type="button"
        >
          Wellness Provider
        </button>
        <button
          onClick={() => onSelectRole("user")}
          className="rounded bg-gray-500 px-4 py-2 text-white"
          type="button"
        >
          Home User
        </button>
      </div>
    </div>
  );
};

export default RolePopup;
