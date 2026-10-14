import Image from "next/image";
import type { Photo } from "@/data/photos";

export function PhotoFrame({ photo }: { photo: Photo }) {
  const { x, y, width, height } = photo.crop;
  return <span className="photo-frame" style={{ aspectRatio: `${width} / ${height}` }}>
    <Image src={photo.src} alt={photo.alt} width={2000} height={1600} sizes="2000px" style={{
      position: "absolute", maxWidth: "none", borderRadius: 0,
      width: `${2000 / width * 100}%`, height: `${1600 / height * 100}%`,
      left: `${-x / width * 100}%`, top: `${-y / height * 100}%`,
    }} />
  </span>;
}
