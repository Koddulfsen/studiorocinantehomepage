import * as fs from "fs";
import * as path from "path";
import { photoUrl } from "./places";
import { PHOTO_MAX_WIDTH } from "../config";

export async function downloadPhotos(
  photoRefs: string[],
  destDir: string
): Promise<string[]> {
  fs.mkdirSync(destDir, { recursive: true });
  const saved: string[] = [];

  for (let i = 0; i < photoRefs.length; i++) {
    const url = photoUrl(photoRefs[i], PHOTO_MAX_WIDTH);
    try {
      const res = await fetch(url);
      if (!res.ok) continue;

      // Google redirects to the actual image — fetch follows redirects by default
      const contentType = res.headers.get("content-type") ?? "image/jpeg";
      const ext = contentType.includes("png") ? "png" : "jpg";
      const filename = `photo-${i + 1}.${ext}`;
      const filepath = path.join(destDir, filename);

      const buffer = Buffer.from(await res.arrayBuffer());
      fs.writeFileSync(filepath, buffer);
      saved.push(filename);
    } catch {
      // skip failed photos, don't block the whole lead
    }
  }

  return saved;
}
