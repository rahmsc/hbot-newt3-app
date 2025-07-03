"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { sendGAEvent } from "@next/third-parties/google";

import { cn } from "~/lib/utils";

const navItems = ["CHAMBERS", "TRENDING", "RESEARCH", "PROVIDERS", "JOIN-HQ"];

export function MainNav() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

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

  const handleNavClick = (item: string) => {
    sendGAEvent("event", "navigation_click", {
      value: item.toLowerCase(),
    });
  };

  return (
    <nav
      className={cn(
        "fixed left-0 right-0 z-40 bg-[#f9f7f4] shadow-md transition-all duration-150",
        isScrolled ? "top-12" : "top-16",
        isVisible ? "translate-y-0" : "-translate-y-full",
      )}
    >
      <div className="h-px w-full bg-gray-200" />
      <div className="md:block">
        {/* Mobile view - Horizontal scroll */}
        <div className="scrollbar-none overflow-x-auto md:hidden">
          <ul className="flex min-w-max">
            {navItems.map((item, index) => {
              const isActive = pathname === `/${item.toLowerCase()}`;
              return (
                <li key={item} className="flex items-center">
                  <Link
                    href={`/${item.toLowerCase()}`}
                    onClick={() => handleNavClick(item)}
                    className={cn(
                      "group flex h-12 items-center justify-center px-4 font-['Raleway'] text-xs tracking-[0.2em] transition-all hover:bg-gray-50 sm:text-sm",
                      isActive ? "text-gray-900" : "text-gray-600",
                    )}
                  >
                    <span className="relative whitespace-nowrap">
                      {item}
                      <span
                        className={cn(
                          "absolute -bottom-1 left-0 h-px w-full scale-x-0 bg-gray-900 transition-transform duration-300 group-hover:scale-x-100",
                          isActive && "scale-x-100",
                        )}
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
        </div>

        {/* Desktop view */}
        <ul className="hidden md:flex">
          {navItems.map((item, index) => {
            const isActive = pathname === `/${item.toLowerCase()}`;
            return (
              <li key={item} className="flex flex-1 items-center">
                <Link
                  href={`/${item.toLowerCase()}`}
                  onClick={() => handleNavClick(item)}
                  className={cn(
                    "group flex h-12 w-full items-center justify-center text-center font-['Raleway'] text-sm tracking-[0.2em] transition-all hover:bg-gray-50",
                    isActive ? "text-gray-900" : "text-gray-600",
                  )}
                >
                  <span className="relative inline-flex items-center justify-center">
                    {item}
                    <span
                      className={cn(
                        "absolute -bottom-1 left-0 h-px w-full scale-x-0 bg-gray-900 transition-transform duration-300 group-hover:scale-x-100",
                        isActive && "scale-x-100",
                      )}
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
      </div>
      <div className="h-px w-full bg-gray-200" />
    </nav>
  );
}
