import React from "react";
import Link from "next/link";
import { ArrowTopRightIcon } from "@radix-ui/react-icons";

const ContactSection = () => {
  return (
    <div className="bg-custom-bg py-12 text-black">
      <div className="mx-auto flex items-center justify-start px-4 pb-16">
        <Link
          href="/contact"
          className="flex items-center space-x-2 hover:opacity-60"
        >
          <h2 className="text-6xl font-bold">LET&rsquo;S TALK</h2>
          <ArrowTopRightIcon className="h-24 w-24 text-black" />
        </Link>
      </div>
    </div>
  );
};

export default ContactSection;
