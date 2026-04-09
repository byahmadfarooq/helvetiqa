export function siteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL ?? "https://helvetiqa.com";
}

export const socialLinks = {
  linkedin: "https://www.linkedin.com/company/helvetiqaofficial/",
  instagram: "https://www.instagram.com/helvetiqaofficial",
  facebook: "https://www.facebook.com/helvetiqaofficial",
  whatsapp: "https://api.whatsapp.com/send?phone=923113322319",
  email: "byahmadfarooq@outlook.com",
} as const;

export type ServiceSlug =
  | "linkedin"
  | "instagram"
  | "paid-ads"
  | "brand-strategy"
  | "funnels"
  | "community"
  | "web-tech";

export type Service = {
  number: string;
  name: string;
  slug: ServiceSlug;
  oneLiner: string;
  description: string;
  deliverables: string[];
  process: { title: string; body: string }[];
  relatedWork: WorkSlug[];
};

export type WorkSlug =
  | "nick-farrenkopf"
  | "o-millionaire"
  | "arka-saas"
  | "etimad-ngo"
  | "coin-bureau";

export type WorkCaseStudy = {
  slug: WorkSlug;
  client: string;
  category: string;
  metric: string;
  description: string;
  challenge: string;
  approach: string[];
  results: { label: string; value: string }[];
};

export const services: Service[] = [
  {
    number: "01",
    name: "LinkedIn & Content",
    slug: "linkedin",
    oneLiner: "Authority that reads clean and converts.",
    description:
      "We write and package your ideas so the right people trust you fast. It is content with a job: booked calls.",
    deliverables: [
      "Ghostwriting",
      "Carousels",
      "Lead magnets",
      "Profile optimization",
      "Engagement strategy",
      "Calendar links in lead magnets",
    ],
    process: [
      { title: "Audit", body: "We review your profile, posts, and offer. We note what is missing and what is wasting attention." },
      { title: "Position", body: "We lock your angle. One clear promise. One clear audience. No vague claims." },
      { title: "Pillars", body: "We build three pillars that you can post from for months without forcing topics." },
      { title: "Packaging", body: "We turn ideas into posts, carousels, and lead magnets that carry a simple next step." },
      { title: "Distribution", body: "We set an engagement rhythm and a calendar so the work stays consistent." },
    ],
    relatedWork: ["nick-farrenkopf", "coin-bureau"],
  },
  {
    number: "02",
    name: "Instagram & Video",
    slug: "instagram",
    oneLiner: "Video that holds attention and moves the next click.",
    description:
      "We script, edit, and plan reels that feel native. We also build the DM path that turns views into leads.",
    deliverables: [
      "Scripts",
      "Video editing",
      "Reels strategy",
      "Profile optimization",
      "DM-to-lead systems",
      "Community management",
    ],
    process: [
      { title: "Angle", body: "We pick a repeatable hook style and a format that fits your voice." },
      { title: "Script", body: "We write tight scripts with clear cuts, pacing, and one call to action." },
      { title: "Edit", body: "We edit for clarity first. Captions, pacing, and retention points." },
      { title: "Profile", body: "We tune your profile so a new viewer knows who you help in five seconds." },
      { title: "DM flow", body: "We map replies into a simple lead path. No spam. No weird automations." },
    ],
    relatedWork: ["coin-bureau"],
  },
  {
    number: "03",
    name: "Paid Advertising",
    slug: "paid-ads",
    oneLiner: "Spend with control. Learn fast. Scale what works.",
    description:
      "We build campaigns that make the numbers obvious. Creative, targeting, retargeting, and conversion work as one system.",
    deliverables: [
      "Meta ads",
      "Google ads",
      "LinkedIn ads",
      "Retargeting",
      "Ad creative development",
      "Conversion optimization",
    ],
    process: [
      { title: "Offer check", body: "We pressure test the offer and landing flow. Ads cannot fix a broken page." },
      { title: "Creative plan", body: "We write angles and concepts. Then we build variations that can run at scale." },
      { title: "Build", body: "We set up campaigns with clean naming, tracking, and guardrails." },
      { title: "Iterate", body: "We cut losers fast and double down on what holds CPM and click quality." },
      { title: "Improve conversion", body: "We tune landing and follow-up so clicks turn into calls." },
    ],
    relatedWork: ["o-millionaire"],
  },
  {
    number: "04",
    name: "Brand & Strategy",
    slug: "brand-strategy",
    oneLiner: "A position people can repeat.",
    description:
      "We map your audience, messaging, and tone so every post and page sounds like the same brand. No mixed signals.",
    deliverables: [
      "Personal branding",
      "Positioning",
      "ICP mapping",
      "Content pillars",
      "Messaging",
      "Tone development",
    ],
    process: [
      { title: "Research", body: "We review your market, competitors, and the language your buyers already use." },
      { title: "ICP map", body: "We define who you win with and who you ignore. This cuts content confusion." },
      { title: "Message", body: "We write your core promise, proof points, and objections." },
      { title: "Tone", body: "We define voice rules so writing stays consistent across platforms." },
      { title: "System", body: "We translate strategy into a repeatable content and funnel plan." },
    ],
    relatedWork: ["nick-farrenkopf", "coin-bureau"],
  },
  {
    number: "05",
    name: "Funnels & Conversion",
    slug: "funnels",
    oneLiner: "A simple path from interest to booked calls.",
    description:
      "We build landing pages, qualification steps, and follow-up flows that remove friction. Every step earns the next.",
    deliverables: [
      "Landing pages",
      "3-step qualification",
      "Sales systems",
      "Onboarding flows",
      "Conversion optimization",
    ],
    process: [
      { title: "Flow map", body: "We map the shortest path from click to call without cutting trust." },
      { title: "Page build", body: "We build a landing page that answers the three questions buyers always ask." },
      { title: "Qualify", body: "We add a short qualification step to protect your calendar." },
      { title: "Follow-up", body: "We set an email or DM follow-up that is helpful and direct." },
      { title: "Improve", body: "We test copy, sections, and CTAs based on real behavior." },
    ],
    relatedWork: ["o-millionaire", "nick-farrenkopf"],
  },
  {
    number: "06",
    name: "Community & Email",
    slug: "community",
    oneLiner: "Retention, referrals, and revenue from your audience.",
    description:
      "We build the rhythm behind your community and newsletter. It stays active. It stays useful. It sells without pushing.",
    deliverables: [
      "Community management",
      "Newsletter setup",
      "Drip campaigns",
      "Skool/Circle build",
      "Audience monetization",
    ],
    process: [
      { title: "Structure", body: "We set up sections, permissions, and onboarding so members know where to go." },
      { title: "Content plan", body: "We design weekly formats that members can rely on." },
      { title: "Drips", body: "We build an email sequence that teaches and moves readers to a clear next step." },
      { title: "Ops", body: "We define moderation, posting cadence, and response rules." },
      { title: "Monetize", body: "We map offers that fit the community stage and attention level." },
    ],
    relatedWork: ["coin-bureau"],
  },
  {
    number: "07",
    name: "Web & Tech Builds",
    slug: "web-tech",
    oneLiner: "Fast builds that ship clean and stay stable.",
    description:
      "We build websites and product dashboards with React and Supabase. It deploys on Vercel. It is easy to maintain.",
    deliverables: [
      "React web apps",
      "SaaS dashboards",
      "Landing pages",
      "NGO sites",
      "Supabase backend",
      "Vercel deployment",
    ],
    process: [
      { title: "Scope", body: "We define modules, roles, and data needs. No mystery features." },
      { title: "Design", body: "We design the flow and screens so the product feels obvious." },
      { title: "Build", body: "We ship in tight milestones. Frontend and backend move together." },
      { title: "Harden", body: "We add auth, guardrails, and clean error handling." },
      { title: "Deploy", body: "We deploy on Vercel and connect Supabase. We document the handoff." },
    ],
    relatedWork: ["arka-saas", "etimad-ngo"],
  },
];

export const work: WorkCaseStudy[] = [
  {
    slug: "nick-farrenkopf",
    client: "Nick FarrenKopf",
    category: "LinkedIn Authority",
    metric: "10K monthly impressions",
    description:
      "Profile rebuild, content strategy, three pillars, and ghostwriting to establish EdTech thought leadership.",
    challenge:
      "Nick had strong ideas and proof, but the profile and posting rhythm did not translate into steady inbound.",
    approach: [
      "Rebuilt the profile around one clear promise and stronger proof.",
      "Defined three content pillars that matched buyer intent.",
      "Wrote posts that taught fast and ended with a clear next step.",
      "Set an engagement rhythm that supported distribution without burning time.",
    ],
    results: [
      { label: "Monthly impressions", value: "10K" },
      { label: "Positioning", value: "EdTech authority" },
      { label: "Content system", value: "3 clear pillars" },
    ],
  },
  {
    slug: "o-millionaire",
    client: "O! Millionaire",
    category: "Paid Advertising",
    metric: "10.5M impressions, $0.97 CPM",
    description:
      "Meta campaigns, creative development, and retargeting built to keep spend efficient and clicks high quality.",
    challenge:
      "The brand needed scale without losing control of cost and message clarity across audiences.",
    approach: [
      "Built a creative matrix with angles that could produce variants fast.",
      "Launched prospecting and retargeting with clear naming and tracking.",
      "Iterated weekly based on CPM, click quality, and landing behavior.",
      "Improved conversion points to match ad intent and reduce drop-off.",
    ],
    results: [
      { label: "Impressions", value: "10.5M" },
      { label: "Link clicks", value: "14,557" },
      { label: "CPM", value: "$0.97" },
    ],
  },
  {
    slug: "arka-saas",
    client: "ARKA",
    category: "Web & Tech Build",
    metric: "Built solo in under 24 hours",
    description:
      "Full React and Supabase dashboard with seven modules, kanban, analytics, and pipelines. Deployed on Vercel.",
    challenge:
      "The product needed a working internal dashboard fast, with real data flows and clean UX.",
    approach: [
      "Scoped seven modules and mapped data tables up front.",
      "Built a dashboard shell with routing, auth, and role checks.",
      "Shipped kanban, analytics, and pipeline views as core workflows.",
      "Deployed on Vercel with Supabase backend wired end to end.",
    ],
    results: [
      { label: "Build time", value: "Under 24 hours" },
      { label: "Modules shipped", value: "7" },
      { label: "Deployment", value: "Live on Vercel" },
    ],
  },
  {
    slug: "etimad-ngo",
    client: "Etimad NGO",
    category: "Web & Tech Build",
    metric: "25,000+ people reached",
    description:
      "Bilingual site in Urdu and English with donation and volunteer flows. Built pro bono for a growing NGO.",
    challenge:
      "The NGO needed trust, clarity, and simple actions for donors and volunteers across two languages.",
    approach: [
      "Designed a five-page structure with clear intent per page.",
      "Built bilingual navigation and content layout.",
      "Added donation and volunteer registration flows.",
      "Optimized for fast load and mobile-first access.",
    ],
    results: [
      { label: "Families served", value: "130+" },
      { label: "People reached", value: "25,000+" },
      { label: "Mode", value: "Pro bono" },
    ],
  },
  {
    slug: "coin-bureau",
    client: "Coin Bureau",
    category: "Content Strategy",
    metric: "90-day growth plan",
    description:
      "Platform strategy and content infrastructure for a major crypto brand. Built to keep output consistent and focused.",
    challenge:
      "High output was possible, but priorities had to stay aligned with platform behavior and audience intent.",
    approach: [
      "Mapped platform intent and audience segments.",
      "Built a 90-day plan with themes, formats, and publish cadence.",
      "Defined feedback loops for what to double down on and what to drop.",
      "Created a light ops system that kept the team moving.",
    ],
    results: [
      { label: "Plan length", value: "90 days" },
      { label: "Focus", value: "Infrastructure first" },
      { label: "Output", value: "Consistent cadence" },
    ],
  },
];
