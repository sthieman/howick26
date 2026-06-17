"use client";

import { useCallback, useRef, useState } from "react";

/** Bottom-center toast matching the prototype's adToast animation. */
export function useToast() {
  const [message, setMessage] = useState("");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const show = useCallback((msg: string) => {
    setMessage(msg);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setMessage(""), 2400);
  }, []);

  const node = message ? (
    <div
      key={message}
      className="ad-toast"
      style={{
        position: "fixed",
        bottom: 28,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 100,
        background: "var(--ink)",
        color: "#fff",
        padding: "14px 26px",
        fontFamily: "var(--font-heading)",
        fontSize: 13,
        fontWeight: 600,
        letterSpacing: ".04em",
        boxShadow: "0 12px 30px rgba(0,0,0,.25)",
      }}
    >
      {message}
    </div>
  ) : null;

  return { node, show };
}
