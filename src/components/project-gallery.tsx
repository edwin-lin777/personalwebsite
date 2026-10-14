"use client";

import { useState } from "react";
import Image from "next/image";
import type { ProjectImage } from "@/data/projects";

export function ProjectGallery({ images }: { images: ProjectImage[] }) {
  const [active, setActive] = useState(0);
  if (!images.length) {
    return <div className="project-no-image"><span className="eyebrow">Go / Rewards engine</span><h2>Spending in.<br />Rewards out.</h2><p>Category rates, spending caps, and annual fees.<br />A closer look at the rules behind the rewards.</p><span className="eyebrow">Visual demo to be added</span></div>;
  }
  const image = images[active];
  return (
    <figure className="project-gallery">
      <div className="gallery-image"><Image key={image.src} src={image.src} alt={image.alt} fill sizes="(max-width: 700px) 94vw, 1080px" priority /></div>
      <figcaption>
        {images.length > 1 ? <div className="image-options" aria-label="Project screenshots">{images.map((item, index) => <button key={item.src} type="button" onClick={() => setActive(index)} aria-pressed={index === active}>{item.label}</button>)}</div> : <span>{image.label}</span>}
        <span className="gallery-note">{images.length > 1 ? "Screenshot previews" : "Demo recording preview"}</span>
      </figcaption>
    </figure>
  );
}
