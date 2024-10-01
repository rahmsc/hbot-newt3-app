import React from "react";

import { InstagramLogoIcon, TwitterLogoIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import Image from "next/image";
import logo from "../../../public/logo/LOGO.png";

const Footer = () => {
  return (
    <footer className="bg-custom-bg mb-12 py-12 text-black">
      <div className="mb-8 border-t border-gray-300" />
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
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
          <div className="flex flex-col space-y-2">
            <a href="/faqs" className="hover:underline">
              Get in Touch With Us
            </a>
          </div>

          {/* Column 3: Links */}
          <div className="flex flex-col space-y-2">
            <a href="/contact" className="hover:underline">
              Join HQ
            </a>
            <a href="/chambers" className="hover:underline">
              Chambers
            </a>
            <a href="/research" className="hover:underline">
              Research
            </a>
            <a href="/blog" className="hover:underline">
              Blog
            </a>
          </div>

          {/* Column 4: Contact Info and Social Links */}
          <div className="flex flex-col space-y-2">
            <a
              href="mailto:hello@moonex.co"
              className="text-lg font-semibold hover:underline"
            >
              hello@hyperbarichq.com
            </a>
            <div className="my-4 flex space-x-4">
              <a
                href="https://www.instagram.com/hyperbarichq/"
                className="text-gray-600 hover:text-black"
              >
                <InstagramLogoIcon />
              </a>
              <a
                href="https://www.x.com/HyperbaricHQ"
                className="text-gray-600 hover:text-black"
              >
                <TwitterLogoIcon />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
