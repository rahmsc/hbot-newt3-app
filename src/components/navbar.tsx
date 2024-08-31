"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import RolePopup from "./guides/guide-popup"; // Import the RolePopup component

const Navbar = () => {
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isPopupOpen, setIsPopupOpen] = useState(false); // State to control the popup visibility
  const router = useRouter();

  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== "undefined") {
        if (window.scrollY > lastScrollY) {
          setShow(false);
        } else {
          setShow(true);
        }
        setLastScrollY(window.scrollY);
      }
    };

    if (typeof window !== "undefined") {
      window.addEventListener("scroll", controlNavbar);
      return () => {
        window.removeEventListener("scroll", controlNavbar);
      };
    }
  }, [lastScrollY]);

  const handleGuidesClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent default link behavior
    setIsPopupOpen(true); // Open the popup when Guides is clicked
  };

  const handleRoleSelection = (role: "provider" | "user") => {
    setIsPopupOpen(false);
    router.push(`/guides/${role}`);
  };

  return (
    <>
      <nav
        className={`bg-custom-bg fixed left-0 right-0 top-0 z-50 border-b-2 border-black transition-transform duration-300 ease-in-out ${
          show ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="container mx-auto flex items-center justify-between px-6 py-12">
          <div className="flex items-center">
            <Link href="/">
              <span className="text-xl font-semibold">Logo</span>
            </Link>
          </div>
          <div className="flex items-center space-x-8 text-xl">
            <Link href="/">
              <span className="hover:text-selected-text text-gray-700">
                Home
              </span>
            </Link>
            <Link href="/research">
              <span className="hover:text-selected-text text-gray-700">
                Research
              </span>
            </Link>
            <Link
              href="/guides"
              onClick={handleGuidesClick} // Attach the click handler for the Guides button
              className="hover:text-selected-text cursor-pointer text-gray-700"
            >
              Guides
            </Link>
            <Link href="/chambers">
              <span className="hover:text-selected-text text-gray-700">
                Chambers
              </span>
            </Link>
            <Link href="/blog">
              <span className="hover:text-selected-text text-gray-700">
                Blog
              </span>
            </Link>
            <Link href="/contact">
              <span className="hover:text-selected-text text-gray-700">
                Join HQ
              </span>
            </Link>
            <button
              className="hover:text-selected-text text-gray-700"
              type="button"
            >
              <MagnifyingGlassIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </nav>
      {isPopupOpen && (
        <RolePopup
          onSelectRole={handleRoleSelection} // Pass the selection handler to the RolePopup
        />
      )}
    </>
  );
};

export default Navbar;
