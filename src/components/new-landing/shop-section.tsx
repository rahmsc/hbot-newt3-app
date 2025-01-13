"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import TitlePill from "~/components/new-landing/components/title-pill";
import { cn } from "~/lib/utils";

import ProductCard from "./components/shop/product-card";

type TabType = "chambers" | "products";

export default function ShopSection() {
  const [activeTab, setActiveTab] = useState<TabType>("chambers");

  const chambers = [
    {
      title: "Lay Down Hard Shell",
      type: "Hardshell",
      maxPressure: "2.0 ATA",
      description:
        "Professional-grade hyperbaric chamber with advanced pressure control and safety features. Ideal for clinical settings.",
      features: ["Mono-piece", "Digital Controls", "BIB System"],
      imageUrl: "/images/chambers/hardshell-chamber.jpg",
    },
    {
      title: "Sit Up Hard Shell",
      type: "Hardshell",
      maxPressure: "2.4 ATA",
      description:
        "Vertical design hyperbaric chamber perfect for facilities with limited space. Features advanced monitoring systems.",
      features: ["Space-saving", "Multi-display", "Emergency Protocol"],
      imageUrl: "/images/chambers/situp-chamber.jpg",
    },
    {
      title: "Multi-Place Chamber",
      type: "Hardshell",
      maxPressure: "3.0 ATA",
      description:
        "Large capacity chamber designed for multiple simultaneous treatments. Ideal for hospitals and large clinics.",
      features: ["Multiple Seats", "Advanced Monitoring", "Medical Grade"],
      imageUrl: "/images/chambers/multiplace-chamber.jpg",
    },
    {
      title: "Portable Soft Chamber",
      type: "Softshell",
      maxPressure: "1.3 ATA",
      description:
        "Lightweight and portable hyperbaric chamber perfect for home use or mobile clinics. Easy setup and operation.",
      features: ["Portable", "Quick Setup", "Safety Locks"],
      imageUrl: "/images/chambers/portable-chamber.jpg",
    },
    {
      title: "Premium Monoplace",
      type: "Hardshell",
      maxPressure: "2.5 ATA",
      description:
        "High-end single-person chamber with premium features and comfort. Includes entertainment system and climate control.",
      features: ["Entertainment System", "Climate Control", "Premium Interior"],
      imageUrl: "/images/chambers/premium-chamber.jpg",
    },
    {
      title: "Veterinary Chamber",
      type: "Hardshell",
      maxPressure: "2.2 ATA",
      description:
        "Specially designed chamber for veterinary use with adapted controls and safety features for animal patients.",
      features: ["Pet Friendly", "Easy Access", "Noise Reduction"],
      imageUrl: "/images/chambers/vet-chamber.jpg",
    },
  ];

  const products = [
    {
      title: "Pro Oxygen Concentrator",
      type: "Equipment",
      maxPressure: "N/A",
      description:
        "Medical-grade oxygen concentrator with high flow rate and continuous operation capability. Perfect for professional use.",
      features: ["10L Flow", "Low Noise", "24/7 Operation"],
      imageUrl: "/images/products/concentrator.jpg",
    },
    {
      title: "Chamber Monitoring System",
      type: "Electronics",
      maxPressure: "N/A",
      description:
        "Advanced digital monitoring system for tracking pressure, oxygen levels, and treatment duration with cloud connectivity.",
      features: ["Cloud Connected", "Real-time Monitoring", "Data Analytics"],
      imageUrl: "/images/products/monitoring.jpg",
    },
    {
      title: "Safety Kit Pro",
      type: "Safety",
      maxPressure: "N/A",
      description:
        "Comprehensive safety kit including emergency oxygen, first aid supplies, and safety protocols for hyperbaric facilities.",
      features: ["Emergency Ready", "Complete Set", "Regular Updates"],
      imageUrl: "/images/products/safety-kit.jpg",
    },
  ];

  return (
    <section className="container mx-auto px-4 py-12">
      <TitlePill>
        {activeTab === "chambers" ? "Shop Chambers" : "Shop Products"}
      </TitlePill>

      <div className="mb-8 flex items-center justify-between">
        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => setActiveTab("chambers")}
            className={cn(
              "relative rounded-full px-6 py-2 text-lg font-medium transition-all duration-200",
              activeTab === "chambers"
                ? "bg-gray-100 text-gray-900"
                : "text-gray-500 hover:text-gray-900",
            )}
          >
            Shop Chambers
            {activeTab === "chambers" && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-black" />
            )}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("products")}
            className={cn(
              "relative rounded-full px-6 py-2 text-lg font-medium transition-all duration-200",
              activeTab === "products"
                ? "bg-gray-100 text-gray-900"
                : "text-gray-500 hover:text-gray-900",
            )}
          >
            Shop Products
            {activeTab === "products" && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-black" />
            )}
          </button>
        </div>
        <Link
          href="/filter"
          className="flex items-center gap-2 rounded-full bg-gray-100 px-6 py-3 text-sm font-medium transition-all duration-200 hover:bg-gray-200"
        >
          Filter
          <ChevronRight className="h-4 w-4" />
        </Link>
      </div>

      <p className="mb-8 text-gray-600">
        Find the perfect {activeTab === "chambers" ? "chamber" : "product"} for
        your needs
      </p>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {(activeTab === "chambers" ? chambers : products).map((item) => (
          <ProductCard key={item.title} {...item} />
        ))}
      </div>
    </section>
  );
}
