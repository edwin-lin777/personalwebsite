import type { Metadata } from "next";
import { photos } from "@/data/photos";
import { PhotoCollection } from "@/components/photo-collection";
import { photography } from "@/data/photography";

export const metadata: Metadata = { title: "Photography & the outdoors" };
export default function Photography() {
  return <main id="main-content" className="photography-page">
    <header className="photography-heading photography-camera-heading">
      <div><h1>{photography.title}</h1><p className="photo-camera-label">{photography.camera}</p></div>
      <img className="photo-camera-ascii" src={photography.illustration} alt={photography.illustrationAlt} width={864} height={700} />
    </header>
    <PhotoCollection photos={photos} />
  </main>;
}
