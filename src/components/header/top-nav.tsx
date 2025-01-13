"use client";

import { Menu,Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { LoginButton } from "~/components/auth/LoginButton";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

export function TopNav() {
  return (
    <nav>
      <div className="container mx-auto">
        <div className="flex items-center justify-between py-2">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center">
              <Image
                src="/logo/logo_resized.png"
                alt="HBOT Logo"
                width={100}
                height={75}
                priority
                className="h-auto w-auto"
              />
            </Link>
            <div className="hidden max-w-sm items-center gap-2 sm:flex">
              <Input
                type="search"
                placeholder="Search for something"
                className="w-[300px]"
              />
              <Button variant="ghost" size="icon">
                <Search className="h-4 w-4" />
                <span className="sr-only">Search</span>
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button
              variant="default"
              className="bg-emerald-700 hover:bg-emerald-800"
            >
              Subscribe
            </Button>
            <Button
              variant="outline"
              className="hidden border-emerald-700 text-emerald-700 sm:inline-flex"
            >
              Shop Chambers
            </Button>
            <LoginButton />
          </div>
        </div>
      </div>
    </nav>
  );
}
