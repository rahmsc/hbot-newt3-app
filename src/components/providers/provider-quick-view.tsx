"use client";

import Image from "next/image";
import {
  Clock,
  MapPin,
  Phone,
  Star,
  X,
  Globe,
  Mail,
  Calendar,
} from "lucide-react";
import { useState, useEffect } from "react";
import type { Provider } from "~/types/providers";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "~/components/ui/dialog";
import GlowingButton from "../utils/glowing-button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "~/components/ui/carousel";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { fetchPlaceDetails } from "~/actions/fetch-place-photos";

interface ProviderQuickViewProps {
  isOpen: boolean;
  onClose: () => void;
  provider: Provider;
}

type DayOfWeek =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

interface OpeningHoursData {
  isOpen: boolean;
  openTime?: string;
  closeTime?: string;
}

type OpeningHoursType = Record<DayOfWeek, OpeningHoursData>;

function getProxiedImageUrl(originalUrl: string): string {
  const proxiedUrl = `/api/proxy-image?url=${encodeURIComponent(originalUrl)}`;
  return proxiedUrl;
}

function OpeningHours({ hours }: { hours: string }) {
  const [openingHours, setOpeningHours] = useState<OpeningHoursType | null>(
    null,
  );
  const daysOrder: DayOfWeek[] = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ];

  useEffect(() => {
    try {
      const parsedHours = JSON.parse(hours) as OpeningHoursType;
      setOpeningHours(parsedHours);
    } catch (e) {
      // Failed to parse opening hours
    }
  }, [hours]);

  if (!openingHours) return null;

  const getCurrentDay = (): DayOfWeek => {
    const days: DayOfWeek[] = [
      "sunday",
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
    ];
    return days[new Date().getDay()];
  };

  const today = getCurrentDay();

  return (
    <div className="w-full space-y-0.5 font-mono text-xs">
      {daysOrder.map((day) => {
        const dayData = openingHours[day];
        const isToday = today === day;

        return (
          <div
            key={day}
            className={`flex items-center py-0.5 ${
              isToday ? "font-medium text-[#2B5741]" : "text-gray-600"
            }`}
          >
            <span className="mr-2 w-[40px] capitalize">{day.slice(0, 3)}</span>
            <span
              className={`${dayData.isOpen ? "text-gray-900" : "text-gray-500"}`}
            >
              {dayData.isOpen
                ? `${dayData.openTime} - ${dayData.closeTime}`
                : "Closed"}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export function ProviderQuickView({
  isOpen,
  onClose,
  provider,
}: ProviderQuickViewProps) {
  const [enhancedProvider, setEnhancedProvider] = useState<Provider>(provider);
  const [isLoading, setIsLoading] = useState(false);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(1);

  // Reference to the carousel API
  const [api, setApi] = useState<CarouselApi | null>(null);

  // Setup event listeners for the carousel to track current slide
  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setCurrentSlideIndex(api.selectedScrollSnap() + 1);
    };

    api.on("select", onSelect);
    api.on("reInit", onSelect);

    // Initialize with first slide
    onSelect();

    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  // Fetch Google place details when the QuickView opens
  useEffect(() => {
    const fetchProviderDetails = async () => {
      if (isOpen && provider) {
        setIsLoading(true);
        try {
          // Only fetch Google details if we don't already have them
          if (!provider.googlePhotos) {
            const result = await fetchPlaceDetails(provider);
            if (result.googlePhotos?.length || result.googleRating) {
              setEnhancedProvider(result);
            } else {
              setEnhancedProvider(provider);
            }
          } else {
            setEnhancedProvider(provider);
          }
        } catch (error) {
          setEnhancedProvider(provider);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchProviderDetails();
  }, [isOpen, provider]);

  // Check if we have Google photos available
  const hasGooglePhotos =
    enhancedProvider.googlePhotos && enhancedProvider.googlePhotos.length > 0;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[80vh] max-w-4xl overflow-hidden p-0">
        <DialogTitle className="sr-only">
          {enhancedProvider.name} Details
        </DialogTitle>
        <DialogDescription className="sr-only">
          View details and book appointments with {enhancedProvider.name}
        </DialogDescription>
        <div className="flex max-h-[80vh] flex-col md:flex-row">
          {/* Image Section - Modified for landscape images */}
          <div className="relative flex w-full shrink-0 items-center justify-center md:w-[50%]">
            {isLoading ? (
              <div className="flex h-[250px] w-full items-center justify-center md:h-[350px]">
                <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-gray-900" />
              </div>
            ) : hasGooglePhotos ? (
              <Carousel className="w-full" setApi={setApi}>
                <CarouselContent>
                  {enhancedProvider.googlePhotos?.map((photo, index) => (
                    <CarouselItem key={`photo-${enhancedProvider.id}-${index}`}>
                      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl">
                        <Image
                          src={getProxiedImageUrl(photo)}
                          alt={`${enhancedProvider.name} photo ${index + 1}`}
                          fill
                          priority={index === 0}
                          className="scale-110 object-cover"
                          sizes="(max-width: 768px) 100vw, 50vw"
                          onError={(e) => {
                            e.currentTarget.src = "/placeholder.svg";
                          }}
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-2 z-10" />
                <CarouselNext className="right-2 z-10" />
                {/* Image Counter Indicator */}
                {enhancedProvider.googlePhotos &&
                  enhancedProvider.googlePhotos.length > 1 && (
                    <div className="absolute bottom-2 left-1/2 z-10 -translate-x-1/2 rounded-full bg-black/60 px-2 py-1 text-xs text-white">
                      <span className="flex items-center justify-center gap-1">
                        <span className="text-xs font-medium">
                          {currentSlideIndex}
                        </span>
                        <span>/</span>
                        <span className="text-xs">
                          {enhancedProvider.googlePhotos.length}
                        </span>
                      </span>
                    </div>
                  )}
              </Carousel>
            ) : (
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl">
                <Image
                  src={enhancedProvider.image || "/placeholder.svg"}
                  alt={`${enhancedProvider.name} image`}
                  fill
                  priority
                  className="scale-110 object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "/placeholder.svg";
                  }}
                />
              </div>
            )}
          </div>

          {/* Content Section - Improved layout */}
          <div className="flex w-full flex-1 flex-col overflow-y-auto md:max-h-[80vh]">
            <div className="flex h-full flex-1 flex-col justify-between p-6">
              <div className="space-y-4">
                {/* Header */}
                <div>
                  <div className="flex items-start justify-between">
                    <div>
                      <h2 className="font-['Raleway'] text-3xl font-light tracking-wide text-gray-900">
                        {enhancedProvider.name}
                      </h2>
                      <div className="mt-2 flex items-center gap-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={`star-${enhancedProvider.id}-${i}`}
                              className={`h-4 w-4 ${
                                i <
                                (enhancedProvider.googleRating ??
                                  enhancedProvider.rating)
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "fill-gray-300 text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="font-semibold text-gray-900">
                          {enhancedProvider.googleRating?.toFixed(1) ??
                            enhancedProvider.rating.toFixed(1)}
                        </span>
                        {enhancedProvider.googleRatingsTotal ? (
                          <span className="text-sm text-gray-500">
                            ({enhancedProvider.googleRatingsTotal} reviews)
                          </span>
                        ) : (
                          <span className="text-sm text-gray-500">
                            ({enhancedProvider.reviewCount} reviews)
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {enhancedProvider.website && (
                        <button
                          type="button"
                          onClick={() =>
                            window.open(enhancedProvider.website, "_blank")
                          }
                          className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-colors hover:bg-gray-200"
                          aria-label="Visit website"
                        >
                          <Globe className="h-5 w-5" />
                        </button>
                      )}
                      {enhancedProvider.email && (
                        <Popover>
                          <PopoverTrigger asChild>
                            <button
                              type="button"
                              className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-colors hover:bg-gray-200"
                              aria-label="View email"
                            >
                              <Mail className="h-5 w-5" />
                            </button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-3">
                            <div className="space-y-2">
                              <p className="text-sm font-medium text-gray-700">
                                Email address:
                              </p>
                              <div className="flex items-center gap-2">
                                <input
                                  type="text"
                                  readOnly
                                  value={enhancedProvider.email}
                                  className="w-full rounded border border-gray-200 p-2 text-sm"
                                  onClick={(e) => e.currentTarget.select()}
                                />
                                <button
                                  type="button"
                                  onClick={() => {
                                    const mailtoLink = `mailto:${enhancedProvider.email}`;
                                    window.location.href = mailtoLink;
                                  }}
                                  className="rounded bg-gray-100 p-2 text-gray-600 hover:bg-gray-200"
                                  aria-label="Send email"
                                >
                                  <Mail className="h-4 w-4" />
                                </button>
                              </div>
                            </div>
                          </PopoverContent>
                        </Popover>
                      )}
                      {enhancedProvider.phone && (
                        <Popover>
                          <PopoverTrigger asChild>
                            <button
                              type="button"
                              className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-colors hover:bg-gray-200"
                              aria-label="View phone number"
                            >
                              <Phone className="h-5 w-5" />
                            </button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-3">
                            <div className="space-y-2">
                              <p className="text-sm font-medium text-gray-700">
                                Phone number:
                              </p>
                              <div className="flex items-center gap-2">
                                <input
                                  type="text"
                                  readOnly
                                  value={enhancedProvider.phone}
                                  className="w-full rounded border border-gray-200 p-2 text-sm"
                                  onClick={(e) => e.currentTarget.select()}
                                />
                                <button
                                  type="button"
                                  onClick={() => {
                                    if (enhancedProvider.phone) {
                                      window.location.href = `tel:${enhancedProvider.phone.replace(/\D/g, "")}`;
                                    }
                                  }}
                                  className="rounded bg-gray-100 p-2 text-gray-600 hover:bg-gray-200"
                                  aria-label="Call phone number"
                                >
                                  <Phone className="h-4 w-4" />
                                </button>
                              </div>
                            </div>
                          </PopoverContent>
                        </Popover>
                      )}
                    </div>
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-4">
                  {(enhancedProvider.googleFormattedAddress ??
                    enhancedProvider.location) && (
                    <div className="flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-gray-400" />
                      <button
                        type="button"
                        onClick={() => {
                          const address =
                            enhancedProvider.googleFormattedAddress ??
                            enhancedProvider.location;
                          const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address ?? "")}`;
                          window.open(googleMapsUrl, "_blank");
                        }}
                        className="text-left text-gray-600 underline-offset-2 hover:underline"
                      >
                        {enhancedProvider.googleFormattedAddress ??
                          enhancedProvider.location}
                      </button>
                    </div>
                  )}
                  {enhancedProvider.nextAvailable && (
                    <div className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-gray-400" />
                      <span className="text-gray-600">
                        Next Available: {enhancedProvider.nextAvailable}
                      </span>
                    </div>
                  )}
                  {enhancedProvider.hours && (
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Clock className="h-5 w-5 text-gray-400" />
                        <span className="text-sm font-medium">
                          Opening Hours
                        </span>
                      </div>
                      <div className="ml-7">
                        <OpeningHours hours={enhancedProvider.hours} />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Booking Button - Fixed at bottom */}
              <div className="mt-6 pt-4">
                <GlowingButton
                  text="Book Appointment"
                  onClick={() => {
                    // Add fallback chain for booking link
                    const bookingUrl =
                      enhancedProvider.booking_link ??
                      enhancedProvider.bookingLink ??
                      enhancedProvider.website;

                    window.open(bookingUrl, "_blank");
                  }}
                  className="w-full py-4"
                />
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
