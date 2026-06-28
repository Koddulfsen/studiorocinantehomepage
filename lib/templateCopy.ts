export interface MenuItem {
  name: string;
  desc?: string;
  price: string;
}

export interface TemplateCopy {
  tagline?: string;
  body?: string;
  cta?: string;
  eyebrow?: string;       // above-name label, e.g. "KOREAN CAFÉ · TORONTO"
  label?: string;         // primary section header, e.g. "WHAT WE DO"
  label2?: string;        // secondary section header, e.g. "FROM OUR KITCHEN"
  sections?: Array<{ title: string; body: string }>;  // feature/category blocks
  menuItems?: MenuItem[];
  slotCaptions?: Record<string, string>;  // "slot-1" → "latte art morning"
}
