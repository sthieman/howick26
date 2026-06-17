"use client";

import { useEffect } from "react";

/**
 * Drives the pinned scroll "journeys" on the home page — a faithful port of the
 * prototype's updateJourney(). It reads scroll progress over each tall
 * [data-journey] section and mutates the scene elements (opacity / transform /
 * counters) by id, exactly as the original did. Rendering the scene markup stays
 * static (server components); this controller is the only client piece.
 *
 * Mount it once anywhere on the home page. Renders nothing.
 */
export function JourneyController() {
  useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    const q = (s: string) => document.querySelector(s) as HTMLElement | null;
    const clamp = (v: number, a: number, b: number) => (v < a ? a : v > b ? b : v);
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const ease = (t: number) => {
      t = clamp(t, 0, 1);
      return t * t * (3 - 2 * t);
    };
    function prog(sel: string): number | null {
      const s = q(sel);
      if (!s) return null;
      const vh = window.innerHeight || 800;
      const tot = s.offsetHeight - vh;
      const top = s.getBoundingClientRect().top;
      const p = tot > 0 ? -top / tot : 0;
      return p < 0 ? 0 : p > 1 ? 1 : p;
    }
    function band(P: number, a: number, b: number) {
      return ease(Math.min(clamp((P - a) / 0.12, 0, 1), clamp((b - P) / 0.12, 0, 1)));
    }
    function setSc(
      P: number,
      name: string,
      a: number,
      b: number,
      opt: { first?: boolean; last?: boolean; noscale?: boolean } = {}
    ) {
      const el = q('[data-scene="' + name + '"]');
      if (!el) return 0;
      const t = clamp((P - a) / (b - a), 0, 1);
      let o: number, ty: number;
      if (opt.first) {
        o = ease(clamp((1 - t) / 0.22, 0, 1));
        ty = lerp(0, -50, t);
      } else if (opt.last) {
        o = ease(clamp(t / 0.22, 0, 1));
        ty = lerp(50, 0, o);
      } else {
        o = ease(Math.min(clamp(t / 0.16, 0, 1), clamp((1 - t) / 0.16, 0, 1)));
        ty = lerp(50, -50, t);
      }
      el.style.opacity = String(o);
      el.style.transform = reduce ? "none" : "translateY(" + ty + "px) scale(" + (opt.noscale ? 1 : lerp(0.97, 1.03, t)) + ")";
      el.style.pointerEvents = o > 0.85 ? "auto" : "none";
      return t;
    }

    function update() {
      // INTRO: title -> team photo reveal
      const p = prog('[data-journey="intro"]');
      if (p != null) {
        setSc(p, "title", 0, 0.5, { first: true });
        const tp = setSc(p, "teamphoto", 0.5, 1, { last: true, noscale: true });
        const tpi = q("#jTeamImg");
        if (tpi) {
          const narrow = window.innerWidth < 768;
          if (narrow && reduce) {
            // Reduced-motion phone: show the whole landscape photo statically,
            // no crop, so the full team is visible without any motion.
            tpi.style.objectFit = "contain";
            tpi.style.objectPosition = "center";
            tpi.style.transform = "none";
          } else if (narrow) {
            // Phone: keep it full-bleed but pan left→right across the whole photo
            // as the scene reveals, so every face is shown over the scroll.
            tpi.style.objectFit = "cover";
            tpi.style.transform = "none";
            tpi.style.objectPosition = (ease(tp) * 100).toFixed(1) + "% center";
          } else {
            // Desktop: original subtle zoom-out.
            tpi.style.objectFit = "cover";
            tpi.style.objectPosition = "center";
            tpi.style.transform = reduce ? "none" : "scale(" + lerp(1.14, 1, ease(tp)) + ")";
          }
        }
        const tpc = q("#jTeamCap");
        if (tpc) tpc.style.opacity = String(ease(clamp((tp - 0.2) / 0.5, 0, 1)));
        const hint = q("[data-scrollhint]");
        if (hint) hint.style.opacity = String((1 - ease(clamp(p / 0.04, 0, 1))) * 0.7);
      }

      // ISAIAH: 6:5 -> 6:8
      const pi = prog('[data-journey="isaiah"]');
      if (pi != null) {
        const si = q('[data-journey="isaiah"] [data-scene="isaiah"]');
        if (si) si.style.opacity = String(band(pi, 0, 1));
        const isa5 = q("#jIsa5");
        if (isa5) {
          isa5.style.opacity = String(ease(clamp(pi / 0.08, 0, 1)) * ease(clamp((0.6 - pi) / 0.22, 0, 1)));
          isa5.style.transform = "translateY(" + lerp(0, -26, pi) + "px)";
        }
        const isa8 = q("#jIsa8");
        if (isa8) {
          const t8 = clamp((pi - 0.5) / 0.3, 0, 1);
          isa8.style.opacity = String(ease(t8));
          isa8.style.transform = "translateY(" + lerp(34, 0, ease(t8)) + "px)";
        }
      }

      // COMMISSION: Matthew 28
      const pc = prog('[data-journey="commission"]');
      if (pc != null) {
        const sm = q('[data-journey="commission"] [data-scene="matthew"]');
        if (sm) sm.style.opacity = String(band(pc, 0, 1));
        const mp = q("#jMattPromise");
        if (mp) {
          const tmp = clamp((pc - 0.42) / 0.4, 0, 1);
          mp.style.opacity = String(ease(tmp));
          mp.style.transform = "translateY(" + lerp(24, 0, ease(tmp)) + "px)";
        }
      }

      // GLOBE: Denver to Howick
      const pg = prog('[data-journey="globe"]');
      if (pg != null) {
        const g = q('[data-scene="globe"]');
        if (g) g.style.opacity = String(ease(clamp(pg / 0.12, 0, 1)));
        const gr = q("#jGlobeRot");
        if (gr) gr.style.transform = reduce ? "none" : "rotate(" + lerp(-16, 16, pg) + "deg)";
        const arc = q("#jArc") as unknown as SVGPathElement | null;
        if (arc) {
          const La = Number(arc.getAttribute("data-len")) || 340;
          arc.style.strokeDashoffset = String(La * (1 - ease(clamp((pg - 0.12) / 0.66, 0, 1))));
        }
        const dot = q("#jArcDot");
        if (dot) {
          dot.style.offsetDistance = clamp((pg - 0.12) / 0.66, 0, 1) * 100 + "%";
          dot.style.opacity = pg > 0.1 && pg < 0.92 ? "1" : "0";
        }
        const miles = q("#jMiles");
        if (miles) miles.textContent = Math.round(lerp(0, 9800, ease(clamp((pg - 0.08) / 0.7, 0, 1)))).toLocaleString();
      }
    }

    // Note: under prefers-reduced-motion we still run the controller (scrolling
    // reveals each scene — it's user-driven, not auto-playing), but skip the
    // parallax translate/scale/rotate above so content appears without motion.
    // The decorative auto-loops (emblem, letters) are disabled separately in CSS.
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        update();
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    update();
    const t1 = setTimeout(update, 80);
    const t2 = setTimeout(update, 420);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return null;
}
