"use client";

import { useEffect, useRef, useState } from "react";
import { photoCollections, type Photo } from "@/data/photos";
import { PhotoFrame } from "./photo-frame";

export function PhotoCollection({ photos }: { photos: Photo[] }) {
  const [selected, setSelected] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (selected !== null) { if (!dialog.current?.open) dialog.current?.showModal(); }
    else if (dialog.current?.open) dialog.current.close();
  }, [selected]);
  useEffect(() => {
    if (selected === null) return;
    const before = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = before; };
  }, [selected]);
  const change = (direction: number) => setSelected(current => current === null ? null : (current + direction + photos.length) % photos.length);
  if (!photos.length) return <div className="photo-empty"><span className="eyebrow">A collection in progress</span><p>A few places.<br /><em>A few moments.</em></p><span>Photographs coming soon.</span></div>;
  const photo = selected === null ? null : photos[selected];
  return <>
    <nav className="photo-index" aria-label="Photo collections">{photoCollections.map((collection, index) => <a key={collection} href={`#collection-${index}`}><span>0{index + 1}</span>{collection}</a>)}</nav>
    {photoCollections.map((collection, collectionIndex) => <section className="photo-section" id={`collection-${collectionIndex}`} key={collection} aria-labelledby={`photo-heading-${collectionIndex}`}>
      <div className="photo-section-heading"><h2 id={`photo-heading-${collectionIndex}`}>{collection}</h2><span>{photos.filter(item => item.collection === collection).length} photographs</span></div>
      <div className="photo-gallery">{photos.filter(item => item.collection === collection).map(item => <button key={item.id} type="button" className={`photo-tile ${item.crop.width > item.crop.height ? "photo-landscape" : ""}`} onClick={() => setSelected(photos.indexOf(item))} aria-label={`Enlarge photograph: ${item.alt}`}><PhotoFrame photo={item} /></button>)}</div>
    </section>)}
    <dialog ref={dialog} className="photo-dialog" aria-label="Photograph viewer" onClose={() => setSelected(null)} onClick={event => { if (event.target === event.currentTarget) setSelected(null); }} onKeyDown={event => { if (event.key === "ArrowRight") change(1); if (event.key === "ArrowLeft") change(-1); }}>
      {photo && <div className="lightbox-content"><button className="lightbox-close" type="button" onClick={() => setSelected(null)} aria-label="Close photograph">Close ×</button><div className="lightbox-frame" style={{ width: `min(86vw, ${72 * photo.crop.width / photo.crop.height}svh)` }}><PhotoFrame photo={photo} /></div><div className="lightbox-caption">{photos.length > 1 && <div className="lightbox-controls"><button type="button" onClick={() => change(-1)} aria-label="Previous photograph">←</button><span aria-live="polite" aria-atomic="true">{(selected ?? 0) + 1} / {photos.length}</span><button type="button" onClick={() => change(1)} aria-label="Next photograph">→</button></div>}</div></div>}
    </dialog>
  </>;
}
