import type { RadiusPreset } from "./fontPresets";
import type { TemplateCopy } from "./templateCopy";

export interface TemplateVersion {
  version: number;
  templateId: string;
  fontPreset: string;
  radius: RadiusPreset;
  accent: string;
  titleSize: number;
  titleWeight?: number;
  titleTransform: "none" | "uppercase" | "lowercase";
  slots: Record<string, string>;
  copy?: TemplateCopy;
}

export interface ClientConfig {
  vibe?: string;
  templates: TemplateVersion[];
}
