const W = "/work";

/** @typedef {'browser' | 'print' | 'ipad' | 'iphone'} SlideKind */

/**
 * @param {object} p
 * @returns {object}
 */
function project(p) {
  return p;
}

/** Case studies — imagery in public/work/ */
export const featuredProjects = [
  project({
    id: "correspondences",
    title: "Correspondences — Astrology & Tarot",
    category: "Product",
    accent: "rgb",
    tags: ["UI Design", "iOS", "Data Visualization", "React Native"],
    images: [
      `${W}/correspondences-iphone-4.png`,
      `${W}/correspondences-iphone-5.png`,
      `${W}/correspondences-iphone-6.png`,
      `${W}/correspondences-iphone-7.png`,
      `${W}/correspondences-iphone-1.png`,
      `${W}/correspondences-iphone-2.png`,
    ],
    slideKinds: ["iphone", "iphone", "iphone", "iphone", "iphone", "iphone"],
    browserFrame: true,
    stackPeek: true,
    stackPeekDepth: 2,
    spanWide: true,
    description:
      "A React Native iOS app in beta that transforms Swiss ephemeris astronomical data into something visually beautiful and intuitively navigable. End-to-end design and development.",
    meta: "Product · Beta 2025",
  }),
  project({
    id: "manitou-campaign",
    title: "Manitou Springs Election Campaign",
    category: "Civic",
    accent: "cmyk",
    tags: ["Branding", "Print", "Web Design", "Campaign", "Civic"],
    images: [
      `${W}/mofm-web.png`,
      `${W}/mofm-print.png`,
      `${W}/mofm-phone-1.png`,
      `${W}/mofm-phone-2.png`,
    ],
    slideKinds: ["browser", "print", "iphone", "iphone"],
    browserFrame: true,
    browserFrameTitle: "MofM",
    description:
      "Pro-bono brand and communications for a local citizen issue committee — visual identity, print collateral (postcards, door hangers), and a campaign website that made a complex ballot issue legible for everyday voters.",
    meta: "Civic · 2026",
  }),
  project({
    id: "manitou-arts",
    title: "Manitou Arts, Culture & Heritage",
    category: "Civic",
    accent: "rgb",
    tags: ["UX/UI", "Web App", "Civic Tech", "Full-Stack"],
    images: [`${W}/mach1.png`, `${W}/mach2.png`, `${W}/mach3.png`],
    slideKinds: ["browser", "browser", "browser"],
    browserFrame: true,
    browserFrameTitle: "MACH",
    description:
      "Grant application, board review, and city council admin experiences from a single codebase — from stakeholder interviews and information architecture through deployment and ongoing maintenance for the City of Manitou Springs.",
    meta: "Civic · 2023–present",
  }),
  project({
    id: "ibm-events",
    title: "IBM Events & Marketing — Tools Suite",
    category: "Enterprise",
    accent: "cmyk",
    tags: ["UX/UI", "Enterprise", "Dashboard Design", "Full-Stack"],
    images: [
      `${W}/ibm-partner-awards.png`,
      `${W}/ibm-dashboard.png`,
      `${W}/ibm-calendar.png`,
      `${W}/ibm-doc-repo.png`,
    ],
    browserFrame: true,
    browserFrameTitle: "IBM",
    stackPeek: true,
    spanWide: true,
    description:
      "A sustained design and development partnership with IBM's global events team — a dozen internal and public applications including event calendars, compliance systems, attendance dashboards, and data validation tools.",
    meta: "Enterprise · 2016–2025",
  }),
  project({
    id: "kollacode",
    title: "KollaCode Brand Identity",
    category: "Brand",
    accent: "cmyk",
    tags: ["Branding", "Identity", "Print", "Presentation", "Merch"],
    images: [`${W}/kollacode-logo.png`, `${W}/kollacode-web.png`],
    slideKinds: ["print", "browser"],
    browserFrame: true,
    browserFrameTitle: "KollaCode",
    description:
      "In-house brand work for the software consultancy: logo, letterhead, website, reusable slide decks, and team apparel extending the visual system across touchpoints.",
    meta: "Brand · 2016–2025",
  }),
  project({
    id: "design-system-generator",
    title: "Design System Generator",
    category: "Product",
    accent: "rgb",
    tags: ["Figma Plugin", "Design Systems", "Dev Tool"],
    images: [`${W}/design-system-generator.gif`],
    description:
      "A Figma plugin that scaffolds a complete design system from a JSON palette — color and typography styles, variables, base components, and sample layouts in one pass.",
    meta: "Product · 2026",
  }),
  project({
    id: "watercourse",
    title: "Watercourse Foods",
    category: "Brand",
    accent: "cmyk",
    tags: ["Branding", "Identity", "Web Design"],
    images: [`${W}/watercourse.jpg`, `${W}/watercourse-site.png`],
    browserFrame: true,
    browserFrameTitle: "Watercourse",
    description:
      "Brand voice, visual direction, and web design for a beloved Denver vegetarian restaurant and its bakery — Westword Best Restaurant Website, 2010.",
    meta: "Brand · 2010",
  }),
  project({
    id: "osa-mariposa",
    title: "Osa Mariposa Hostel",
    category: "Hospitality",
    accent: "rgb",
    tags: ["Web Design", "Travel", "Hospitality"],
    images: [`${W}/osa-mariposa.jpg`],
    browserFrame: true,
    browserFrameTitle: "Osa Mariposa",
    description:
      "Website for a hostel in Puerto Escondido — rooms, communal spaces, and neighborhood context so guests could get a feel for the place before arriving.",
    meta: "Hospitality · 2010",
  }),
  project({
    id: "creating-communities",
    title: "Creating Communities Social Archive",
    category: "Civic",
    accent: "cmyk",
    tags: ["Web Design", "Archive", "Civic"],
    images: [`${W}/creating-communities.png`],
    browserFrame: true,
    browserFrameTitle: "Denver Library",
    description:
      "Digital community archive for Denver Public Library's Western History & Genealogy — user stories mapped to Denver locations and tens of thousands of assessor records digitized online. Westword Best Site for Amateur Historians, 2012.",
    meta: "Civic · 2012",
  }),
  project({
    id: "fresh-city-life",
    title: "Fresh City Life",
    category: "Civic",
    accent: "cmyk",
    tags: ["Print", "Editorial", "Civic"],
    images: [`${W}/fresh-city-life.jpg`],
    description:
      "Monthly double-sided flyers for Denver Public Library promoting upcoming events — the full calendar packed into a readable, inviting print piece for branch pickup.",
    meta: "Civic · 2011",
  }),
  project({
    id: "city-o-city",
    title: "City O' City Event Posters",
    category: "Brand",
    accent: "rgb",
    tags: ["Print", "Poster", "Events"],
    images: [`${W}/cityo2.png`, `${W}/cityo1.png`],
    slideKinds: ["print", "print"],
    description:
      "Window posters for a long-running vegan restaurant in Denver's Capitol Hill — street-facing pieces with room to swing visually because each event got a fresh look.",
    meta: "Brand · 2013",
  }),
  project({
    id: "prospector",
    title: "Prospector Website",
    category: "Civic",
    accent: "cmyk",
    tags: ["Web Design", "Civic"],
    images: [`${W}/prospector.png`],
    browserFrame: true,
    browserFrameTitle: "Prospector",
    description:
      "Redesigned the Colorado Alliance of Research Libraries interlibrary loan landing page to align with new alliance branding — the public entry point for statewide resource sharing.",
    meta: "Civic · 2010",
  }),
  project({
    id: "red-twig",
    title: "Red Twig Herbal",
    category: "Brand",
    accent: "rgb",
    tags: ["Web Design", "Health & Wellness", "Small Business"],
    images: [`${W}/red-twig.png`],
    browserFrame: true,
    browserFrameTitle: "Red Twig",
    description:
      "Website for an independent herbalist practice focused on women's health — calm and approachable, with services and resources that met clients without feeling clinical.",
    meta: "Brand · 2010",
  }),
];

export const capabilities = [
  "Brand identity",
  "Web & app design",
  "Vue.js development",
  "Campaign & print",
  "Illustration",
  "Design systems",
  "Data visualization",
  "Art direction",
];

export const awards = [
  {
    year: "2017",
    title: "Webby Winner — IBM World of Watson Event App",
    url: "https://winners.webbyawards.com/2017/apps-software/general-apps/events/21694/ibm-world-of-watson-event-app",
  },
  {
    year: "2012",
    title: "Westword — Best Site for Amateur Historians (Denver Public Library)",
    url: "http://www.westword.com/best-of/2012/shopping-and-services/best-site-for-amateur-historians-5159060",
  },
  {
    year: "2010",
    title: "Westword — Best Restaurant Website (Watercourse Foods)",
    url: "http://www.westword.com/news/we-had-a-party-and-tweeted-about-it-westword-webawards-winners-5875748",
  },
];

export const clients = [
  "IBM",
  "City of Manitou Springs",
  "KollaCode",
  "Denver Public Library",
  "Watercourse Foods",
  "City O' City",
  "Colorado Alliance of Research Libraries",
];
