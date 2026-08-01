export const SITE = {
  name: "Futbol Fans Zone",
  tagline: "For the fans.",
  description:
    "Fan-first football storytelling — debate, quiz shows, match reactions, and the culture that lives beyond the final whistle.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://futbolfanzone.com",
  email: "hello@futbolfanzone.com",
  phone: "+1 (555) 010-ZONE",
} as const;

export const SOCIAL = {
  instagram: "https://www.instagram.com/futbolfanszone_/",
  tiktok: "https://www.tiktok.com/@futbolfanszone",
  youtube: "https://www.youtube.com/@FutbolfansZone",
  twitter: "https://x.com/FutbolFansZone",
} as const;

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/shows", label: "Shows" },
  { href: "/apply", label: "Apply" },
  { href: "/about", label: "About" },
  { href: "/partners", label: "Partners" },
  { href: "/shop", label: "Shop" },
  { href: "/contact", label: "Contact" },
] as const;

export const SHOWS = [
  {
    slug: "fan-quiz",
    title: "Fan Quiz",
    blurb:
      "Think you know the game? Prove it live — rapid-fire rounds, rival banter, and bragging rights.",
    cta: "Apply as a contestant",
    applyType: "quiz" as const,
  },
  {
    slug: "debate-desk",
    title: "Debate Desk",
    blurb:
      "Hot takes only. Transfers, tactics, and the calls that split the fanbase — no filter.",
    cta: "Join the panel",
    applyType: "general" as const,
  },
  {
    slug: "match-reaction",
    title: "Match Reaction",
    blurb:
      "Post-whistle energy. Instant reactions, player ratings, and the moments that defined the night.",
    cta: "Be on the show",
    applyType: "general" as const,
  },
] as const;

export const HOSTS = [
  {
    name: "Coming Soon",
    role: "Host",
    bio: "Meet the voices behind Futbol Fans Zone as the roster grows.",
  },
  {
    name: "Coming Soon",
    role: "Analyst",
    bio: "Sharp takes, deep knowledge, zero fluff.",
  },
  {
    name: "Coming Soon",
    role: "Correspondent",
    bio: "On the ground with the fans who live and breathe the game.",
  },
] as const;

export const STATS = [
  { label: "Social reach", value: "Growing", suffix: "" },
  { label: "Weekly drops", value: "3+", suffix: "" },
  { label: "Fan community", value: "Global", suffix: "" },
] as const;
