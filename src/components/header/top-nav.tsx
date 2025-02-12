"use client";

import type { User } from "@supabase/supabase-js";
import {
  Search,
  UserCircle,
  CalendarIcon,
  SearchIcon,
  UsersIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { useFormStatus } from "react-dom";
import { signout } from "~/app/(auth)/auth/login/action";

import LoginButton from "~/components/auth/LoginButton";
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
import { useStudySearch } from "~/hooks/use-study-search";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "~/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { useDebounce } from "~/hooks/use-debounce";
import { HighlightedText } from "~/components/ui/highlighted-text";

export function TopNav() {
  const [user, setUser] = useState<User | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const supabase = createClient();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const { studies, isLoading } = useStudySearch(debouncedSearchTerm);
  const inputRef = useRef<HTMLInputElement>(null);

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

  useEffect(() => {
    if (debouncedSearchTerm) {
      setOpen(true);
    }
  }, [debouncedSearchTerm]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
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
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <div className="relative w-full">
                    <Input
                      ref={inputRef}
                      type="search"
                      value={searchTerm}
                      onChange={handleSearch}
                      onFocus={() => {
                        if (searchTerm.length > 0) {
                          setOpen(true);
                        }
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "ArrowUp" || e.key === "ArrowDown") {
                          e.preventDefault();
                        }
                      }}
                      placeholder="Search studies..."
                      className={cn(
                        "w-[300px] transition-all duration-200",
                        isScrolled ? "h-7 text-xs" : "h-8 text-sm",
                      )}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size={isScrolled ? "sm" : "default"}
                      className="absolute right-0 transition-all duration-200"
                      onClick={() => inputRef.current?.focus()}
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
                </PopoverTrigger>
                <PopoverContent
                  className="w-[450px] p-0"
                  align="start"
                  side="bottom"
                  sideOffset={5}
                  onOpenAutoFocus={(e) => {
                    e.preventDefault();
                  }}
                  onCloseAutoFocus={(e) => {
                    e.preventDefault();
                  }}
                >
                  <Command shouldFilter={false}>
                    <CommandList>
                      <CommandEmpty>
                        {isLoading ? (
                          <div className="flex items-center justify-center p-4">
                            <span className="text-sm text-muted-foreground">
                              Searching...
                            </span>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center justify-center p-4 text-sm text-muted-foreground">
                            <SearchIcon className="mb-2 h-10 w-10 text-muted-foreground/50" />
                            <p>No studies found</p>
                          </div>
                        )}
                      </CommandEmpty>
                      <CommandGroup heading="Search Results">
                        {studies.map((study) => (
                          <CommandItem
                            key={study.id}
                            onSelect={() => {
                              router.push(`/research/${study.id}`);
                              setOpen(false);
                              setSearchTerm("");
                            }}
                            className="px-4 py-3"
                          >
                            <div className="flex flex-col gap-1">
                              <h4 className="font-medium text-foreground">
                                <HighlightedText
                                  text={study.heading}
                                  highlight={searchTerm}
                                />
                              </h4>
                              <p className="line-clamp-2 text-sm text-muted-foreground">
                                <HighlightedText
                                  text={study.summary}
                                  highlight={searchTerm}
                                />
                              </p>
                              <div className="mt-1 flex flex-wrap items-center gap-3 text-xs">
                                <div className="flex items-center gap-1 text-muted-foreground">
                                  <UsersIcon className="h-3 w-3" />
                                  <HighlightedText
                                    text={study.authors}
                                    highlight={searchTerm}
                                    className="max-w-[200px] truncate"
                                  />
                                </div>
                                <div className="flex items-center gap-1 text-muted-foreground">
                                  <CalendarIcon className="h-3 w-3" />
                                  <span>
                                    {formatDate(study.published_date)}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs text-emerald-700">
                                    {study.pressure_used} ATA
                                  </span>
                                  <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs text-blue-700">
                                    {study.number_of_treatments} treatments
                                  </span>
                                  <span className="rounded-full bg-purple-100 px-2 py-0.5 text-xs text-purple-700">
                                    {study.outcome_rating}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </CommandItem>
                        ))}
                      </CommandGroup>
                      {studies.length > 0 && (
                        <div className="border-t p-2 text-center text-xs text-muted-foreground">
                          Press Enter to view full study details
                        </div>
                      )}
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
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
                <Input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  required
                />
                <SubmitButton />
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
                    <Link href="/auth/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/saved-articles">Saved Articles</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/my-articles">My Articles</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => signout()}>
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
