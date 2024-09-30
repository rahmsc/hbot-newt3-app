"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import RolePopup from "./guides/guide-popup";
import logo from "../../public/logo/LOGO.png";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import type React from "react";

const Navbar = () => {
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

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
    e.preventDefault();
    setIsPopupOpen(true);
  };

  const handleRoleSelection = (role: "provider" | "user") => {
    setIsPopupOpen(false);
    router.push(`/guides/${role}`);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const NavLink = ({
    href,
    children,
    onClick,
    isActive,
  }: {
    href: string;
    children: React.ReactNode;
    onClick?: (e: React.MouseEvent) => void;
    isActive: boolean;
  }) => {
    return (
      <Link
        href={href}
        onClick={onClick}
        className={`relative text-gray-700 transition-colors duration-200 hover:text-orange-500 ${
          isActive ? "text-orange-500" : ""
        }`}
      >
        <span>{children}</span>
        {isActive && (
          <span className="absolute bottom-0 left-0 h-0.5 w-full origin-bottom scale-x-100 transform bg-orange-500 transition-transform duration-200" />
        )}
      </Link>
    );
  };

  const isGuidesActive = pathname.startsWith("/guides");

  const NavLinks = () => (
    <>
      <NavLink href="/research" isActive={pathname === "/research"}>
        Research
      </NavLink>
      <NavLink
        href="/guides"
        onClick={handleGuidesClick}
        isActive={isGuidesActive}
      >
        Guides
      </NavLink>
      <NavLink href="/chambers" isActive={pathname === "/chambers"}>
        Chambers
      </NavLink>
      <NavLink href="/blog" isActive={pathname === "/blog"}>
        Blog
      </NavLink>
      <NavLink href="/contact" isActive={pathname === "/contact"}>
        Join HQ
      </NavLink>
    </>
  );

  return (
    <>
      <nav
        className={`bg-custom-bg fixed left-0 right-0 top-0 z-50 border-b-2 border-black bg-background transition-transform duration-300 ease-in-out ${
          show ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="container mx-auto flex items-center justify-between bg-background py-4 pt-6">
          <div className="flex items-center">
            <Link href="/">
              <Image src={logo} alt="Logo" width={150} height={50} />
            </Link>
          </div>
          <div className="hidden items-center space-x-8 text-xl md:flex">
            <NavLinks />
          </div>
          <div className="md:hidden">
            <button onClick={toggleMobileMenu} className="p-2" type="button">
              {isMobileMenuOpen ? (
                <X className="h-6 w-6 text-gray-700 transition-colors duration-200 hover:text-orange-500" />
              ) : (
                <Menu className="h-6 w-6 text-gray-700 transition-colors duration-200 hover:text-orange-500" />
              )}
            </button>
          </div>
        </div>
        {isMobileMenuOpen && (
          <div className="bg-background md:hidden">
            <div className="flex flex-col items-center space-y-4 py-4">
              <NavLinks />
            </div>
          </div>
        )}
      </nav>
      {isPopupOpen && <RolePopup onSelectRole={handleRoleSelection} />}
    </>
  );
};

export default Navbar;
