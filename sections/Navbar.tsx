"use client";

import { Button } from "@/components/ui/button";
import { ChevronDown, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  //Function to toggle the nav links dropdown
  const toggle = () => setShowMenu((prev) => !prev);

  // Nav links
  const navLinks = [
    { label: "Home", href: "/" },
    {
      label: "About Us",
      children: [
        { label: "Our Mission and Vision", href: "/about" },
        { label: "Our Values", href: "/about/#values" },
        { label: "Teams", href: "/about/#teams" },
      ],
    },
    {
      label: "Company",
      children: [
        { label: "Our Services", href: "/services" },
        { label: "Careers", href: "/careers" },
        { label: "Events", href: "/events" },
      ],
    },
    { label: "Contact Us", href: "/contact" },
    {
      label: "Blog",
      href: "/blog",
    },
  ];

  // handle submenu toggle per index
  const handleSubmenuToggle = (index: number) =>
    setOpenIndex((prev) => (prev === index ? null : index));

  // close mobile menu and submenus (call on navigation)
  const closeMobileMenu = () => {
    setShowMenu(false);
    setOpenIndex(null);
  };

  return (
    <nav className="w-full fixed top-0 backdrop-blur-md z-50 px-4 sm:px-6 lg:px-8 shadow-md bg-white/90 border-b border-gray-200">
      <div className="flex items-center justify-between h-16 max-w-7xl mx-auto">
        {/* Logo */}
        <div className="cursor-pointer ">
          <Link href="/">
            <Image src="/logo.jpg" alt="Logo" width={50} height={50} />
          </Link>
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden sm:flex items-baseline space-x-4 text-slate-800">
          {navLinks.map((item) =>
            item.children ? (
              <DropdownMenu key={item.label}>
                <DropdownMenuTrigger className="flex items-center gap-2 py-2 px-3 rounded-md hover:bg-gray-100">
                  {item.label}
                  <ChevronDown size={16} />
                </DropdownMenuTrigger>

                <DropdownMenuContent align="start" className="w-48">
                  {item.children.map((c) => (
                    <DropdownMenuItem key={c.label} asChild className="my-2">
                      <Link href={c.href}>{c.label}</Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                key={item.label}
                href={item.href}
                className="py-2 px-3 rounded-md hover:bg-gray-100 text-slate-800"
              >
                {item.label}
              </Link>
            )
          )}
        </div>

        {/* CTA Button (Desktop) */}
        <div className="hidden sm:block">
          <Button variant="default" aria-label="Get Started">
            Get Started
          </Button>
        </div>

        {/* Mobile toggle */}
        <Button
          className="sm:hidden block cursor-pointer"
          variant="ghost"
          onClick={toggle}
          aria-label="Toggle Menu"
          type="button"
        >
          {showMenu ? <X size={20} /> : <Menu size={20} />}
        </Button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`sm:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          showMenu ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col items-start gap-2 pl-5 py-4 text-slate-800">
          {navLinks.map((item, index) => (
            <div key={item.label} className="w-full">
              {!item.children ? (
                <a
                  href={item.href}
                  onClick={closeMobileMenu}
                  className="block px-3 py-2 rounded-md text-slate-800 font-medium hover:bg-gray-50"
                >
                  {item.label}
                </a>
              ) : (
                <div className="w-full border-b border-gray-100 py-2">
                  <button
                    type="button"
                    onClick={() => handleSubmenuToggle(index)}
                    aria-expanded={openIndex === index}
                    aria-controls={`submenu-${index}`}
                    className="flex items-center justify-between w-full px-3 py-2"
                  >
                    <span className="font-medium">{item.label}</span>
                    <ChevronDown
                      size={18}
                      className={`transition-transform ${
                        openIndex === index ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {openIndex === index && (
                    <div
                      id={`submenu-${index}`}
                      className="pl-6 pb-2 flex flex-col"
                    >
                      {item.children!.map((c) => (
                        <Link
                          key={c.label}
                          href={c.href}
                          onClick={closeMobileMenu}
                          className="block px-3 py-2 rounded-md text-slate-800 hover:bg-gray-50"
                        >
                          {c.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}

          <div className="px-3 pt-2 w-full">
            <Button variant="default" aria-label="Get Started" className="w-full">
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
