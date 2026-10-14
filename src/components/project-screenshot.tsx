import Image from "next/image";
import { useId } from "react";
import type { ProjectImage } from "@/data/projects";

// Crop the original capture with an SVG viewport, keeping the pixels and aspect ratio intact.
export function ProjectScreenshot({ image }: { image: ProjectImage }) {
  const clipId = useId();
  if (image.width && image.height) {
    const crop = image.crop ?? { x: 0, y: 0, width: image.width, height: image.height };
    return <svg className="project-screenshot" viewBox={`${crop.x} ${crop.y} ${crop.width} ${crop.height}`} role="img" aria-label={image.alt} preserveAspectRatio="xMidYMid meet">
      <defs><clipPath id={clipId}><rect x={crop.x} y={crop.y} width={crop.width} height={crop.height} /></clipPath></defs>
      <image href={image.src} width={image.width} height={image.height} clipPath={`url(#${clipId})`} />
    </svg>;
  }
  return <Image src={image.src} alt={image.alt} fill sizes="(max-width: 640px) 85vw, 1100px" />;
}
