"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu } from "lucide-react";

const navItems = [
  "NURESEARCH",
  "CHAMBERS",
  "TRENDING",
  "PROVIDERS",
  "MARKET",
  "JOIN HQ",
];

export function MainNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="w-full border-y">
      <div className="container mx-auto">
        <div className="relative">
          {/* Mobile menu button */}
          <button
            type="button"
            className="absolute left-4 top-3 z-20 md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <Menu className="h-6 w-6" />
          </button>

          {/* Desktop menu */}
          <ul className="hidden justify-between md:flex">
            {navItems.map((item) => (
              <li key={item} className="flex-1">
                <Link
                  href={`/${item.toLowerCase()}`}
                  className="flex h-12 w-full items-center justify-center text-sm font-medium transition-colors hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile menu */}
          <ul
            className={`absolute left-0 right-0 top-0 z-10 flex flex-col bg-white py-2 md:hidden ${
              isMenuOpen ? "block" : "hidden"
            }`}
          >
            {navItems.map((item) => (
              <li key={item}>
                <Link
                  href={`/${item.toLowerCase()}`}
                  className="block px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
