import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/data/site";

export const metadata: Metadata = { title: "About" };
export default function About() {
  return <main id="main-content" className="editorial-page"><Link className="back-link" href="/">← Back home</Link><span className="eyebrow editorial-kicker">A bit about me</span><h1>Math, markets,<br /><em>and making things.</em></h1><div className="editorial-body"><p>I’m Edwin, an Honours Mathematics student at the University of Waterloo, specializing in statistics.</p><p>I like taking an idea apart, understanding how it works, and building something useful from it. Recently, that’s meant portfolio analytics, a rewards engine in Go, and hackathon projects.</p><section className="experience-note"><span className="eyebrow">Previously · Sartorial Wealth</span><h2>Software for portfolio managers.</h2><p>I built software tools for portfolio managers to view client portfolios, on Azure.</p></section><p>Outside of work, I’m usually out with a camera or finding a trail. Vancouver is home.</p><div className="editorial-links"><Link href="/photography">Photography &amp; the outdoors ↗</Link><a href={`mailto:${site.email}`}>Say hello ↗</a>{site.resume && <a href={site.resume} target="_blank" rel="noopener noreferrer">Résumé ↗</a>}</div></div></main>;
}
