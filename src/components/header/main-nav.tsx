"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { cn } from "~/lib/utils";

const navItems = [
  "CHAMBERS",
  "TRENDING",
  "RESEARCH",
  "PROVIDERS",
  "JOIN-HQ",
];

export function MainNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    setIsMenuOpen(false);
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      setIsScrolled(currentScrollY > 0);

      if (currentScrollY < lastScrollY || currentScrollY <= 0) {
        // Scrolling up or at the top
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down and past the initial view
        setIsVisible(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <nav
      className={cn(
        "fixed left-0 right-0 z-40 bg-[#f9f7f4] shadow-md transition-all duration-150",
        isScrolled ? "top-12" : "top-16",
        isVisible ? "translate-y-0" : "-translate-y-full",
      )}
    >
      <div className="h-px w-full bg-gray-200" />
      <div className="">
        <div className="relative" ref={menuRef}>
          {/* Mobile menu button */}
          <button
            type="button"
            className="absolute left-4 top-3 z-20 text-gray-600 transition-colors hover:text-gray-900 md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <Menu className="h-5 w-5" />
          </button>

          {/* Desktop menu */}
          <ul className="hidden md:flex">
            {navItems.map((item, index) => {
              const isActive = pathname === `/${item.toLowerCase()}`;
              return (
                <li key={item} className="flex flex-1 items-center">
                  <Link
                    href={`/${item.toLowerCase()}`}
                    className={`group flex h-12 w-full items-center justify-center font-['Raleway'] text-sm tracking-[0.2em] transition-all hover:bg-gray-50 ${
                      isActive ? "text-gray-900" : "text-gray-600"
                    }`}
                  >
                    <span className="relative">
                      {item}
                      <span
                        className={`absolute -bottom-1 left-0 h-px w-full scale-x-0 bg-gray-900 transition-transform duration-300 group-hover:scale-x-100 ${isActive ? "scale-x-100" : ""}`}
                      />
                    </span>
                  </Link>
                  {index < navItems.length - 1 && (
                    <div className="h-12 w-px self-center bg-gray-100" />
                  )}
                </li>
              );
            })}
          </ul>

          {/* Mobile menu */}
          <ul
            className={`absolute left-0 right-0 top-0 z-10 flex flex-col bg-white/95 py-2 shadow-lg backdrop-blur-sm transition-all md:hidden ${
              isMenuOpen
                ? "translate-y-0 opacity-100"
                : "pointer-events-none -translate-y-2 opacity-0"
            }`}
          >
            {navItems.map((item) => {
              const isActive = pathname === `/${item.toLowerCase()}`;
              return (
                <li key={item}>
                  <Link
                    href={`/${item.toLowerCase()}`}
                    className={`block px-6 py-3 font-['Raleway'] text-sm tracking-[0.2em] transition-colors hover:bg-gray-50 ${
                      isActive ? "text-gray-900" : "text-gray-600"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="h-px w-full bg-gray-200" />
    </nav>
  );
}
