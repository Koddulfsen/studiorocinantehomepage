import type { Metadata } from "next";
import { Inter, Fraunces, JetBrains_Mono, Caveat } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// Old-style serif for the editorial / heritage voice.
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["SOFT", "opsz"],
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

// Handwritten marker for the hand-drawn annotations.
const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Studio Rocinante — Websites, Tools & Custom Software",
  description:
    "We build websites, tools, and the odd impossible thing. Let us be the horse to take you there.",
  openGraph: {
    title: "Studio Rocinante — Websites, Tools & Custom Software",
    description:
      "We build websites, tools, and the odd impossible thing. Let us be the horse to take you there.",
    url: "https://studiorocinante.com",
    siteName: "Studio Rocinante",
    images: [
      {
        url: "/solo-windmill-OG.png",
        width: 1200,
        height: 630,
        alt: "Studio Rocinante",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Studio Rocinante — Websites, Tools & Custom Software",
    description:
      "We build websites, tools, and the odd impossible thing. Let us be the horse to take you there.",
    images: ["/solo-windmill-OG.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${fraunces.variable} ${jetbrains.variable} ${caveat.variable}`}
    >
      <body className="antialiased">
        {/* Global hand-drawn wobble filter — every sketch element references this. */}
        <svg width="0" height="0" aria-hidden style={{ position: "absolute" }}>
          <defs>
            <filter id="sketch-rough">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.006"
                numOctaves={1}
                seed={7}
                result="noise"
              />
              <feDisplacementMap
                in="SourceGraphic"
                in2="noise"
                scale="1.2"
                xChannelSelector="R"
                yChannelSelector="G"
              />
            </filter>
            <filter id="sketch-rough-strong">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.012"
                numOctaves={3}
                seed={11}
                result="noise"
              />
              <feDisplacementMap
                in="SourceGraphic"
                in2="noise"
                scale="4.5"
                xChannelSelector="R"
                yChannelSelector="G"
              />
            </filter>
          </defs>
        </svg>
        {children}
      </body>
    </html>
  );
}
