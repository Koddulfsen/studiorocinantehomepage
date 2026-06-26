// Single source of truth for every template. Edit copy here and all 4 designs update.

export type IconName =
  | "globe"
  | "code"
  | "pencil"
  | "gears"
  | "windmill"
  | "compass"
  | "quill"
  | "spark"
  | "chart";

export const studio = {
  name: "Studio Rocinante",
  shortName: "Rocinante",
  location: "Toronto, Canada",
  email: "hello@studiorocinante.com",
  taglinePrimary: "Software, hand-built.",
  taglineAlt: "We build the things others tilt away from.",
  // Short, plain-language descriptions of what the studio is.
  introShort:
    "A Toronto software studio. We design and build websites, tools, and products — made with care, not stamped out of a template.",
  introLong:
    "Studio Rocinante is a small software studio in Toronto. We make websites, custom tools, and products for businesses that want something built by hand and built to last. We start with a strong draft, refine it with you, and hand over something that's truly yours.",
};

export type Service = {
  icon: IconName;
  title: string;
  blurb: string;
};

export const services: Service[] = [
  {
    icon: "globe",
    title: "Web Design & Development",
    blurb: "Fast, modern websites tailored to your business.",
  },
  {
    icon: "spark",
    title: "AI Solutions",
    blurb: "A second brain. Your own imagination sets the limits for what's possible.",
  },
  {
    icon: "code",
    title: "Custom Software",
    blurb:
      "A personal project or something to help run your daily operations smoothly? Let's bring your ideas to life.",
  },
];

export type Work = {
  title: string;
  category: string;
  blurb: string;
  image: string;
};

export const work: Work[] = [
  {
    title: "Mama's Guesthouse Cafe",
    category: "Web Design & Development",
    blurb: "Landing page for a high vibrational, humble cafe and guesthouse on Langkawi, Malaysia.",
    image: "/projects/mamasguesthousecafe/hero.png",
  },
  {
    title: "Nutri",
    category: "Custom Software · AI",
    blurb: "A nutritional calculator powered by an intuitive AI chat to log foods.",
    image: "/projects/nutri/full-screen.png",
  },
  {
    title: "Trade Deck",
    category: "Custom Software · Data Processing",
    blurb: "Backtesting tool for custom strategies, ranking them through a multidimensional metric system.",
    image: "/projects/tradedeck/backtestingdashboard.png",
  },
];

export type Step = {
  n: string;
  title: string;
  blurb: string;
};

// Mirrors the studio's collaborative pitch ("here's a draft, let's refine it together").
export const process: Step[] = [
  {
    n: "01",
    title: "Sketch",
    blurb:
      "We start with a real draft using your own photos and content — so you react to something concrete, not a blank page.",
  },
  {
    n: "02",
    title: "Refine",
    blurb:
      "We collaborate and adjust together until it's exactly what you want. No mystery, no jargon, no surprises.",
  },
  {
    n: "03",
    title: "Launch",
    blurb:
      "We build, host, and hand it over — live, fast, and fully yours to keep. We're here when you need a change.",
  },
];

// Things the studio can stand behind — no fabricated metrics.
export const promises: string[] = [
  "Honest, fixed pricing",
  "You own everything",
  "Built to last",
];

// The brand story — the windmill on the logo, the Quixote namesake.
export const about = {
  heading: "Why Rocinante",
  lede: "Rocinante was Don Quixote's horse.",
  body: [
    "It was the loyal, slightly stubborn companion that carried him toward windmills everyone else rode past. We took the name because good software is a little like that — you commit to the work, you sweat the details, and you build the thing people said wasn't worth doing.",
    "We're a small studio, on purpose. That means you talk to the people doing the work, every project gets real attention, and nothing ships that we wouldn't put our name on.",
  ],
  principles: [
    {
      title: "Made by hand",
      blurb: "Every line considered — like the windmill drawn on our logo.",
    },
    {
      title: "Plain language",
      blurb: "We tell you what we're doing and why, without the jargon.",
    },
    {
      title: "Built to last",
      blurb: "Fast, maintainable, and yours to keep. No lock-in.",
    },
  ],
};

export const nav = [
  { label: "Work", href: "#work" },
  { label: "Contact", href: "#contact" },
];

// Metadata for the gallery homepage that links to all four designs.
export type Template = {
  slug: string;
  label: string;
  philosophy: string;
  blurb: string;
};

// Four treatments of the same quest — each tells the hero's-journey arc its own way.
export const templates: Template[] = [
  {
    slug: "trail",
    label: "The Trail",
    philosophy: "Cartographer's Map",
    blurb:
      "A hand-inked path you travel as you scroll — terrain and light shifting from a dawn village to a triumphant summit.",
  },
  {
    slug: "manuscript",
    label: "The Manuscript",
    philosophy: "Illuminated Storybook",
    blurb:
      "Chapters of an illuminated tale, the gold leaf deepening as the story climbs toward triumph.",
  },
  {
    slug: "main",
    label: "The Main",
    philosophy: "Pen-and-Ink Poster",
    blurb:
      "High-contrast engraving that plunges into an inked night and breaks back out into the light.",
  },
  {
    slug: "horizon",
    label: "The Horizon",
    philosophy: "Atmospheric Minimal",
    blurb:
      "Restraint and big sky — the whole emotional arc carried by shifting light over a distant windmill.",
  },
];

// The eight emotional beats of the journey, shared by every variant.
export type Beat = {
  chapter: string;
  waypoint: string;
  title: string;
  line: string;
};

export const journey: Beat[] = [
  {
    chapter: "I",
    waypoint: "The Village",
    title: "It begins at home.",
    line: "As these things do — with an idea too stubborn to ignore.",
  },
  {
    chapter: "II",
    waypoint: "The Armory",
    title: "Choose your tools.",
    line: "Every quest needs the right kit. Here's what we carry.",
  },
  {
    chapter: "III",
    waypoint: "The Giants",
    title: "The windmills others ride past.",
    line: "The hard problems everyone said weren't worth fighting.",
  },
  {
    chapter: "IV",
    waypoint: "The Dark Stretch",
    title: "Where most ride off.",
    line: "Projects stall, studios go quiet. This is where we dig in.",
  },
  {
    chapter: "V",
    waypoint: "Rocinante",
    title: "You don't ride alone.",
    line: "The loyal companion that carries you toward the windmills.",
  },
  {
    chapter: "VI",
    waypoint: "The Summit",
    title: "Onward.",
    line: "The windmill turns — a friend now, not a foe. Let's begin yours.",
  },
];
