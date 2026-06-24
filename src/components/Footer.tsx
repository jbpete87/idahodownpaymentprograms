import Link from "next/link";
import { Phone, Mail, MapPin, Star } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#10B981]/10 flex items-center justify-center text-[#10B981]">
                <span className="text-xl">🏠</span>
              </div>
              <div>
                <span className="font-[family-name:var(--font-display)] font-bold text-gray-900 text-lg">
                  Idaho DPA Finder
                </span>
              </div>
            </div>
            <p className="text-gray-500 max-w-sm leading-relaxed">
              Helping Idaho homebuyers discover down payment assistance programs.
              Find out what you qualify for in under 5 minutes.
            </p>
            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-3 text-gray-600">
                <Phone className="w-4 h-4 text-[#10B981]" />
                <div>
                  <a href="tel:8018207620" className="hover:text-[#10B981] transition-colors">
                    (801) 820-7620
                  </a>
                  <span className="text-gray-400 mx-1">|</span>
                  <a href="sms:8016986071" className="hover:text-[#10B981] transition-colors">
                    Text: (801) 698-6071
                  </a>
                </div>
              </div>
              <a 
                href="mailto:jake@thetimhawkesteam.com" 
                className="flex items-center gap-3 text-gray-600 hover:text-[#10B981] transition-colors"
              >
                <Mail className="w-4 h-4 text-[#10B981]" />
                jake@thetimhawkesteam.com
              </a>
              <div className="flex items-center gap-3 text-gray-600">
                <MapPin className="w-4 h-4 text-[#10B981]" />
                <span>1725 E 1450 S Ste 100, Clearfield, UT 84015</span>
              </div>
            </div>

            {/* Trust Indicator */}
            <div className="mt-6 flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <span className="text-sm text-gray-500">
                Highly rated on multiple platforms
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-[family-name:var(--font-display)] font-bold text-gray-900 mb-4">
              Quick Links
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/guide"
                  className="text-gray-500 hover:text-[#10B981] transition-colors font-medium"
                >
                  2026 DPA Guide
                </Link>
              </li>
              <li>
                <Link
                  href="/quiz"
                  className="text-gray-500 hover:text-[#10B981] transition-colors"
                >
                  Eligibility Quiz
                </Link>
              </li>
              <li>
                <Link
                  href="/programs"
                  className="text-gray-500 hover:text-[#10B981] transition-colors"
                >
                  All Programs
                </Link>
              </li>
              <li>
                <Link
                  href="/first-time-home-buyer"
                  className="text-gray-500 hover:text-[#10B981] transition-colors"
                >
                  First Time Buyers
                </Link>
              </li>
              <li>
                <Link
                  href="/first-time-homebuyer-class"
                  className="text-gray-500 hover:text-[#10B981] transition-colors"
                >
                  Homebuyer Class Guide
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-500 hover:text-[#10B981] transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-500 hover:text-[#10B981] transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-[family-name:var(--font-display)] font-bold text-gray-900 mb-4">
              Resources
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/programs"
                  className="text-gray-500 hover:text-[#10B981] transition-colors"
                >
                  Program Directory
                </Link>
              </li>
              <li>
                <Link
                  href="/income-limits"
                  className="text-gray-500 hover:text-[#10B981] transition-colors"
                >
                  2026 Income Limits (AMI)
                </Link>
              </li>
              <li>
                <Link
                  href="/methodology"
                  className="text-gray-500 hover:text-[#10B981] transition-colors"
                >
                  How We Track Programs
                </Link>
              </li>
              <li>
                <a
                  href="https://www.idahohousing.com/homebuyers/down-payment-closing-cost-assistance/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-[#10B981] transition-colors"
                >
                  IHFA Down Payment Assistance
                </a>
              </li>
              <li>
                <a
                  href="https://www.idahohousing.com/partners/lenders-realtors/loan-product/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-[#10B981] transition-colors"
                >
                  IHFA Loan Products
                </a>
              </li>
              <li>
                <a
                  href="https://www.utahdownpaymentprograms.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-[#10B981] transition-colors"
                >
                  Buying in Utah?
                </a>
              </li>
              <li>
                <a
                  href="https://www.coloradodownpaymentprograms.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-[#10B981] transition-colors"
                >
                  Buying in Colorado?
                </a>
              </li>
            </ul>
            
            <h4 className="font-[family-name:var(--font-display)] font-bold text-gray-900 mb-4 mt-6">
              Our Team
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://www.thetimhawkesteam.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-[#10B981] transition-colors"
                >
                  Tim Hawkes Team Website
                </a>
              </li>
              <li>
                <a
                  href="https://www.thetimhawkesteam.com/down-payment-assistance"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-[#10B981] transition-colors"
                >
                  DPA &amp; First-Time Buyers
                </a>
              </li>
              <li>
                <a
                  href="https://www.thetimhawkesteam.com/contact"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-track="pre_approve"
                  data-track-detail="footer"
                  className="text-gray-500 hover:text-[#10B981] transition-colors"
                >
                  Get Pre-Approved
                </a>
              </li>
              <li>
                <a
                  href="https://www.houseloan.com/timhawkesteam/"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-track="pre_approve"
                  data-track-detail="cornerstone"
                  className="text-gray-500 hover:text-[#10B981] transition-colors"
                >
                  Cornerstone Home Lending
                </a>
              </li>
            </ul>
          </div>

          {/* Locations */}
          <div>
            <h4 className="font-[family-name:var(--font-display)] font-bold text-gray-900 mb-4">
              Locations
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/locations/boise"
                  className="text-gray-500 hover:text-[#10B981] transition-colors"
                >
                  Boise
                </Link>
              </li>
              <li>
                <Link
                  href="/locations/meridian"
                  className="text-gray-500 hover:text-[#10B981] transition-colors"
                >
                  Meridian
                </Link>
              </li>
              <li>
                <Link
                  href="/locations/nampa"
                  className="text-gray-500 hover:text-[#10B981] transition-colors"
                >
                  Nampa
                </Link>
              </li>
              <li>
                <Link
                  href="/locations/idaho-falls"
                  className="text-gray-500 hover:text-[#10B981] transition-colors"
                >
                  Idaho Falls
                </Link>
              </li>
              <li>
                <Link
                  href="/locations/coeur-d-alene"
                  className="text-gray-500 hover:text-[#10B981] transition-colors"
                >
                  Coeur d&apos;Alene
                </Link>
              </li>
              <li>
                <Link
                  href="/locations"
                  className="text-gray-500 hover:text-[#10B981] transition-colors"
                >
                  All Locations →
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Team Branding */}
        <div className="mt-12 pt-8 border-t border-gray-100">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex flex-col items-center md:items-start gap-2 text-center md:text-left">
              <span className="text-sm text-gray-500">
                Maintained by licensed Idaho mortgage professionals
              </span>
              <div className="flex items-center gap-3">
                {/* Team Logo Placeholder */}
                <a 
                  href="https://www.thetimhawkesteam.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center text-white text-xs font-bold hover:bg-[#10B981] transition-colors"
                >
                  TH
                </a>
                <div>
                  <span className="font-semibold text-gray-900">Tim Hawkes & Jake Peterson</span>
                  <span className="text-gray-400 mx-2">—</span>
                  <a 
                    href="https://www.thetimhawkesteam.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-[#10B981] transition-colors"
                  >
                    The Tim Hawkes Team
                  </a>
                  <span className="text-gray-400 mx-1">|</span>
                  <a 
                    href="https://www.houseloan.com/timhawkesteam/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-[#10B981] transition-colors"
                  >
                    Cornerstone Home Lending
                  </a>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center md:items-end gap-1">
              <div className="text-xs text-gray-400">
                NMLS #2258 | Equal Housing Lender
              </div>
              <a 
                href="https://www.nmlsconsumeraccess.org" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xs text-gray-400 hover:text-[#10B981] transition-colors"
              >
                NMLS Consumer Access
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 pt-6 border-t border-gray-100">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500 text-center md:text-left">
              © {new Date().getFullYear()} Idaho DPA Finder. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link
                href="/privacy"
                className="text-sm text-gray-500 hover:text-[#10B981] transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-sm text-gray-500 hover:text-[#10B981] transition-colors"
              >
                Terms of Use
              </Link>
            </div>
          </div>
          <p className="mt-4 text-xs text-gray-400 text-center max-w-3xl mx-auto">
            Disclaimer: This tool provides estimates only. Final eligibility is
            determined by the administering agency and participating lender.
            Program availability and terms may change without notice.
          </p>
        </div>
      </div>
    </footer>
  );
}
