"use client";

import { InteractiveAsciiCar } from "./interactive-ascii-car";

export function CarBackground() {
  return <div className="car-stage">
    <div className="car-viewport" aria-hidden="true"><InteractiveAsciiCar /></div>
    <svg className="track-lines" viewBox="0 0 1100 300" fill="none" preserveAspectRatio="none" aria-hidden="true">
      <path d="M-100 255C170 255 140 25 490 85S815 295 1200 5" stroke="#e15555" strokeOpacity=".3" strokeWidth="1.5" />
      <path d="M-100 270C180 270 150 40 490 100S830 310 1200 20" stroke="#ffffff" strokeOpacity=".2" strokeWidth="1.5" />
      <path d="M-100 285C190 285 160 55 490 115S845 325 1200 35" stroke="#40a36b" strokeOpacity=".35" strokeWidth="1.5" />
    </svg>
  </div>;
}

