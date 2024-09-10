"use client";

import { useState } from "react";

const EmailInputForm = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setStatus("success");
        setMessage("Thank you for subscribing!");
        setEmail("");
      } else {
        interface ResponseData {
          message?: string;
        }

        const data: ResponseData = (await response.json()) as ResponseData;
        throw new Error(data.message ?? "Something went wrong");
      }
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "An error occurred");
    }
  };

  return (
    <section className="bg-white py-16">
      <div className="mb-12 text-center">
        <p className="text-4xl text-gray-700">
          DISCOVER THE BEST IN HYPERBARIC OXYGEN THERAPY. BY ENTERING <br />
          YOUR EMAIL BELOW, YOU&rsquo;LL BE THE FIRST TO <br />
          RECEIVE EXCLUSIVE INSIDER UPDATES, <br />
          DELIVERED DIRECTLY TO YOUR INBOX.
        </p>
      </div>

      <div className="flex justify-center">
        <div className="w-full max-w-md">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center space-y-4"
          >
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full rounded-lg bg-black px-4 py-2 text-white hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-400"
            >
              {status === "loading" ? "Subscribing..." : "Subscribe"}
            </button>
          </form>
          {status === "success" && (
            <p className="mt-4 text-center text-green-600">{message}</p>
          )}
          {status === "error" && (
            <p className="mt-4 text-center text-red-600">{message}</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default EmailInputForm;
