"use client";
import React from "react";

import Link from "next/link";
import { ArrowRight} from "lucide-react";
import { Button } from "@/components/ui/button";
import { NavIcon } from "./icons";

const navigation = [
  { name: "Events", href: "#" },
  { name: "My Tickets", href: "/#" },
  { name: "About Project", href: "#" },
];

const Navbar = () => {
  return (
    <header className="flex justify-center w-full px-4 py-4">
      <div className="w-full max-w-[1200px] flex items-center justify-between px-6 py-3 rounded-xl border border-surface-secondary bg-surface">
        <Link href="/" className="flex items-center space-x-2">
          <NavIcon />
        </Link>

        <nav className="hidden md:flex md:gap-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-lg font-medium font-jeju text-white/80 transition-colors hover:text-white"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <Button asChild className="bg-white text-black hover:bg-white/90 hover:scale-105 font-jeju px-4 py-3 md:px-6 md:py-4 text-sm md:text-base">
          <Link href="#" className="flex items-center gap-2">
            <span className="font-medium">MY TICKETS</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </header>
  );
};

export default Navbar;
