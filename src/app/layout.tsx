import type { Metadata } from "next";
import Link from "next/link";
import { Navigation } from "@/components/navigation";
import { site } from "@/data/site";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Edwin Lin — Software, Math & Markets", template: "%s · Edwin Lin" },
  description: "Edwin Lin is a mathematics student at the University of Waterloo building software around markets, data, and everyday decisions.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body><a href="#main-content" className="skip-link">Skip to content</a><div className="site-shell"><Navigation />{children}<footer className="site-footer"><div><Link href="/photography">Photography</Link><a href={site.github} target="_blank" rel="noopener noreferrer">GitHub ↗</a><a href={site.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a></div></footer></div></body></html>;
}
