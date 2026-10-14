import Link from "next/link";
import { PhotoFrame } from "@/components/photo-frame";
import { featuredPhoto } from "@/data/photos";
import { MusicWidget } from "@/components/music-widget";
import { ProjectWindow } from "@/components/project-window";
import { CarBackground } from "@/components/car-background";

export default function Home() {
  return (
    <main id="main-content" className="desk-home">
      <section className="desk-intro" aria-labelledby="intro-title">
        <span className="handwritten intro-hello">hey, i’m</span>
        <h1 id="intro-title">Edwin Lin.</h1>
        <p className="desk-intro-line">math at waterloo. software, markets &amp; a camera.</p>
        <div className="desk-personal-notes">
          <p><span aria-hidden="true">↳</span> Studying statistics. Building things around data and finance.</p>
          <p><span aria-hidden="true">↳</span> Previously at <Link href="/about">Sartorial Wealth</Link>.</p>
        </div>
      </section>
      <aside className="desk-right-top"><MusicWidget /></aside>
      <div className="desk-project-area"><ProjectWindow /></div>
      <aside className="desk-personal-area">
        <Link href="/photography" className="home-photo-card">
          <PhotoFrame photo={featuredPhoto} />
          <span className="home-photo-caption"><span>Photography</span><span aria-hidden="true">&#8599;</span></span>
        </Link>
        <div className="desk-margin-note"><span className="handwritten">Away from the keyboard.</span><p>A camera, some friends,<br />and the occasional trail.</p></div>
      </aside>
      <CarBackground />
    </main>
  );
}
