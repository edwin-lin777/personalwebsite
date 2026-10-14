import Link from "next/link";
export default function NotFound() {
  return <main id="main-content" className="editorial-page"><span className="eyebrow">404 / A small detour</span><h1>Nothing here<br /><em>just yet.</em></h1><Link href="/" className="text-link">Back to my projects ↗</Link></main>;
}
