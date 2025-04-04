"use client";

import type React from "react";

import type { User } from "@supabase/supabase-js";
import {
  Search,
  UserCircle,
  CalendarIcon,
  SearchIcon,
  UsersIcon,
  X,
  LogOut,
  ShoppingCart,
  Mail,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
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
import { useToast } from "~/hooks/use-toast";
import { subscribeToNewsletter } from "~/actions/subscribe";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { sendGAEvent } from "@next/third-parties/google";

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
});

export function TopNav() {
  const [user, setUser] = useState<User | null>(null);
  const [profileData, setProfileData] = useState<{ avatar_url: string | null }>(
    { avatar_url: null },
  );
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const supabase = createClient();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const { studies, isLoading: isStudiesLoading } =
    useStudySearch(debouncedSearchTerm);
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const [isSupabaseLoading, setIsSupabaseLoading] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

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

  useEffect(() => {
    const fetchProfileData = async (userId: string) => {
      try {
        const { data: profile, error } = await supabase
          .from("profiles")
          .select("avatar_url")
          .eq("id", userId)
          .single();

        if (error) {
          console.error("Error fetching profile:", error);
          return;
        }

        if (profile) {
          setProfileData(profile);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    if (user?.id) {
      void fetchProfileData(user.id);
    }
  }, [user?.id, supabase]);

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

  const handleMobileSearchClick = () => {
    setIsSearchExpanded(true);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSupabaseLoading(true);
    try {
      const formData = new FormData();
      formData.append("email", values.email);

      const result = await subscribeToNewsletter(null, formData);

      if (result.success) {
        toast({
          title: "Success!",
          description: result.message,
        });
        form.reset();
      } else {
        toast({
          title: "Error",
          description: result.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSupabaseLoading(false);
    }

    sendGAEvent("event_top", "buttonClicked", {
      value: "Subscribe(HQ Insider)",
    });
  }

  const SearchResults = () => (
    <Command shouldFilter={false}>
      <CommandList>
        <CommandEmpty>
          {isStudiesLoading ? (
            <div className="flex items-center justify-center p-4">
              <span className="text-sm text-muted-foreground">
                Searching...
              </span>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center p-6 text-sm text-muted-foreground">
              <SearchIcon className="mb-2 h-10 w-10 text-muted-foreground/50" />
              <p>No studies found</p>
            </div>
          )}
        </CommandEmpty>
        <CommandGroup heading="Search Results">
          {studies.map((study, index) => {
            const imageUrl =
              "https://hbothq-bucket.s3.ap-southeast-2.amazonaws.com/research-articles/";
            return (
              <CommandItem
                key={study.id}
                onSelect={() => {
                  router.push(`/research/${study.id}`);
                  setOpen(false);
                  setSearchTerm("");
                  setIsSearchExpanded(false);
                }}
                className={cn(
                  "px-4 py-3",
                  index % 2 === 0 ? "bg-white" : "bg-gray-100",
                )}
              >
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <Image
                      src={`${imageUrl}${study.id}.png`}
                      alt={study.heading}
                      width={60}
                      height={60}
                      className="h-[60px] w-[60px] rounded-md object-cover"
                    />
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col gap-1">
                    <h4 className="font-body">
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
                        <span>{formatDate(study.published_date)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="rounded-full bg-emerald-100 px-2 py-0.5 font-mono text-xs text-[#2B5741]">
                          {study.pressure_used}
                        </span>
                        <span className="rounded-full bg-orange-100 px-2 py-0.5 font-mono text-xs text-orange-400">
                          {study.number_of_treatments} treatments
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CommandItem>
            );
          })}
        </CommandGroup>
        {studies.length > 0 && (
          <div className="border-t p-2 text-center text-xs text-muted-foreground">
            Press Enter to view full study details
          </div>
        )}
      </CommandList>
    </Command>
  );

  return (
    <nav
      className={cn(
        "fixed left-0 right-0 top-0 z-[100] bg-white/80 backdrop-blur-md transition-all duration-200",
        isScrolled ? "h-12 shadow-md" : "h-16",
      )}
    >
      <div className="container mx-auto h-full">
        <div className="flex h-full items-center justify-between">
          <div
            className={cn(
              "flex items-center transition-all duration-200",
              isSearchExpanded ? "hidden sm:flex" : "flex",
            )}
          >
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
          </div>

          {/* Desktop Search */}
          {!isSearchExpanded && (
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
                        "w-[300px] pr-8 transition-all duration-200",
                        isScrolled ? "h-7 text-xs" : "h-8 text-sm",
                      )}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size={isScrolled ? "sm" : "default"}
                      className="absolute right-0 top-1/2 -translate-y-1/2 transition-all duration-200"
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
                {open && !isSearchExpanded && (
                  <PopoverContent
                    className="z-[101] w-[450px] p-0"
                    align="start"
                    side="bottom"
                    sideOffset={5}
                    onOpenAutoFocus={(e) => e.preventDefault()}
                    onCloseAutoFocus={(e) => e.preventDefault()}
                  >
                    <SearchResults />
                  </PopoverContent>
                )}
              </Popover>
            </div>
          )}

          {/* Mobile Search */}
          {isSearchExpanded && (
            <div className="fixed inset-x-0 top-0 z-[100] bg-white/80 backdrop-blur-md transition-all duration-200 sm:hidden">
              <div className="container mx-auto p-4">
                <div className="relative">
                  <Input
                    ref={inputRef}
                    type="search"
                    value={searchTerm}
                    onChange={handleSearch}
                    onBlur={() => {
                      if (!searchTerm && !open) {
                        setIsSearchExpanded(false);
                      }
                    }}
                    placeholder="Search studies..."
                    className="w-full pr-12"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-1/2 -translate-y-1/2"
                    onClick={() => {
                      setSearchTerm("");
                      setIsSearchExpanded(false);
                      setOpen(false);
                    }}
                  >
                    <X className="h-4 w-4" />
                    <span className="sr-only">Clear search</span>
                  </Button>
                </div>

                {/* Mobile Search Results */}
                {open && isSearchExpanded && (
                  <div className="fixed inset-x-0 top-[72px] z-[101] max-h-[calc(100vh-72px)] overflow-y-auto bg-white shadow-lg">
                    <SearchResults />
                  </div>
                )}
              </div>
            </div>
          )}

          <div
            className={cn(
              "flex items-center gap-2 transition-all duration-200",
              isSearchExpanded ? "hidden sm:flex" : "flex",
            )}
          >
            {/* Mobile Search Button */}
            <Button
              variant="ghost"
              size={isScrolled ? "sm" : "default"}
              className="sm:hidden"
              onClick={handleMobileSearchClick}
            >
              <Search
                className={cn(
                  "transition-all duration-200",
                  isScrolled ? "h-3 w-3" : "h-4 w-4",
                )}
              />
              <span className="sr-only">Search</span>
            </Button>

            {/* Desktop Buttons */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="default"
                  className={cn(
                    "hidden bg-[#2B5741] transition-all duration-200 hover:bg-emerald-800 md:inline-flex",
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
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <Input
                    type="email"
                    {...form.register("email")}
                    placeholder="Enter your email"
                    required
                  />
                  <Button type="submit" disabled={isSupabaseLoading}>
                    {isSupabaseLoading ? "Subscribing..." : "Subscribe"}
                  </Button>
                </form>
              </DialogContent>
            </Dialog>

            <Button
              variant="outline"
              className={cn(
                "hidden border-[#2B5741] text-[#2B5741] transition-all duration-200 md:inline-flex",
                isScrolled ? "h-7 text-xs" : "h-8 text-sm",
              )}
              onClick={() => router.push("/chambers")}
            >
              Shop Chambers
            </Button>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className={cn(
                    "relative transition-all duration-200",
                    isScrolled ? "h-7 w-7 p-0" : "h-8 w-8 p-0",
                  )}
                >
                  {profileData.avatar_url || user?.user_metadata?.avatar_url ? (
                    <Image
                      src={
                        user?.user_metadata?.avatar_url || "/placeholder.svg"
                      }
                      alt="User avatar"
                      width={32}
                      height={32}
                      className="h-full w-full rounded-full object-cover"
                    />
                  ) : (
                    <UserCircle className="h-full w-full" />
                  )}
                  <span className="sr-only">Open menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                {user ? (
                  <>
                    <DropdownMenuItem asChild>
                      <Link href="/auth/profile" className="flex items-center">
                        <UserCircle className="mr-2 h-4 w-4" />
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => signout()}
                      className="flex items-center"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign Out
                    </DropdownMenuItem>
                  </>
                ) : (
                  <DropdownMenuItem asChild>
                    <LoginButton className="w-full" />
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem asChild>
                  <Link
                    href="/chambers"
                    className="flex items-center md:hidden"
                  >
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Shop Chambers
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setIsDialogOpen(true)}
                  className="flex items-center md:hidden"
                >
                  <Mail className="mr-2 h-4 w-4" />
                  Subscribe to Newsletter
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
}
