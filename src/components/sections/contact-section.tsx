import { ArrowTopRightIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import React from "react";

import CallToAction from "./call-to-action";

const ContactSection = () => {
  return (
    <div className="bg-custom-bg py-12 text-black">
      <div className="mx-auto flex items-center justify-start px-4 pb-16">
        <Link
          href="/contact"
          className="flex items-center space-x-2 hover:text-orange-500"
        >
          <h2 className="text-6xl font-bold">LET&rsquo;S TALK</h2>
          <ArrowTopRightIcon className="h-24 w-24" />
        </Link>
      </div>
      <CallToAction />
    </div>
  );
};

export default ContactSection;
