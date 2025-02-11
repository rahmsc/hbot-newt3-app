"use client";

import type { User } from "@supabase/supabase-js";
import { Search, UserCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";

import {
  subscribeToNewsletter,
  type SubscriptionState,
} from "~/actions/subscribe";
import { LoginButton } from "~/components/auth/LoginButton";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Input } from "~/components/ui/input";
import { cn } from "~/lib/utils";
import { createClient } from "~/utils/supabase/client";

export function TopNav() {
  const [user, setUser] = useState<User | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const supabase = createClient();
  const router = useRouter();
  const [state, formAction] = useFormState<SubscriptionState, FormData>(
    subscribeToNewsletter,
    null,
  );

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();
      if (!error && user) {
        setUser(user);
      }
    };

    void checkUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <nav
      className={cn(
        "fixed left-0 right-0 top-0 z-50 bg-white/80 backdrop-blur-md transition-all duration-200",
        isScrolled ? "h-12 shadow-md" : "h-16",
      )}
    >
      <div className="container mx-auto h-full">
        <div className="flex h-full items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center">
              <Image
                src="/logo/logo_resized.png"
                alt="HBOT Logo"
                width={isScrolled ? 60 : 80}
                height={isScrolled ? 45 : 60}
                priority
                className="h-auto w-auto transition-all duration-200"
              />
            </Link>
            <div className="hidden max-w-sm items-center gap-2 sm:flex">
              <Input
                type="search"
                placeholder="Search for something"
                className={cn(
                  "w-[300px] transition-all duration-200",
                  isScrolled ? "h-7 text-xs" : "h-8 text-sm",
                )}
              />
              <Button
                variant="ghost"
                size={isScrolled ? "sm" : "default"}
                className="transition-all duration-200"
              >
                <Search
                  className={cn(
                    "transition-all duration-200",
                    isScrolled ? "h-3 w-3" : "h-4 w-4",
                  )}
                />
                <span className="sr-only">Search</span>
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="default"
                  className={cn(
                    "bg-emerald-700 transition-all duration-200 hover:bg-emerald-800",
                    isScrolled ? "h-7 text-xs" : "h-8 text-sm",
                  )}
                >
                  Subscribe
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Subscribe to Our Newsletter</DialogTitle>
                  <DialogDescription>
                    Stay updated with our latest news and offers.
                  </DialogDescription>
                </DialogHeader>
                <form action={formAction} className="space-y-4">
                  <Input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    required
                  />
                  <SubmitButton />
                </form>
                {state && (
                  <p
                    className={
                      state.success ? "text-green-600" : "text-red-600"
                    }
                  >
                    {state.message}
                  </p>
                )}
              </DialogContent>
            </Dialog>
            <Button
              variant="outline"
              className={cn(
                "hidden border-emerald-700 text-emerald-700 transition-all duration-200 sm:inline-flex",
                isScrolled ? "h-7 text-xs" : "h-8 text-sm",
              )}
              onClick={() => router.push("/chambers")}
            >
              Shop Chambers
            </Button>

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className={cn(
                      "relative transition-all duration-200",
                      isScrolled ? "h-7 text-xs" : "h-8 text-sm",
                    )}
                  >
                    <UserCircle
                      className={cn(
                        "mr-2 transition-all duration-200",
                        isScrolled ? "h-3 w-3" : "h-4 w-4",
                      )}
                    />
                    {user.email?.split("@")[0]}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem asChild>
                    <Link href="/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/saved-articles">Saved Articles</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/my-articles">My Articles</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleSignOut}>
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <LoginButton />
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Subscribing..." : "Subscribe"}
    </Button>
  );
}
