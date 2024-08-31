"use client";

import { useState } from "react";

const CallToAction = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Email submitted:", email);
  };

  return (
    <div className="bg-gray-100 py-8">
      <div className="container mx-auto flex flex-col items-center justify-between px-6 lg:flex-row">
        <div className="mb-4 lg:mb-0">
          <h2 className="text-2xl font-bold text-gray-800">
            Want to receive our guides?
          </h2>
          <p className="text-gray-600">
            Enter your email below to get them directly in your inbox.
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex w-full max-w-lg flex-col items-center sm:flex-row"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Your email address"
            className="mb-4 w-full rounded-md border px-4 py-2 sm:mb-0 sm:mr-4 sm:w-auto"
          />
          <button
            type="submit"
            className="rounded-md bg-orange-500 px-6 py-2 text-white transition-colors hover:bg-orange-600"
          >
            Get Guides
          </button>
        </form>
      </div>
    </div>
  );
};

export default CallToAction;
