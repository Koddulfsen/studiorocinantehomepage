import type { Metadata } from "next";
import {
  Inter, Fraunces, JetBrains_Mono, Caveat, Bebas_Neue, Lora,
  Cormorant_Garamond, Playfair_Display, Josefin_Sans, Crimson_Pro,
  DM_Serif_Display, Bodoni_Moda, Space_Grotesk, Syne, EB_Garamond,
  Raleway, Abril_Fatface, Libre_Baskerville, Nunito, Spectral,
  Italiana, Instrument_Serif, Big_Shoulders, Outfit,
} from "next/font/google";
import "./globals.css";

const inter          = Inter({          subsets: ["latin"], variable: "--font-inter",        display: "swap" });
const fraunces       = Fraunces({       subsets: ["latin"], variable: "--font-fraunces",     display: "swap", axes: ["SOFT", "opsz"] });
const jetbrains      = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains",    display: "swap" });
const caveat         = Caveat({         subsets: ["latin"], variable: "--font-caveat",        display: "swap" });
const bebasNeue      = Bebas_Neue({     subsets: ["latin"], variable: "--font-bebas",         display: "swap", weight: "400" });
const lora           = Lora({           subsets: ["latin"], variable: "--font-lora",          display: "swap" });
const cormorant      = Cormorant_Garamond({ subsets: ["latin"], variable: "--font-cormorant", display: "swap", weight: ["300","400","500","600"], style: ["normal","italic"] });
const playfair       = Playfair_Display({   subsets: ["latin"], variable: "--font-playfair",  display: "swap" });
const josefin        = Josefin_Sans({   subsets: ["latin"], variable: "--font-josefin",       display: "swap" });
const crimsonPro     = Crimson_Pro({    subsets: ["latin"], variable: "--font-crimson",       display: "swap", style: ["normal","italic"] });
const dmSerifDisplay = DM_Serif_Display({   subsets: ["latin"], variable: "--font-dm-serif",  display: "swap", weight: "400", style: ["normal","italic"] });
const bodoni         = Bodoni_Moda({    subsets: ["latin"], variable: "--font-bodoni",        display: "swap", style: ["normal","italic"] });
const spaceGrotesk   = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk", display: "swap" });
const syne           = Syne({           subsets: ["latin"], variable: "--font-syne",          display: "swap" });
const ebGaramond     = EB_Garamond({    subsets: ["latin"], variable: "--font-garamond",      display: "swap", style: ["normal","italic"] });
const raleway        = Raleway({        subsets: ["latin"], variable: "--font-raleway",       display: "swap" });
const abrilFatface   = Abril_Fatface({  subsets: ["latin"], variable: "--font-abril",         display: "swap", weight: "400" });
const libreBaskerville = Libre_Baskerville({ subsets: ["latin"], variable: "--font-baskerville", display: "swap", weight: ["400","700"], style: ["normal","italic"] });
const nunito         = Nunito({         subsets: ["latin"], variable: "--font-nunito",        display: "swap" });
const spectral       = Spectral({       subsets: ["latin"], variable: "--font-spectral",      display: "swap", weight: ["400","700"], style: ["normal","italic"] });
const italiana       = Italiana({       subsets: ["latin"], variable: "--font-italiana",      display: "swap", weight: "400" });
const instrumentSerif = Instrument_Serif({ subsets: ["latin"], variable: "--font-instrument", display: "swap", weight: "400", style: ["normal","italic"] });
const bigShoulders   = Big_Shoulders({ subsets: ["latin"], variable: "--font-shoulders", display: "swap", weight: ["400","500","600","700","800","900"] });
const outfit         = Outfit({         subsets: ["latin"], variable: "--font-outfit",        display: "swap" });

export const metadata: Metadata = {
  title: "Studio Rocinante — Websites, Tools & Custom Software",
  description: "We build websites, tools, and the odd impossible thing. Let us be the horse to take you there.",
  openGraph: {
    title: "Studio Rocinante — Websites, Tools & Custom Software",
    description: "We build websites, tools, and the odd impossible thing. Let us be the horse to take you there.",
    url: "https://studiorocinante.com",
    siteName: "Studio Rocinante",
    images: [{ url: "/solo-windmill-OG.png", width: 1200, height: 630, alt: "Studio Rocinante" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Studio Rocinante — Websites, Tools & Custom Software",
    description: "We build websites, tools, and the odd impossible thing. Let us be the horse to take you there.",
    images: ["/solo-windmill-OG.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const fonts = [
    inter, fraunces, jetbrains, caveat, bebasNeue, lora, cormorant,
    playfair, josefin, crimsonPro, dmSerifDisplay, bodoni, spaceGrotesk,
    syne, ebGaramond, raleway, abrilFatface, libreBaskerville, nunito, spectral,
    italiana, instrumentSerif, bigShoulders, outfit,
  ].map((f) => f.variable).join(" ");

  return (
    <html lang="en" className={fonts}>
      <body className="antialiased">
        <svg width="0" height="0" aria-hidden style={{ position: "absolute" }}>
          <defs>
            <filter id="sketch-rough">
              <feTurbulence type="fractalNoise" baseFrequency="0.006" numOctaves={1} seed={7} result="noise" />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.2" xChannelSelector="R" yChannelSelector="G" />
            </filter>
            <filter id="sketch-rough-strong">
              <feTurbulence type="fractalNoise" baseFrequency="0.012" numOctaves={3} seed={11} result="noise" />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="4.5" xChannelSelector="R" yChannelSelector="G" />
            </filter>
          </defs>
        </svg>
        {children}
      </body>
    </html>
  );
}
