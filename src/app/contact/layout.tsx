import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Idaho Down Payment Assistance Finder",
  description:
    "Contact The Tim Hawkes Team for help with Idaho down payment assistance programs. Free consultation, no obligation.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

