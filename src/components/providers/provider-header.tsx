import Image from "next/image";

export function ProviderHeader() {
  return (
    <div className="relative h-[350px] w-full overflow-hidden">
      <Image
        src="/images/banners/provider-banner.png"
        alt="Hyperbaric Chamber Providers"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-black/20" />
      <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
        <h1 className="max-w-8xl font-['Raleway'] text-4xl font-bold tracking-wider text-white sm:text-5xl md:text-6xl">
          FIND WELLNESS PROVIDERS
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-white/90 sm:text-xl">
          Discover hyperbaric chambers and wellness providers in your area
        </p>
      </div>
    </div>
  );
}
