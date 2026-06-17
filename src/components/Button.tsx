import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "outline";

// Brave's .btn-primary: solid brand fill, 2px border, white text, 0.2s, hover -> brand-shade.
const base =
  "inline-flex items-center justify-center gap-2 px-6 py-3 font-heading font-semibold uppercase tracking-wide text-sm border-2 transition-colors duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed";

const variants: Record<Variant, string> = {
  primary:
    "bg-brand border-brand text-white hover:bg-brand-shade hover:border-brand-shade",
  outline:
    "bg-transparent border-brand text-brand hover:bg-brand hover:text-white",
};

type ButtonAsLink = { href: string } & Omit<ComponentProps<typeof Link>, "href" | "className"> & {
    variant?: Variant;
    className?: string;
    children: ReactNode;
  };

type ButtonAsButton = { href?: undefined } & ComponentProps<"button"> & {
    variant?: Variant;
  };

export function Button(props: ButtonAsLink | ButtonAsButton) {
  const { variant = "primary", className = "", children, ...rest } = props;
  const cls = `${base} ${variants[variant]} ${className}`;

  if ("href" in props && props.href) {
    const { href, ...linkRest } = rest as ButtonAsLink;
    return (
      <Link href={href} className={cls} {...linkRest}>
        {children}
      </Link>
    );
  }

  return (
    <button className={cls} {...(rest as ButtonAsButton)}>
      {children}
    </button>
  );
}
