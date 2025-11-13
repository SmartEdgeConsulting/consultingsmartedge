"use client";

import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);

  const toggle = () => setShowMenu((prev) => !prev);

  // Nav links
  const navLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/" },
    { label: "Careers", href: "/" },
    { label: "Contact", href: "/contact" },
    { label: "Blog", href: "/" },
  ];

  return (
    <nav className="w-full fixed top-0 backdrop-blur-md z-50 px-4 sm:px-6 lg:px-8 sm:border-b border-slate-400">
      <div className="flex items-center justify-between h-16 max-w-7xl mx-auto">
        {/* Logo */}
        <div className="cursor-pointer ">
          <Link href="/">
            <Image src="/logo.jpg" alt="Logo" width={50} height={50} />
          </Link>
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden sm:flex items-baseline space-x-4 text-white">
          {navLinks.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              aria-label={`Visit ${link.label} page`}
              className="font-medium px-4 py-2 hover:text-blue transition-all duration-300 relative group"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* CTA Button (Desktop) */}
        <div className="hidden sm:block">
          <Button variant="default" size="sm">
            Get Started
          </Button>
        </div>

        {/* Mobile toggle */}
        <Button
          className="sm:hidden block cursor-pointer"
          variant="ghost"
          onClick={toggle}
        >
          {showMenu ? <X size={20} /> : <Menu size={20} />}
        </Button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`sm:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          showMenu ? "max-h-max opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col items-start gap-2 pl-5 py-4 text-white">
          {navLinks.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              onClick={toggle}
              aria-label={`Visit ${link.label} page`}
              className="text-white font-medium w-full py-3 hover:bg-white/20 transition-all duration-300"
            >
              {link.label}
            </Link>
          ))}
          <Button variant="default">
            Get Started
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
