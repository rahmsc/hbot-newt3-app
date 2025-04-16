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
import { Dialog, DialogContent } from "~/components/ui/dialog";
import GlowingButton from "../utils/glowing-button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
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
      if (e instanceof Error) {
        console.error("Failed to parse opening hours:", e.message);
      }
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

  // Fetch Google place details when the QuickView opens
  useEffect(() => {
    const fetchProviderDetails = async () => {
      if (isOpen && provider) {
        setIsLoading(true);
        try {
          console.log(`QuickView opened for provider: ${provider.name}`);
          console.log(
            "Complete provider data:",
            JSON.stringify(provider, null, 2),
          );
          console.log("Provider data summary:", {
            id: provider.id,
            name: provider.name,
            hasPhotos: !!provider.googlePhotos?.length,
            image: provider.image,
            booking_link: provider.booking_link,
            bookingLink: provider.bookingLink,
            website: provider.website,
          });

          // Only fetch Google details if we don't already have them
          if (!provider.googlePhotos) {
            console.log("Fetching Google place details for quick view...");
            const result = await fetchPlaceDetails(provider);
            console.log("Raw result from fetchPlaceDetails:", result);

            if (result.googlePhotos?.length || result.googleRating) {
              console.log(`Found Google details for provider: 
                - Photos: ${result.googlePhotos?.length ?? 0}
                - Rating: ${result.googleRating ?? "N/A"}
                - Reviews: ${result.googleRatingsTotal ?? 0}
                - First Photo URL: ${result.googlePhotos?.[0] ?? "None"}
                - Booking Link: ${result.booking_link ?? "None"}
              `);
              setEnhancedProvider(result);
            } else {
              console.log(
                "No Google details found, using original provider data",
              );
              setEnhancedProvider(provider);
            }
          } else {
            console.log(
              `Provider already has Google photos: ${provider.googlePhotos.length}`,
            );
            setEnhancedProvider(provider);
          }
        } catch (error) {
          console.error("Error fetching place details:", error);
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

  console.log("Enhanced provider data:", {
    hasGooglePhotos,
    photosCount: enhancedProvider.googlePhotos?.length ?? 0,
    fallbackImage: enhancedProvider.image || "/placeholder.svg",
    booking_link: enhancedProvider.booking_link,
    bookingLink: enhancedProvider.bookingLink,
    website: enhancedProvider.website,
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[80vh] max-w-4xl overflow-hidden p-0">
        <div className="flex max-h-[80vh] flex-col md:flex-row">
          {/* Image Section */}
          <div className="relative flex h-[250px] w-full shrink-0 items-center justify-center overflow-hidden bg-gray-50 md:h-[80vh] md:max-h-[600px] md:w-[45%]">
            {isLoading ? (
              <div className="flex h-full w-full items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-gray-900" />
              </div>
            ) : hasGooglePhotos ? (
              <Carousel className="h-full w-full">
                <CarouselContent className="h-full">
                  {enhancedProvider.googlePhotos?.map((photo, index) => (
                    <CarouselItem
                      key={`photo-${enhancedProvider.id}-${index}`}
                      className="h-full"
                    >
                      <div className="relative h-full w-full">
                        <Image
                          src={photo}
                          alt={`${enhancedProvider.name} photo ${index + 1}`}
                          fill
                          priority={index === 0}
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 45vw"
                          onError={(e) => {
                            console.error(
                              `Failed to load image ${index}:`,
                              photo,
                            );
                            e.currentTarget.src = "/placeholder.svg";
                          }}
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-2 z-10" />
                <CarouselNext className="right-2 z-10" />
              </Carousel>
            ) : (
              <div className="relative h-full w-full">
                <Image
                  src={enhancedProvider.image || "/placeholder.svg"}
                  alt={`${enhancedProvider.name} image`}
                  fill
                  priority
                  className="object-cover"
                  onError={(e) => {
                    console.error("Failed to load fallback image");
                    e.currentTarget.src = "/placeholder.svg";
                  }}
                />
              </div>
            )}
          </div>

          {/* Content Section - This is the scrollable area */}
          <div className="flex h-[calc(80vh-256px)] w-full flex-1 flex-col overflow-y-auto md:h-[80vh]">
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
              <div className="mb-4 pt-4">
                <GlowingButton
                  text="Book Appointment"
                  onClick={() => {
                    // Add fallback chain for booking link with debugging
                    const bookingUrl =
                      enhancedProvider.booking_link ??
                      enhancedProvider.bookingLink ??
                      enhancedProvider.website;

                    console.log(`Opening booking URL: ${bookingUrl}`);
                    console.log("Booking sources:", {
                      booking_link: enhancedProvider.booking_link,
                      bookingLink: enhancedProvider.bookingLink,
                      website: enhancedProvider.website,
                      final: bookingUrl,
                    });

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
