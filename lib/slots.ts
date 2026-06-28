export const CATEGORIES = ["dish", "atmosphere", "bar", "detail", "hero", "facade", "people"] as const;
export type Category = typeof CATEGORIES[number];

export interface SlotDef {
  id: string;
  label: string;
  defaultCategory: Category;
  defaultNumber: number;
}

export type SlotAssignment = { category: Category; number: number; stockNum?: number };
export type SlotConfig = Record<string, SlotAssignment>;

// Stock photos remaining after user's curation
export const STOCK_AVAILABLE: Record<Category, number[]> = {
  dish:       [4, 5, 6, 7, 8, 9, 10],
  atmosphere: [2, 7],
  bar:        [1, 2, 6],
  detail:     [1, 3, 4, 7],
  hero:       [2, 6, 8],
  facade:     [2, 3],
  people:     [2, 3, 4],
};

export function stockPhotoUrl(category: Category, stockNum: number): string {
  return `/stock/${category}/${category}-${String(stockNum).padStart(2, "0")}.jpg`;
}

export function stockPreviewUrl(category: Category, stockNum?: number): string {
  const n = stockNum ?? STOCK_AVAILABLE[category][0];
  return stockPhotoUrl(category, n);
}

export function clientPhotoUrl(slug: string, category: Category, number: number): string {
  return `/clients/${slug}/${category}-${number}.jpg`;
}

export const TEMPLATE_SLOTS: Record<string, SlotDef[]> = {
  "food-noir-ember": [
    { id: "slot-1", label: "Feature Photo", defaultCategory: "dish",        defaultNumber: 1 },
    { id: "slot-2", label: "Banner",        defaultCategory: "atmosphere",  defaultNumber: 1 },
  ],
  "food-noir-velvet": [
    { id: "slot-1", label: "Hero Image",    defaultCategory: "atmosphere",  defaultNumber: 1 },
    { id: "slot-2", label: "Story Image",   defaultCategory: "dish",        defaultNumber: 1 },
  ],
  "food-noir-obsidian": [
    { id: "slot-1", label: "Dish 1",        defaultCategory: "dish",        defaultNumber: 1 },
    { id: "slot-2", label: "Dish 2",        defaultCategory: "dish",        defaultNumber: 2 },
    { id: "slot-3", label: "Dish 3",        defaultCategory: "dish",        defaultNumber: 3 },
    { id: "slot-4", label: "Dish 4",        defaultCategory: "dish",        defaultNumber: 4 },
    { id: "slot-5", label: "Dish 5",        defaultCategory: "dish",        defaultNumber: 5 },
  ],
  "food-polaroid-candid": [
    { id: "slot-1", label: "Hero Photo",    defaultCategory: "atmosphere",  defaultNumber: 1 },
    { id: "slot-2", label: "Photo 1",       defaultCategory: "dish",        defaultNumber: 1 },
    { id: "slot-3", label: "Photo 2",       defaultCategory: "dish",        defaultNumber: 2 },
    { id: "slot-4", label: "Photo 3",       defaultCategory: "detail",      defaultNumber: 1 },
  ],
  "food-polaroid-contact": [
    { id: "slot-1", label: "Frame 1",       defaultCategory: "dish",        defaultNumber: 1 },
    { id: "slot-2", label: "Frame 2",       defaultCategory: "atmosphere",  defaultNumber: 1 },
    { id: "slot-3", label: "Frame 3",       defaultCategory: "dish",        defaultNumber: 2 },
    { id: "slot-4", label: "Frame 4",       defaultCategory: "detail",      defaultNumber: 1 },
  ],
  "food-polaroid-roll": [
    { id: "slot-1", label: "Hero Polaroid", defaultCategory: "atmosphere",  defaultNumber: 1 },
    { id: "slot-2", label: "Food 1",        defaultCategory: "dish",        defaultNumber: 1 },
    { id: "slot-3", label: "Food 2",        defaultCategory: "dish",        defaultNumber: 2 },
    { id: "slot-4", label: "Food 3",        defaultCategory: "dish",        defaultNumber: 3 },
  ],
  "atmosphere-corner-block": [
    { id: "slot-1", label: "Interior",      defaultCategory: "atmosphere",  defaultNumber: 1 },
    { id: "slot-2", label: "Since Photo",   defaultCategory: "atmosphere",  defaultNumber: 2 },
  ],
  "atmosphere-corner-chronicle": [
    { id: "slot-1", label: "Hero",          defaultCategory: "atmosphere",  defaultNumber: 1 },
    { id: "slot-2", label: "Atmosphere",    defaultCategory: "atmosphere",  defaultNumber: 2 },
  ],
  "atmosphere-corner-warmth": [
    { id: "slot-1", label: "Hero",          defaultCategory: "atmosphere",  defaultNumber: 1 },
    { id: "slot-2", label: "Story Image",   defaultCategory: "detail",      defaultNumber: 1 },
  ],
  "atmosphere-manor-cellar": [
    { id: "slot-1", label: "Hero Left",     defaultCategory: "atmosphere",  defaultNumber: 1 },
    { id: "slot-2", label: "Strip",         defaultCategory: "detail",      defaultNumber: 1 },
  ],
  "atmosphere-manor-salon": [
    { id: "slot-1", label: "Hero",          defaultCategory: "atmosphere",  defaultNumber: 1 },
    { id: "slot-2", label: "Interior",      defaultCategory: "atmosphere",  defaultNumber: 2 },
  ],
  "atmosphere-manor-suite": [
    { id: "slot-1", label: "Main Image",    defaultCategory: "atmosphere",  defaultNumber: 1 },
  ],
  "bold-marquee-billboard": [],
  "bold-marquee-signal": [
    { id: "slot-1", label: "Hero Image",    defaultCategory: "atmosphere",  defaultNumber: 1 },
    { id: "slot-2", label: "Menu Image",    defaultCategory: "bar",         defaultNumber: 1 },
  ],
  "bold-marquee-stamp": [
    { id: "slot-1", label: "Background",    defaultCategory: "atmosphere",  defaultNumber: 1 },
    { id: "slot-2", label: "Menu Left",     defaultCategory: "dish",        defaultNumber: 1 },
    { id: "slot-3", label: "Menu Right",    defaultCategory: "dish",        defaultNumber: 2 },
  ],
  "bold-neon-clash": [
    { id: "slot-1", label: "About Image",   defaultCategory: "atmosphere",  defaultNumber: 1 },
  ],
  "bold-neon-pulse": [
    { id: "slot-1", label: "Hero Right",    defaultCategory: "atmosphere",  defaultNumber: 1 },
  ],
  "bold-neon-volt": [
    { id: "slot-1", label: "Hero Image",    defaultCategory: "atmosphere",  defaultNumber: 1 },
  ],
  "minimal-manor-linen": [
    { id: "slot-1", label: "Split Image",   defaultCategory: "dish",        defaultNumber: 1 },
    { id: "slot-2", label: "Hero Image",    defaultCategory: "atmosphere",  defaultNumber: 1 },
  ],
  "minimal-manor-paper": [
    { id: "slot-1", label: "Main Image",    defaultCategory: "dish",        defaultNumber: 1 },
    { id: "slot-2", label: "Side Image",    defaultCategory: "detail",      defaultNumber: 1 },
  ],
  "minimal-manor-slate": [
    { id: "slot-1", label: "Main Image",    defaultCategory: "dish",        defaultNumber: 1 },
  ],
  "story-broadsheet-byline": [
    { id: "slot-1", label: "Spread Image",  defaultCategory: "atmosphere",  defaultNumber: 1 },
    { id: "slot-2", label: "Menu Image",    defaultCategory: "dish",        defaultNumber: 1 },
  ],
  "story-broadsheet-feature": [
    { id: "slot-1", label: "Hero Image",    defaultCategory: "atmosphere",  defaultNumber: 1 },
  ],
  "story-broadsheet-ledger": [
    { id: "slot-1", label: "Hero Image",    defaultCategory: "atmosphere",  defaultNumber: 1 },
  ],
  "story-market-grove": [
    { id: "slot-1", label: "Hero Image",    defaultCategory: "atmosphere",  defaultNumber: 1 },
    { id: "slot-2", label: "Story Photo 1", defaultCategory: "atmosphere",  defaultNumber: 2 },
    { id: "slot-3", label: "Story Photo 2", defaultCategory: "detail",      defaultNumber: 1 },
    { id: "slot-4", label: "Story Photo 3", defaultCategory: "people",      defaultNumber: 1 },
  ],
  "story-market-harvest": [
    { id: "slot-1", label: "Story Image",   defaultCategory: "people",      defaultNumber: 1 },
  ],
  "story-market-pantry": [
    { id: "slot-1", label: "Hero Image",    defaultCategory: "atmosphere",  defaultNumber: 1 },
    { id: "slot-2", label: "Bread Photo",   defaultCategory: "dish",        defaultNumber: 1 },
    { id: "slot-3", label: "Pastry Photo",  defaultCategory: "dish",        defaultNumber: 2 },
    { id: "slot-4", label: "Lunch Photo",   defaultCategory: "dish",        defaultNumber: 3 },
  ],
  "minimal-mochi-hana": [
    { id: "slot-1", label: "Hero Photo",   defaultCategory: "atmosphere", defaultNumber: 1 },
    { id: "slot-2", label: "Photo Left",   defaultCategory: "detail",     defaultNumber: 1 },
    { id: "slot-3", label: "Photo Right",  defaultCategory: "detail",     defaultNumber: 3 },
    { id: "slot-4", label: "Visit Image",  defaultCategory: "atmosphere", defaultNumber: 2 },
  ],
};

export function defaultConfig(templateId: string): SlotConfig {
  const defs = TEMPLATE_SLOTS[templateId] ?? [];
  return Object.fromEntries(defs.map((d) => [d.id, { category: d.defaultCategory, number: d.defaultNumber }]));
}

export function resolveSlotVars(
  config: SlotConfig,
  mode: "stock" | "client",
  slug?: string
): Record<string, string> {
  const vars: Record<string, string> = {};
  for (const [slotId, assignment] of Object.entries(config)) {
    const url =
      mode === "stock"
        ? stockPreviewUrl(assignment.category, assignment.stockNum)
        : clientPhotoUrl(slug!, assignment.category, assignment.number);
    vars[`--${slotId}`] = `url(${url})`;
  }
  return vars;
}
