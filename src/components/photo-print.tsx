import type { Photo } from "@/data/photos";
import { PhotoFrame } from "./photo-frame";

export function PhotoPrint({ photo }: { photo: Photo }) {
  const exposure = photo.sampleExposure;
  return <span className="photo-print">
    <PhotoFrame photo={photo} />
    <span className="photo-print-footer">
      {exposure &&
        <span className="photo-print-settings" aria-label={`Sample exposure: aperture ${exposure.aperture}, shutter ${exposure.shutter}, ISO ${exposure.iso}`}>
          <span>{exposure.aperture}</span><span>{exposure.shutter}</span><span>ISO {exposure.iso}</span>
        </span>
      }
    </span>
  </span>;
}
