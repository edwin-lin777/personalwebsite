"use client";

import { useEffect, useRef } from "react";
import { background } from "@/data/background";

type Glyph = { element: SVGTextElement; x: number; y: number; dx: number; dy: number };

export function InteractiveAsciiCar() {
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = host.current;
    if (!container) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const hover = window.matchMedia("(any-hover: hover) and (any-pointer: fine)");
    const abort = new AbortController();
    let dispose = () => {};

    // The SVG remains the static fallback while loading, on touch devices, or on failure.
    async function setup() {
      const response = await fetch(background.asciiSrc, { signal: abort.signal });
      if (!response.ok) return;
      const documentSvg = new DOMParser().parseFromString(await response.text(), "image/svg+xml");
      if (abort.signal.aborted || !container || documentSvg.querySelector("parsererror")) return;
      const source = documentSvg.querySelector("svg");
      if (!source) return;
      const svg = document.importNode(source, true);
      svg.setAttribute("aria-hidden", "true");
      svg.setAttribute("focusable", "false");
      const glyphs: Glyph[] = Array.from(svg.querySelectorAll("text"), element => ({
        element, x: Number(element.getAttribute("x")) + 3,
        y: Number(element.getAttribute("y")) - 4, dx: 0, dy: 0,
      }));
      container.appendChild(svg);
      container.dataset.ready = "true";
      const active = new Set<Glyph>();
      let pointer: { x: number; y: number; radius: number; strength: number } | null = null;
      let frame = 0;
      let previousTime = 0;

      function draw(time: number) {
        frame = 0;
        const delta = previousTime ? Math.min(32, time - previousTime) : 16;
        previousTime = time;
        const easing = 1 - Math.exp(-delta / 75);
        let moving = false;
        // Only nearby or returning characters need DOM updates.
        if (pointer) for (const glyph of glyphs) {
          if (Math.hypot(glyph.x - pointer.x, glyph.y - pointer.y) < pointer.radius) active.add(glyph);
        }
        for (const glyph of active) {
          let targetX = 0, targetY = 0;
          if (pointer) {
            const dx = glyph.x - pointer.x, dy = glyph.y - pointer.y;
            const distance = Math.hypot(dx, dy);
            if (distance < pointer.radius) {
              const push = Math.pow(1 - distance / pointer.radius, 2) * pointer.strength;
              targetX = dx / Math.max(1, distance) * push;
              targetY = dy / Math.max(1, distance) * push;
            }
          }
          glyph.dx += (targetX - glyph.dx) * easing;
          glyph.dy += (targetY - glyph.dy) * easing;
          const settled = Math.abs(targetX - glyph.dx) + Math.abs(targetY - glyph.dy) < .025;
          if (settled) { glyph.dx = targetX; glyph.dy = targetY; }
          if (!glyph.dx && !glyph.dy) {
            glyph.element.removeAttribute("transform");
            active.delete(glyph);
          } else {
            glyph.element.setAttribute("transform", `translate(${glyph.dx.toFixed(2)} ${glyph.dy.toFixed(2)})`);
          }
          if (!settled) moving = true;
        }
        if (moving) frame = requestAnimationFrame(draw);
        else previousTime = 0;
      }
      function schedule() { if (!frame) frame = requestAnimationFrame(draw); }
      function leave() { pointer = null; schedule(); }
      function reset() {
        pointer = null;
        cancelAnimationFrame(frame);
        frame = 0;
        previousTime = 0;
        for (const glyph of active) {
          glyph.dx = glyph.dy = 0;
          glyph.element.removeAttribute("transform");
        }
        active.clear();
      }
      function move(event: PointerEvent) {
        if (preference.matches || !hover.matches || event.pointerType === "touch") return;
        // Listen through foreground cards too; this passive listener never blocks
        // their links or controls. Only the cursor's location determines the effect.
        const bounds = svg.getBoundingClientRect();
        const viewport = container!.parentElement!.getBoundingClientRect();
        if (!bounds.width || event.clientX < bounds.left || event.clientX > bounds.right ||
            event.clientY < bounds.top || event.clientY > Math.min(bounds.bottom, viewport.bottom)) {
          leave(); return;
        }
        const scale = svg.viewBox.baseVal.width / bounds.width;
        pointer = { x: (event.clientX - bounds.left) * scale, y: (event.clientY - bounds.top) * scale,
          radius: 80 * scale, strength: 19 * scale };
        schedule();
      }
      function out(event: PointerEvent) {
        if (!event.relatedTarget || event.relatedTarget instanceof HTMLIFrameElement) leave();
      }
      window.addEventListener("pointermove", move, { passive: true });
      window.addEventListener("pointerout", out);
      window.addEventListener("blur", leave);
      window.addEventListener("scroll", leave, { passive: true });
      window.addEventListener("resize", reset);
      document.addEventListener("visibilitychange", reset);
      preference.addEventListener("change", reset);
      hover.addEventListener("change", reset);
      dispose = () => {
        reset();
        window.removeEventListener("pointermove", move);
        window.removeEventListener("pointerout", out);
        window.removeEventListener("blur", leave);
        window.removeEventListener("scroll", leave);
        window.removeEventListener("resize", reset);
        document.removeEventListener("visibilitychange", reset);
        preference.removeEventListener("change", reset);
        hover.removeEventListener("change", reset);
        svg.remove();
        delete container!.dataset.ready;
      };
    }
    if (hover.matches) void setup().catch(() => { /* Keep the static SVG on failure. */ });
    return () => { abort.abort(); dispose(); };
  }, []);

  return <div ref={host} className="car-backdrop" style={{ backgroundImage: `url("${background.asciiSrc}")` }} />;
}
