// app/components/Newsletter.tsx
"use client";

import { useState } from "react";

export default function NewsLetter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    
    // Simulate API call
    setTimeout(() => {
      if (email && email.includes("@")) {
        setStatus("success");
        setMessage("Thanks for subscribing! Check your inbox for confirmation.");
        setEmail("");
        setTimeout(() => setStatus("idle"), 3000);
      } else {
        setStatus("error");
        setMessage("Please enter a valid email address.");
        setTimeout(() => setStatus("idle"), 3000);
      }
    }, 1000);
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
          Subscribe to Our Newsletter
        </h2>
        
        {/* Description */}
        <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
          Get the latest articles, wellness tips, and stress-relief strategies delivered straight to your inbox.
        </p>

        {/* Newsletter Form */}
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              disabled={status === "loading"}
              className="flex-1 px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#35928d] focus:ring-2 focus:ring-[#35928d]/20 transition-all disabled:opacity-50"
              required
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="px-6 py-3 bg-[#35928d] text-white font-medium rounded-lg hover:bg-[#2a7a76] transition-all disabled:opacity-50"
            >
              {status === "loading" ? "Subscribing..." : "Subscribe"}
            </button>
          </div>

          {/* Success/Error Messages */}
          {status === "success" && (
            <div className="mt-4 text-sm text-green-600 bg-green-50 px-4 py-2 rounded-lg">
              ✓ {message}
            </div>
          )}
          
          {status === "error" && (
            <div className="mt-4 text-sm text-red-600 bg-red-50 px-4 py-2 rounded-lg">
              ✗ {message}
            </div>
          )}

          {/* Trust Text */}
          <p className="text-xs text-gray-400 mt-4">
            No spam. Unsubscribe anytime.
          </p>
        </form>
      </div>
    </section>
  );
}