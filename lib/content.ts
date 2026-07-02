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
  | "chart"
  | "star"
  | "mappin";

export const studio = {
  name: "Studio Rocinante",
  shortName: "Rocinante",
  location: "Toronto, Canada",
  email: "hello@studiorocinante.com",
  taglinePrimary: "Your online presence, handled.",
  taglineAlt: "We get local businesses found.",
  introShort:
    "We build websites and manage Google listings for local businesses. You focus on the business — we handle the rest.",
  introLong:
    "Studio Rocinante helps local businesses show up online. We set up and manage your Google listing, build your website, and make sure customers can find you. One point of contact, one monthly fee, everything handled.",
};

export type Service = {
  icon: IconName;
  title: string;
  hook: string;
  description: string;
};

export const services: Service[] = [
  {
    icon: "mappin",
    title: "Google Maps",
    hook: "Get found.",
    description: "When someone searches nearby, you show up. We set up and manage your listing.",
  },
  {
    icon: "globe",
    title: "Website & Hosting",
    hook: "Look the part.",
    description: "A custom website, built by hand. Hosted and maintained — nothing to touch.",
  },
  {
    icon: "star",
    title: "Review Cards",
    hook: "Get chosen.",
    description: "Printed cards delivered to your door. Customers scan, leave a review. More reviews, higher ranking.",
  },
];

export type Work = {
  title: string;
  category: string;
  description: string;
  images: string[];
  tag?: string;
  imageFit?: "cover" | "contain";
};

export const work: Work[] = [
  {
    title: "Mama's Guesthouse Cafe",
    category: "Website & Hosting",
    description: "A beloved spot on Langkawi — just needed a home online.",
    images: ["/projects/mamasguesthousecafe/full page.png"],
  },
  {
    title: "Homestay Pulau Tuba",
    category: "Website & Hosting · Google Maps",
    description: "Remote island homestay. We got them a site, a Google listing, and on the map.",
    imageFit: "contain",
    images: ["/projects/homestaypulautuba/community.png"],
  },
];

export type Step = {
  n: string;
  title: string;
  description: string;
};

// Mirrors the studio's collaborative pitch ("here's a draft, let's refine it together").
export const process: Step[] = [
  {
    n: "01",
    title: "We talk",
    description:
      "Tell us about your business. We handle the rest — no tech knowledge needed.",
  },
  {
    n: "02",
    title: "We set up",
    description:
      "Your Google listing, website, and directories — set up correctly and completely.",
  },
  {
    n: "03",
    title: "You get found",
    description:
      "Customers find you on Google Maps and your website. We keep everything running.",
  },
];

// Things the studio can stand behind — no fabricated metrics.
export const promises: string[] = [
  "No lock-in",
  "Fixed monthly pricing",
  "Cancel anytime",
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
      description: "Every line considered — like the windmill drawn on our logo.",
    },
    {
      title: "Plain language",
      description: "We tell you what we're doing and why, without the jargon.",
    },
    {
      title: "Built to last",
      description: "Fast, maintainable, and yours to keep. No lock-in.",
    },
  ],
};

export const nav = [
  { label: "Services", href: "/services" },
  { label: "Contact", href: "#contact" },
];

// Metadata for the gallery homepage that links to all four designs.
export type Template = {
  slug: string;
  label: string;
  philosophy: string;
  description: string;
};

// Four treatments of the same quest — each tells the hero's-journey arc its own way.
export const templates: Template[] = [
  {
    slug: "trail",
    label: "The Trail",
    philosophy: "Cartographer's Map",
    description:
      "A hand-inked path you travel as you scroll — terrain and light shifting from a dawn village to a triumphant summit.",
  },
  {
    slug: "manuscript",
    label: "The Manuscript",
    philosophy: "Illuminated Storybook",
    description:
      "Chapters of an illuminated tale, the gold leaf deepening as the story climbs toward triumph.",
  },
  {
    slug: "main",
    label: "The Main",
    philosophy: "Pen-and-Ink Poster",
    description:
      "High-contrast engraving that plunges into an inked night and breaks back out into the light.",
  },
  {
    slug: "horizon",
    label: "The Horizon",
    philosophy: "Atmospheric Minimal",
    description:
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
    title: "What's on your mind?",
    line: "The windmill turns — a friend now, not a foe. Let's begin yours.",
  },
];
