"use client";

import React, { useState } from "react";
import Link from "next/link";
import Logo from "../../public/Images/Zenvirox-Logo.png";
import Image from "next/image";

function NavBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const links = [
    { name: "Sports", link: "/Category/Sports" },
    { name: "General", link: "/Category/General" },
    { name: "Business", link: "/Category/Business" },
    { name: "Tech", link: "/Category/Tech" },
    { name: "Contact", link: "/Contact" },
  ];

  const handleSearch = (e: React.SubmitEvent) => {
    e.preventDefault();

    if (!searchQuery.trim()) return;

    setSearchQuery("");
    setIsSearchOpen(false);
  };

  return (
    <div className="w-full bg-white border-b border-gray-100">
      <div className="max-w-6xl mx-auto flex items-center justify-between py-4 md:py-6 px-4">

        {/* Logo */}
        <div className="flex-shrink-0">
          <Link href={"/"}>
            <Image src={Logo} width={200} height={200} alt="Logo" />
          </Link>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map((item, i) => (
            <li key={i}>
              <Link href={item.link}>
                <span className="text-gray-700 hover:text-[#35928d] transition-colors duration-300 text-base font-medium">
                  {item.name}
                </span>
              </Link>
            </li>
          ))}
        </ul>

        {/* Search */}
        <div className="flex items-center gap-3">

          {/* Desktop Search */}
          <div className="hidden md:block">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles..."
                className="w-64 px-4 py-2 pr-10 text-sm border border-gray-200 rounded-full focus:outline-none focus:border-[#35928d] focus:ring-2 focus:ring-[#35928d]/20 transition-all"
              />

              <button
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#35928d]"
              >
                🔍
              </button>
            </form>
          </div>

          {/* Mobile Search Icon */}
          <div className="md:hidden">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 text-gray-600 hover:text-[#35928d]"
            >
              🔍
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Search */}
      {isSearchOpen && (
        <div className="md:hidden px-4 pb-4">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles..."
              className="w-full px-4 py-2 text-sm border border-gray-200 rounded-full focus:outline-none focus:border-[#35928d] focus:ring-2 focus:ring-[#35928d]/20"
              autoFocus
            />
          </form>
        </div>
      )}
    </div>
  );
}

export default NavBar;