import * as React from "react";

// Design-sync shim: renders next/link as a plain anchor so the brand components
// bundle and render in claude.ai/design previews without the Next.js runtime.
export default function Link({
  href,
  children,
  ...rest
}: {
  href?: string | { pathname?: string };
  children?: React.ReactNode;
  [key: string]: unknown;
}) {
  const url = typeof href === "string" ? href : (href?.pathname ?? "#");
  return React.createElement("a", { href: url, ...rest }, children);
}
