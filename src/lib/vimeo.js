// Admins paste either a bare Vimeo ID or a Vimeo link into a lesson's
// `videoUrl` field (see the curriculum editor in the admin project). This
// turns whatever they typed into the numeric id (+ privacy hash, for
// unlisted videos) that player.vimeo.com's embed iframe needs.
//
// Accepted inputs:
//   "76979871"
//   "https://vimeo.com/76979871"
//   "https://vimeo.com/76979871/1c3e3a1b1a"   (unlisted, id/hash)
//   "https://player.vimeo.com/video/76979871"
//   "https://player.vimeo.com/video/76979871?h=1c3e3a1b1a"
export function parseVimeoVideo(input) {
  const value = (input ?? "").trim();
  if (!value) return null;

  if (/^\d+$/.test(value)) {
    return { id: value, hash: null };
  }

  try {
    const url = new URL(value);
    const segments = url.pathname.split("/").filter(Boolean);
    // player.vimeo.com/video/ID  ->  ["video", "ID"]
    // vimeo.com/ID               ->  ["ID"]
    // vimeo.com/ID/HASH          ->  ["ID", "HASH"]
    const videoIndex = segments[0] === "video" ? 1 : 0;
    const id = segments[videoIndex];
    const hash = segments[videoIndex + 1] || url.searchParams.get("h");

    if (!id || !/^\d+$/.test(id)) return null;
    return { id, hash: hash || null };
  } catch {
    return null;
  }
}
