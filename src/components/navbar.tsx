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

  useEffect(() => {
    // Close mobile menu when pathname changes
    setIsMobileMenuOpen(false);
  }, []);

  const handleGuidesClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsPopupOpen(true);
    setIsMobileMenuOpen(false);
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
    const handleClick = (e: React.MouseEvent) => {
      if (onClick) {
        onClick(e);
      }
      setIsMobileMenuOpen(false);
    };

    return (
      <Link
        href={href}
        onClick={handleClick}
        className={`relative text-gray-700 transition-colors duration-200 hover:text-orange-500 ${
          isActive ? "text-orange-500" : ""
        } w-full md:w-auto`}
      >
        <span className="block py-2 md:inline md:py-0">{children}</span>
        {isActive && (
          <span className="absolute bottom-0 left-0 hidden h-0.5 w-full origin-bottom scale-x-100 transform bg-orange-500 transition-transform duration-200 md:block" />
        )}
      </Link>
    );
  };

  const isGuidesActive = pathname.startsWith("/guides");

  const NavLinks = () => (
    <>
      <NavLink href="/research" isActive={pathname === "/research"}>
        <p className="font-editors-note text-xl font-semibold md:text-2xl">
          Research
        </p>
      </NavLink>
      <NavLink
        href="/guides"
        onClick={handleGuidesClick}
        isActive={isGuidesActive}
      >
        <p className="font-editors-note text-xl font-semibold md:text-2xl">
          Guides
        </p>
      </NavLink>
      <NavLink href="/chambers" isActive={pathname === "/chambers"}>
        <p className="font-editors-note text-xl font-semibold md:text-2xl">
          Chambers
        </p>
      </NavLink>
      <NavLink href="/blog" isActive={pathname === "/blog"}>
        <p className="font-editors-note text-xl font-semibold md:text-2xl">
          Blog
        </p>
      </NavLink>
      <NavLink href="/contact" isActive={pathname === "/contact"}>
        <p className="font-editors-note text-xl font-semibold md:text-2xl">
          Join HQ
        </p>
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
        <div className="container mx-auto flex items-center justify-between bg-background px-4 py-2 md:px-0 md:py-4 md:pt-6">
          <div className="flex items-center">
            <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
              <div className="relative h-[33px] w-[100px] md:h-[60px] md:w-[160px]">
                <Image
                  src={logo}
                  alt="Logo"
                  fill
                  style={{ objectFit: "contain" }}
                  sizes="(max-width: 768px) 100px, 150px"
                  priority
                />
              </div>
            </Link>
          </div>
          <div className="hidden items-center space-x-4 text-xl md:flex md:space-x-8">
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
            <div className="flex flex-col items-start space-y-4 px-4 py-4">
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
