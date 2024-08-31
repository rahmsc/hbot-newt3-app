import React from "react";

import { InstagramLogoIcon, TwitterLogoIcon } from "@radix-ui/react-icons";

const Footer = () => {
  return (
    <footer className="bg-custom-bg mb-12 py-12 text-black">
      <div className="mb-8 border-t border-gray-300" />
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Column 1: Logo and Reserved Rights */}
          <div className="flex flex-col items-start">
            <h1>Logo</h1>
            <p className="mt-4 text-sm text-gray-600">
              &copy;2024 ib-themes. All Rights Reserved.
            </p>
          </div>

          {/* Column 2: Links */}
          <div className="flex flex-col space-y-2">
            <a href="/faqs" className="hover:underline">
              FAQs
            </a>
            <a href="/terms" className="hover:underline">
              Terms & Conditions
            </a>
            <a href="/privacy" className="hover:underline">
              Privacy Policy
            </a>
            <a href="/help" className="hover:underline">
              Help
            </a>
          </div>

          {/* Column 3: Links */}
          <div className="flex flex-col space-y-2">
            <a href="/works" className="hover:underline">
              Works
            </a>
            <a href="/studio" className="hover:underline">
              Studio
            </a>
            <a href="/news" className="hover:underline">
              News
            </a>
          </div>

          {/* Column 4: Contact Info and Social Links */}
          <div className="flex flex-col space-y-2">
            <a
              href="mailto:hello@moonex.co"
              className="text-lg font-semibold hover:underline"
            >
              hello@moonex.co
            </a>
            <p className="text-gray-600">
              90 Fairground Rd, FL 3290, United States
            </p>
            <div className="my-4 flex space-x-4">
              <a href="www.x.com" className="text-gray-600 hover:text-black">
                <InstagramLogoIcon />
              </a>
              <a
                href="www.instagram.com"
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
