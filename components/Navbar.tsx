"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-navy/95 backdrop-blur text-white">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="font-heading text-xl font-bold text-tosca">
          Jelajah Nusantara
        </Link>
        <nav className="hidden md:flex gap-8 items-center font-medium">
          <Link href="/" className="hover:text-tosca">Home</Link>
          <Link href="/tours" className="hover:text-tosca">Tour</Link>
          <Link href="/about" className="hover:text-tosca">About</Link>
          <Link href="/contact" className="hover:text-tosca">Contact</Link>
          <Link href="/admin" className="bg-tosca px-4 py-2 rounded-md hover:bg-tosca/80">Admin</Link>
        </nav>
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>
      {isOpen && (
        <div className="md:hidden border-t border-white/10 bg-navy">
          <div className="container py-4 flex flex-col gap-4">
            <Link href="/" onClick={() => setIsOpen(false)}>Home</Link>
            <Link href="/tours" onClick={() => setIsOpen(false)}>Tour</Link>
            <Link href="/about" onClick={() => setIsOpen(false)}>About</Link>
            <Link href="/contact" onClick={() => setIsOpen(false)}>Contact</Link>
          </div>
        </div>
      )}
    </header>
  );
}
