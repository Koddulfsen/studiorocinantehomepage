export const PACKAGES: Record<string, { priceId: string; name: string }> = {
  gbp: {
    priceId: "price_1Tq7SRDrg0mwRnvZSqLE9le8",
    name: "Google Maps Visibility",
  },
  web: {
    priceId: "price_1Tq7SvDrg0mwRnvZ4sefZXjo",
    name: "Website & Hosting",
  },
  full: {
    priceId: "price_1Tq7ToDrg0mwRnvZ1NpbKcj0",
    name: "Full Online Presence",
  },
};

export const PACKAGE_NAMES_BY_PRICE_ID: Record<string, string> = Object.fromEntries(
  Object.values(PACKAGES).map((pkg) => [pkg.priceId, pkg.name])
);
