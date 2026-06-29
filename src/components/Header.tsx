"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Home, Search, BookOpen, FileText, MapPin, DollarSign, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

const navLinks = [
  { href: "/", label: "Home", icon: Home },
  { href: "/guide", label: "2026 Guide", icon: BookOpen },
  { href: "/first-time-home-buyer", label: "First-Time Buyers", icon: Users },
  { href: "/quiz", label: "Find Programs", icon: Search },
  { href: "/programs", label: "All Programs", icon: FileText },
  { href: "/locations", label: "Locations", icon: MapPin },
  { href: "/income-limits", label: "Income Limits", icon: DollarSign },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group min-w-0">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-[#10B981] text-white flex items-center justify-center shadow-sm transition-transform duration-200 group-hover:scale-105 flex-shrink-0">
              <span className="text-xl md:text-2xl">🏠</span>
            </div>
            <div className="min-w-0">
              <span className="font-[family-name:var(--font-display)] font-bold text-gray-900 text-base sm:text-lg leading-tight">
                Idaho DPA
              </span>
              <span className="block text-[11px] sm:text-xs text-gray-500 -mt-0.5 leading-tight truncate">
                Down Payment Finder
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <Button variant="ghost" size="sm" className="font-medium text-gray-600 hover:text-gray-900">
                  {link.label}
                </Button>
              </Link>
            ))}
            <Link href="/quiz" className="ml-2">
              <Button variant="primary">Start Free Quiz</Button>
            </Link>
          </nav>

          <div className="flex items-center gap-2 md:hidden flex-shrink-0">
            <Link href="/quiz">
              <Button variant="primary" size="sm" className="whitespace-nowrap px-3">
                Free Quiz
              </Button>
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-10 h-10 rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-gray-600" />
              ) : (
                <Menu className="w-6 h-6 text-gray-600" />
              )}
            </button>
          </div>
        </div>

        <div
          className={cn(
            "md:hidden overflow-hidden transition-all duration-300 ease-in-out border-b border-gray-100",
            mobileMenuOpen ? "max-h-96 opacity-100 mb-4" : "max-h-0 opacity-0"
          )}
        >
          <nav className="flex flex-col gap-1 py-4">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-50 text-gray-700 font-medium transition-colors"
                >
                  <Icon className="w-5 h-5 text-[#10B981]" />
                  {link.label}
                </Link>
              );
            })}
            <div className="px-4 mt-2">
              <Link href="/quiz" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="primary" className="w-full justify-center">
                  Start Free Quiz →
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
