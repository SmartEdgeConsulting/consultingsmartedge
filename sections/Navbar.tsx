"use client";

import { Button } from "@/components/ui/button";
import { ChevronDown, Menu, X, LogOut, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUser, useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { isSignedIn, user, isLoaded } = useUser();
  const isAdmin = user?.publicMetadata?.role === "admin";
  const { signOut } = useClerk();
  const router = useRouter();

  // Function to toggle the nav links dropdown
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

  // Handle submenu toggle per index
  const handleSubmenuToggle = (index: number) =>
    setOpenIndex((prev) => (prev === index ? null : index));

  // Close mobile menu and submenus (call on navigation)
  const closeMobileMenu = () => {
    setShowMenu(false);
    setOpenIndex(null);
  };

  //Function to get User initials
  const getInitials = () => {
    if (!user) return "US"; // fallback

    const firstName = user.firstName || "";
    const lastName = user.lastName || "";

    const firstInitial = firstName.trim().charAt(0).toUpperCase();
    const lastInitial = lastName.trim().charAt(0).toUpperCase();

    // If both initials exist, return both, otherwise return first available
    if (firstName && lastName) {
      return firstInitial + lastInitial;
    } else if (firstName) {
      return firstInitial;
    } else if (lastName) {
      return lastInitial;
    } else {
      return "US";
    }
  };

  // Handle sign out
  const handleSignOut = async () => {
    try {
      await signOut();
      closeMobileMenu();
      router.push("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  // Don't render until Clerk is loaded to avoid hydration issues
  if (!isLoaded) {
    return (
      <nav className="w-full fixed top-0 backdrop-blur-md z-50 px-4 sm:px-6 lg:px-8 shadow-md bg-primary/10 border-b border-gray-200">
        <div className="flex items-center justify-between h-16 max-w-7xl mx-auto">
          <div className="cursor-pointer">
            <Link href="/">
              <Image
                src="/smartedge_logo.png"
                alt="Logo"
                width={50}
                height={50}
              />
            </Link>
          </div>
          <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse" />
        </div>
      </nav>
    );
  }

  return (
    <nav className="w-full fixed top-0 backdrop-blur-md z-50 px-4 sm:px-6 lg:px-8 shadow-md bg-primary/10 sm:border-b border-gray-200">
      <div className="flex items-center justify-between h-16 max-w-7xl mx-auto">
        {/* Logo */}
        <div className="cursor-pointer">
          <Link href="/" onClick={closeMobileMenu}>
            <Image
              src="/smartedge_logo.png"
              alt="SmartEdge Logo"
              width={50}
              height={50}
              priority
            />
          </Link>
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden sm:flex items-baseline space-x-4 text-slate-800 font-medium">
          {navLinks.map((item) =>
            item.children ? (
              <DropdownMenu key={item.label}>
                <DropdownMenuTrigger className="flex items-center gap-2 py-2 px-3 rounded-md hover:bg-gray-100 transition-colors duration-200">
                  {item.label}
                  <ChevronDown size={16} />
                </DropdownMenuTrigger>

                <DropdownMenuContent align="start" className="w-48">
                  {item.children.map((child) => (
                    <DropdownMenuItem
                      key={child.label}
                      asChild
                      className="my-2"
                    >
                      <Link href={child.href}>{child.label}</Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                key={item.label}
                href={item.href}
                className="py-2 px-3 rounded-md hover:bg-gray-100 text-slate-800 transition-colors duration-200 "
                onClick={closeMobileMenu}
              >
                {item.label}
              </Link>
            )
          )}
        </div>

        {/* CTA Button (Desktop) */}
        <div className="hidden sm:flex items-center gap-4">
          {isSignedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar className="size-10 cursor-pointer border-2 border-transparent hover:border-gray-300 transition-colors duration-200">
                  <AvatarFallback className="bg-blue-100 text-blue-800 font-semibold">
                    {getInitials()}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {user.firstName} {user.lastName}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user.primaryEmailAddress?.emailAddress}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {isAdmin ? (
                  <DropdownMenuItem asChild className="cursor-pointer">
                    <Link href="/admin" className="flex items-center">
                      <User className="mr-2 h-4 w-4" />
                      <span>Admin Panel</span>
                    </Link>
                  </DropdownMenuItem>
                ) : (
                  <DropdownMenuItem asChild className="cursor-pointer">
                    <Link href="/dashboard" className="flex items-center">
                      <User className="mr-2 h-4 w-4" />
                      <span>Dashboard</span>
                    </Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="cursor-pointer text-red-600 focus:text-red-600"
                  onClick={handleSignOut}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button variant="default" aria-label="Get Started" asChild>
              <Link href="/login">Get Started</Link>
            </Button>
          )}
        </div>

        {/* Mobile toggle */}
        <Button
          className="sm:hidden block cursor-pointer"
          variant="link"
          onClick={toggle}
          aria-label="Toggle Menu"
          type="button"
          aria-expanded={showMenu}
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
        <div className="flex flex-col items-start gap-2 pl-5 py-4 text-slate-800 bg-white/95 backdrop-blur-sm">
          {navLinks.map((item, index) => (
            <div key={item.label} className="w-full">
              {!item.children ? (
                <Link
                  href={item.href}
                  onClick={closeMobileMenu}
                  className="block px-3 py-2 rounded-md text-slate-800 font-medium hover:bg-gray-50 transition-colors duration-200"
                >
                  {item.label}
                </Link>
              ) : (
                <div className="w-full border-b border-gray-100 py-2">
                  <button
                    type="button"
                    onClick={() => handleSubmenuToggle(index)}
                    aria-expanded={openIndex === index}
                    aria-controls={`submenu-${index}`}
                    className="flex items-center justify-between w-full px-3 py-2 text-left font-medium hover:bg-gray-50 rounded-md transition-colors duration-200"
                  >
                    <span>{item.label}</span>
                    <ChevronDown
                      size={18}
                      className={`transition-transform duration-200 ${
                        openIndex === index ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {openIndex === index && (
                    <div
                      id={`submenu-${index}`}
                      className="pl-6 pb-2 flex flex-col space-y-1 mt-1"
                    >
                      {item.children.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          onClick={closeMobileMenu}
                          className="block px-3 py-2 rounded-md text-slate-700 hover:bg-gray-50 transition-colors duration-200"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}

          {/* Mobile CTA Button */}
          <div className="px-3 pt-4 w-full border-t border-gray-100 mt-2">
            {isSignedIn ? (
              <div className="space-y-3">
                <div className="flex items-center gap-3 px-3 py-2">
                  <Avatar className="size-8">
                    <AvatarImage src={user.imageUrl} />
                    <AvatarFallback className="text-xs">
                      {getInitials()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">
                      {user.firstName} {user.lastName}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {user.primaryEmailAddress?.emailAddress}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {isAdmin ? (
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/admin" onClick={closeMobileMenu}>
                        Admin Panel
                      </Link>
                    </Button>
                  ) : (
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/dashboard" onClick={closeMobileMenu}>
                        Dashboard
                      </Link>
                    </Button>
                  )}

                  <Button
                    variant="outline"
                    className="w-full text-red-600 border-red-200 hover:bg-red-50"
                    onClick={handleSignOut}
                  >
                    Sign Out
                  </Button>
                </div>
              </div>
            ) : (
              <Button variant="default" className="w-full" asChild>
                <Link href="/login" onClick={closeMobileMenu}>
                  Get Started
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
