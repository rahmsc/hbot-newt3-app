"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "~/components/ui/button";
import { EmailPopup } from "./email-popup";

export default function WhoWeAre() {
  const router = useRouter();
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleGuideButtonClick = () => {
    setIsPopupOpen(true);
  };

  const handlePopupClose = () => {
    setIsPopupOpen(false);
  };

  const handleEmailSubmit = async (email: string) => {
    try {
      const response = await fetch("/api/submit-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        console.log("Email sent successfully");
        // You can add a success message or additional logic here
      } else {
        console.error("Failed to send email");
        // You can add error handling logic here
      }
    } catch (error) {
      console.error("Error sending email:", error);
    }

    // Close the popup after submission
    setIsPopupOpen(false);
  };

  const handleContactButtonClick = () => {
    router.push("/contact");
  };

  return (
    <section className="bg-gray-100 py-20">
      <div className="container mx-auto max-w-3xl px-4 text-center">
        <h2 className="mb-10 text-4xl font-bold text-gray-800">Who We Are</h2>

        <div className="space-y-6 text-lg leading-relaxed text-gray-700">
          <p>I&apos;m Peter Frost, founder of HyperbaricHQ.</p>

          <p>
            As someone whose life has been changed for the better by Hyperbaric
            Oxygen Therapy, I have gone on to help dozens of people who have
            shared the same experience.
          </p>

          <p>
            I founded Hyperbaric HQ to build a team that is committed to expand
            accessibility of this therapy to help more people and change more
            lives.
          </p>
        </div>

        <div className="my-12 flex justify-center">
          <Image
            src="/placeholder.svg?height=400&width=600"
            alt="HBOT Chamber"
            width={600}
            height={400}
            className="rounded-lg shadow-lg"
          />
        </div>

        <h3 className="mb-10 text-3xl font-semibold text-gray-800">
          Ready to Transform Your Wellness Center with HBOT?
        </h3>

        <div className="space-y-10">
          <div className="rounded-lg bg-white p-8 shadow-md">
            <h4 className="mb-6 text-2xl font-bold text-gray-800">
              Download Your Free HBOT Implementation Guide
            </h4>
            <p className="mb-6 text-lg text-gray-700">Discover how to:</p>
            <ul className="mb-8 space-y-4 text-left text-lg text-gray-700">
              <li className="flex items-center">
                <span className="mr-3 text-2xl text-blue-500">•</span>
                Choose the right HBOT chamber for your center
              </li>
              <li className="flex items-center">
                <span className="mr-3 text-2xl text-blue-500">•</span>
                Implement HBOT safely and effectively
              </li>
              <li className="flex items-center">
                <span className="mr-3 text-2xl text-blue-500">•</span>
                Onboard and market HBOT to attract high-value clients
              </li>
            </ul>
            <Button className="w-full text-lg" onClick={handleGuideButtonClick}>
              Get Your Free HBOT Implementation Guide
            </Button>
          </div>

          <div className="rounded-lg bg-white p-8 shadow-md">
            <h4 className="mb-6 text-2xl font-bold text-gray-800">
              Book Your Free HBOT Consultation
            </h4>
            <p className="mb-6 text-lg text-gray-700">
              Speak with our HBOT specialists to:
            </p>
            <ul className="mb-8 space-y-4 text-left text-lg text-gray-700">
              <li className="flex items-center">
                <span className="mr-3 text-2xl text-blue-500">•</span>
                Assess if HBOT is right for your center
              </li>
              <li className="flex items-center">
                <span className="mr-3 text-2xl text-blue-500">•</span>
                Get a customized implementation plan
              </li>
              <li className="flex items-center">
                <span className="mr-3 text-2xl text-blue-500">•</span>
                Learn about financing options and ROI projections
              </li>
              <li className="flex items-center">
                <span className="mr-3 text-2xl text-blue-500">•</span>
                Have all your questions answered by industry experts
              </li>
            </ul>
            <Button
              className="w-full text-lg"
              onClick={handleContactButtonClick}
            >
              Get In Touch With Our Team
            </Button>
          </div>
        </div>

        <div className="mt-12 space-y-6 text-lg leading-relaxed text-gray-700">
          <p className="font-semibold">
            Stay at the forefront of your industry and help more people live
            truly better lives.
          </p>

          <p>
            Discover, source and integrate the most appropriate hyperbaric
            oxygen solution for your needs with HBOT HQ with you every step of
            the way.
          </p>
        </div>
      </div>
      <EmailPopup
        isOpen={isPopupOpen}
        onClose={handlePopupClose}
        onSubmit={handleEmailSubmit}
      />
    </section>
  );
}
