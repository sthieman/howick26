/**
 * Static, human-editable site content for the Howick 2026 mission trip.
 *
 * This is intentionally plain data (not in the database): trip facts, the team
 * roster, and ministry partners change rarely and are owned by the team, not by
 * the public CMS flow. Blog posts, comments, likes, and gallery photos live in
 * Supabase. Edit the copy here freely — /design-sync will style how it renders.
 */

export const trip = {
  church: "Brave Church",
  title: "Howick 2026",
  location: "Howick, KwaZulu-Natal, South Africa",
  dates: "July 5–15, 2026",
  tagline:
    "Following the Howick 2026 mission team to South Africa — the people, the partners, and the story as it unfolds.",
  donateUrl: "https://brave.org/howick26",
};

export type TeamMember = {
  name: string;
  role?: string;
  bio?: string;
  photo?: string; // /public path or remote URL
};

export const team: TeamMember[] = [
  { name: "Jarred Lewis" },
  { name: "Ana Levy" },
  { name: "Joe Levy" },
  { name: "Sky White" },
  { name: "Luke March" },
  { name: "Elizabeth Betsch" },
  { name: "Vickie Shaar" },
  { name: "Sam Thieman" },
];

export type Partner = {
  name: string;
  description: string;
  url?: string;
  logo?: string;
};

export const partners: Partner[] = [
  {
    name: "Brave Church",
    description:
      "Brave Church is an evangelical church with locations in Englewood and Westminster, Colorado, on a mission to awaken a Spirit-filled army to fight for the fulfillment of the Great Commission. It raises up believers who are resolute in their identity in Christ and engaged in spreading the gospel — and it is the sending church for the Howick 2026 team.",
    url: "https://brave.org",
  },
  {
    name: "Issachar Alliance",
    description:
      "The Issachar Alliance is a missions organization based in South Africa with a vision for every tribe, tongue, and nation. They equip local leaders to plant churches among unreached people groups, confronting “The Great Imbalance” in which less than 2% of missional resources reach the billions who have yet to hear about Jesus. They are our ministry partner on the ground in Africa.",
    url: "https://www.issacharalliance.org",
  },
];

/** What the trip is about — landing page narrative blocks. */
export const about = {
  heading: "About the Trip",
  body: [
    "From July 5–15, 2026, a team of eight from Brave Church is traveling to Howick, in South Africa's KwaZulu-Natal province, to serve alongside the Issachar Alliance.",
    "Over ten days the team will come alongside local leaders and the work already happening on the ground — sharing the gospel, encouraging the local church, and supporting the Issachar Alliance's mission to reach unreached people groups across Africa.",
    "This site follows the journey — who's going, who we're partnering with, and the story as it unfolds through the team's own posts and photos.",
  ],
};
