import type { Metadata } from "next";
import { Oswald, Montserrat, Open_Sans } from "next/font/google";
import "./globals.css";
import { trip } from "@/content/trip";

// Brand type stack (free Google equivalents of Brave's Draught / Montserrat / proxima-nova).
const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: `${trip.title} — ${trip.church}`,
    template: `%s — ${trip.title}`,
  },
  description: trip.tagline,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${oswald.variable} ${montserrat.variable} ${openSans.variable} antialiased`}
    >
      {/* No marketing chrome here — the (site) route group adds the header/footer.
          /admin and /login render their own full-screen layouts. */}
      <body style={{ background: "var(--paper)", color: "var(--ink)", overflowX: "clip" }}>
        {children}
      </body>
    </html>
  );
}
