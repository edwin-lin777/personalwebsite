"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Navigation() {
  const pathname = usePathname();
  if (pathname === "/") return null;
  return <header className="site-header"><Link href="/" className="back-link">← Home</Link></header>;
}
