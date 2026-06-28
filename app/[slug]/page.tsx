import { notFound } from "next/navigation";
import * as fs from "fs";
import * as path from "path";
import { ClientTemplateRenderer } from "@/components/ClientTemplateRenderer";
import type { ClientConfig } from "@/lib/clientConfig";
import type { ClientData } from "@/lib/clientContext";

const LEADS_DIR   = path.resolve(process.cwd(), "leads");
const CLIENTS_DIR = path.resolve(process.cwd(), "data/clients");

interface LeadSummary {
  slug: string;
  placeId: string;
  name: string;
  address: string;
  phone?: string;
  social?: string;
  neighbourhood: string;
  area: string;
  city: string;
  province: string;
  country: string;
  types: string[];
  photoCount: number;
}

function loadLead(slug: string): LeadSummary | null {
  const indexPath = path.join(LEADS_DIR, "index.json");
  if (!fs.existsSync(indexPath)) return null;
  const index: LeadSummary[] = JSON.parse(fs.readFileSync(indexPath, "utf8"));
  return index.find((l) => l.slug === slug) ?? null;
}

function loadConfig(slug: string): ClientConfig | null {
  const p = path.join(CLIENTS_DIR, `${slug}.json`);
  if (!fs.existsSync(p)) return null;
  return JSON.parse(fs.readFileSync(p, "utf8"));
}

export default async function ClientPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Parse "some-cafe-1" → clientSlug="some-cafe", version=1
  const match = slug.match(/^(.+)-(\d+)$/);
  if (!match) notFound();
  const [, clientSlug, versionStr] = match;
  const version = parseInt(versionStr, 10);

  const config = loadConfig(clientSlug);
  if (!config) notFound();

  const tv = config.templates.find((t) => t.version === version);
  if (!tv) notFound();

  const lead = loadLead(clientSlug);

  // Fall back to slug-derived data if client isn't in the leads index
  const clientData: ClientData = lead
    ? {
        name:          lead.name,
        address:       lead.address,
        neighbourhood: lead.neighbourhood,
        city:          lead.city,
        phone:         lead.phone,
        social:        lead.social,
        cuisine:       lead.types[0],
      }
    : {
        name:          clientSlug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
        address:       "Toronto, ON",
        neighbourhood: "",
        city:          "Toronto",
      };

  return <ClientTemplateRenderer tv={tv} lead={clientData} />;
}
