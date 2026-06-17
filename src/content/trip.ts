/**
 * Static, human-editable site content for the Howick 2026 mission trip.
 *
 * Trip facts and the narrative copy (focus areas, scripture, giving tiers,
 * prayer points) live here because they change rarely and are owned by the team,
 * not the public CMS flow. Blog posts, comments, likes, gallery photos, and the
 * team roster (names/bios/photos) live in Supabase and are edited from /admin.
 */

export const trip = {
  church: "Brave Church",
  title: "Howick 2026",
  location: "Howick, KwaZulu-Natal, South Africa",
  dates: "July 5–15, 2026",
  /** Used for the countdown + journey scenes. */
  departureISO: "2026-07-05T00:00:00",
  tagline:
    "Following the Howick 2026 mission team to South Africa — the people, the partners, and the story as it unfolds.",
  donateUrl: "https://brave.org/howick26",
};

/** Post categories (admin author dropdown + blog filter chips). */
export const POST_CATEGORIES = [
  "Update",
  "Playground",
  "Mural",
  "Evangelism",
  "Youth Retreat",
  "Sports Camp",
  "Travel",
  "Reflection",
] as const;

/** Photo categories (admin + gallery filter chips). */
export const PHOTO_CATEGORIES = [
  "Travel",
  "Playground",
  "Mural",
  "Evangelism",
  "Youth Retreat",
  "Sports Camp",
] as const;

/**
 * Fallback team roster — shown on the public site before any team rows exist in
 * Supabase (and when Supabase isn't configured). Once the team edits themselves
 * in /admin, the DB rows take over.
 */
export const teamFallback = [
  "Jarred Lewis",
  "Sky White",
  "Luke March",
  "Ana Levy",
  "Joe Levy",
  "Elizabeth Betsch",
  "Vickie Shaar",
  "Sam Thieman",
];

/** "The work in Howick" — five ministry focus areas on the home page. */
export const focusAreas = [
  {
    num: "01",
    title: "Build a Playground",
    desc: "Building a playground so the children of the community have a safe place to play, gather, and grow.",
  },
  {
    num: "02",
    title: "Paint a Mural",
    desc: "Painting a mural that brings color, beauty, and a lasting mark of hope to the community.",
  },
  {
    num: "03",
    title: "Evangelism",
    desc: "Sharing the Gospel in Howick South and Shiyaz, going to people where they are.",
  },
  {
    num: "04",
    title: "Youth Retreat",
    desc: "Hosting a retreat to encourage and equip local young leaders in their faith.",
  },
  {
    num: "05",
    title: "Sports Camp",
    desc: "Running a sports camp for the kids: playing hard, building friendships, pointing to Jesus.",
  },
];

/** Giving tiers shown on /give. */
export const tiers = [
  { amount: "$50", desc: "Supplies craft and sports-camp materials for the kids for a day." },
  { amount: "$150", desc: "Covers paint and supplies for a section of the community mural." },
  { amount: "$500", desc: "Sponsors a full team member's travel for the trip." },
];

/** Other ways to help (besides giving). */
export const helpWays = [
  { num: "01", title: "Pray", desc: "Join the prayer team and lift the team up daily through the trip." },
  { num: "02", title: "Share", desc: "Send this site to friends and family who might want to follow along or give." },
  { num: "03", title: "Send supplies", desc: "Donate sports gear, craft materials, and paint before we depart." },
];

/** Prayer points shown on /give. */
export const prayerPoints = [
  "Safe travel and good health for all eight team members.",
  "Unity, patience, and humility within the team.",
  "Open hearts in Howick South and Shiyaz as we share the Gospel.",
  "The children at the playground build and sports camp.",
  "The young leaders at the youth retreat.",
  "Energy, joy, and dependence on God for each full day.",
];

/** Sending church + ministry partners (used on the about page narrative). */
export const partners = [
  {
    name: "Brave Church",
    description:
      "Brave Church is an evangelical church with locations in Englewood and Westminster, Colorado, on a mission to awaken a Spirit-filled army to fight for the fulfillment of the Great Commission — and it is the sending church for the Howick 2026 team.",
    url: "https://brave.org",
  },
  {
    name: "Issachar Alliance",
    description:
      "The Issachar Alliance is a missions organization based in South Africa with a vision for every tribe, tongue, and nation. They equip local leaders to plant churches among unreached people groups, and are our ministry partner on the ground in Africa.",
    url: "https://www.issacharalliance.org",
  },
];

/** Days remaining until departure (clamped at 0). */
export function daysToDeparture(now: Date = new Date()): number {
  const dep = new Date(trip.departureISO).getTime();
  return Math.max(0, Math.ceil((dep - now.getTime()) / 86_400_000));
}
