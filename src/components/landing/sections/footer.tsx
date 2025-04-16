"use client";

import { InstagramLogoIcon, TwitterLogoIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

import logo from "../../../../public/logo/logo_resized.png";
import TikTokIcon from "../../../../public/logo/tiktok";
import { SpecialistContactForm } from "~/components/contact/specialist-contact-form";

const Footer = () => {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  return (
    <footer className="bg-custom-bg mb-12 py-12 text-black">
      <div className="mb-8 border-t border-gray-300" />
      <div className="container mx-auto px-4">
        {/* Desktop layout */}
        <div className="hidden md:grid md:grid-cols-4 md:gap-8">
          {/* Column 1: Logo and Reserved Rights */}
          <div className="flex flex-col items-start">
            <div className="flex items-center">
              <Link href="/">
                <Image src={logo} alt="Logo" width={150} height={50} />
              </Link>
            </div>
            <p className="mt-4 text-sm text-gray-600">
              &copy;2024 Hyperbaric HQ. All Rights Reserved.
            </p>
          </div>

          {/* Column 2: Links */}
          <div className="flex flex-col space-y-2 pt-4">
            <button
              type="button"
              onClick={() => setIsContactFormOpen(true)}
              className="text-left font-editors-note hover:underline"
            >
              Get in Touch With Us
            </button>
          </div>

          {/* Column 3: Links */}
          <div className="flex flex-col space-y-2 pt-4">
            <a href="/join-hq" className="font-editors-note hover:underline">
              Join HQ
            </a>
            <a href="/chambers" className="font-editors-note hover:underline">
              Chambers
            </a>
            <a href="/research" className="font-editors-note hover:underline">
              Research
            </a>
            <a href="/trending" className="font-editors-note hover:underline">
              Blog
            </a>
          </div>

          {/* Column 4: Contact Info and Social Links */}
          <div className="flex flex-col space-y-2 pt-4">
            <a
              href="mailto:breathebetter@hyperbarichq.com"
              className="text-lg font-semibold hover:underline"
            >
              breathebetter@hyperbarichq.com
            </a>
            <div className="my-4 flex space-x-4">
              <a
                href="https://www.instagram.com/hyperbarichq/"
                className="text-gray-800 hover:text-black"
              >
                <InstagramLogoIcon className="h-5 w-5" />
              </a>
              <a
                href="https://www.x.com/HyperbaricHQ"
                className="text-gray-800 hover:text-black"
              >
                <TwitterLogoIcon className="h-5 w-5" />
              </a>
              <a
                href="https://www.tiktok.com/@hyperbarichq"
                className="text-gray-800 hover:text-black"
              >
                <TikTokIcon className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Mobile layout */}
        <div className="flex flex-col items-center space-y-6 md:hidden">
          {/* Social Icons */}
          <div className="flex space-x-6">
            <a
              href="https://www.instagram.com/hyperbarichq/"
              className="text-gray-800 hover:text-black"
            >
              <InstagramLogoIcon className="h-6 w-6" />
            </a>
            <a
              href="https://www.x.com/HyperbaricHQ"
              className="text-gray-800 hover:text-black"
            >
              <TwitterLogoIcon className="h-6 w-6" />
            </a>
            <a
              href="https://www.tiktok.com/@hyperbarichq"
              className="text-gray-800 hover:text-black"
            >
              <TikTokIcon className="h-6 w-6" />
            </a>
          </div>

          {/* Links */}
          <div className="flex items-center">
            <Link href="/" className="hover:underline">
              Home
            </Link>
            <span className="mx-2 text-gray-400">|</span>
            <button
              type="button"
              onClick={() => setIsContactFormOpen(true)}
              className="hover:underline"
            >
              Contact Us
            </button>
            <span className="mx-2 text-gray-400">|</span>
            <Link href="/terms-and-conditions" className="hover:underline">
              Terms & Conditions
            </Link>
          </div>

          {/* Copyright */}
          <p className="text-sm text-gray-600">
            &copy;2024 Hyperbaric HQ. All Rights Reserved.
          </p>
        </div>
      </div>

      <SpecialistContactForm
        isOpen={isContactFormOpen}
        onClose={() => setIsContactFormOpen(false)}
      />
    </footer>
  );
};

export default Footer;
