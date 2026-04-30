"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Logo from "../../public/Images/Zenvirox-Logo.png";
import Image from "next/image";

function NavBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const links = [
    { name: "Home", link: "/" },
    { name: "About", link: "/about" },
    { name: "Tech", link: "/Category/Tech" },
    { name: "Sports", link: "/Category/Sports" },
    { name: "Business", link: "/Category/Business" },
    { name: "Contact", link: "/contact" },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    // Handle search logic here (e.g., redirect to search page)
    console.log("Searching for:", searchQuery);
    setSearchQuery("");
    setIsSearchOpen(false);
  };

  // Close mobile menu when window resizes to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <div className="w-full bg-white border-b border-gray-100 ">
        <div className="max-w-6xl mx-auto flex items-center justify-between py-4 md:py-6 px-4">

          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href={"/"}>
              <Image src={Logo} width={160} height={40} alt="Logo" className="w-auto h-16" />
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

          {/* Desktop Search & Mobile Menu Button */}
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
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#35928d] transition-colors"
                >
                  🔍
                </button>
              </form>
            </div>

            {/* Mobile Search Icon */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-[#35928d] transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            {/* Hamburger Menu Button - Mobile */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-[#35928d] transition-colors focus:outline-none"
              aria-label="Toggle menu"
            >
              <div className="w-6 h-5 flex flex-col justify-between">
                <span className={`w-full h-0.5 bg-gray-600 transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                <span className={`w-full h-0.5 bg-gray-600 transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
                <span className={`w-full h-0.5 bg-gray-600 transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {isSearchOpen && (
          <div className="md:hidden px-4 pb-4">
            <form onSubmit={handleSearch}>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles..."
                className="w-full px-4 py-2 text-sm border border-gray-200 rounded-full focus:outline-none focus:border-[#35928d] focus:ring-2 focus:ring-[#35928d]/20 transition-all"
                autoFocus
              />
            </form>
          </div>
        )}
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          
          {/* Menu Panel */}
          <div className="absolute right-0 top-0 h-full w-64 bg-white shadow-xl animate-slide-in">
            {/* Menu Header */}
            <div className="flex justify-between items-center p-4 border-b border-gray-100">
              <span className="font-bold text-black">Menu</span>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 text-gray-400 hover:text-[#35928d] transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Mobile Navigation Links */}
            <nav className="p-4 space-y-2">
              {links.map((item, i) => (
                <Link
                  key={i}
                  href={item.link}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-3 text-gray-700 hover:text-[#35928d] hover:bg-gray-50 rounded-lg transition-colors duration-200"
                >
                  {item.name}
                </Link>
              ))}
            </nav>
            
            {/* Mobile Search Section */}
            <div className="p-4 border-t border-gray-100 mt-4">
              <p className="text-xs text-gray-400 mb-2">Search</p>
              <form onSubmit={(e) => {
                handleSearch(e);
                setIsMobileMenuOpen(false);
              }}>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search articles..."
                  className="w-full px-4 py-2 text-sm border border-gray-200 rounded-full focus:outline-none focus:border-[#35928d] focus:ring-2 focus:ring-[#35928d]/20"
                />
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default NavBar;