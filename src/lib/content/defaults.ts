import { getImgPath } from "@/utils/image";
import type {
  CounterItem,
  HeroContent,
  PortfolioItem,
  ProjectItem,
  ServiceItem,
  SiteContent,
  TechnologyItem,
  TestimonialItem,
} from "./types";

/**
 * Bundled fallback content. The site renders this at build time and whenever
 * Firestore is unavailable or empty, so the static export always has content.
 * `scripts/seed-firestore.mjs` pushes these same values into Firestore.
 */

export const defaultServices: ServiceItem[] = [
  {
    id: "service-1",
    order: 1,
    icon: getImgPath("/images/services/ux-design-product_1.svg"),
    title: "Mobile App Development",
    description:
      "Cross-platform iOS and Android apps built with React Native or Flutter and Dart, from your first MVP to new product features.",
  },
  {
    id: "service-2",
    order: 2,
    icon: getImgPath("/images/services/perfomance-optimization.svg"),
    title: "Web App Development",
    description:
      "Responsive web applications with React and Next.js, using MERN and PERN stacks to connect your interface, APIs, and data.",
  },
  {
    id: "service-3",
    order: 3,
    icon: getImgPath("/images/services/ux-design-product_2.svg"),
    title: "Backend & API Development",
    description:
      "Backend services, REST APIs, authentication, and business logic with Node.js, Express, and PHP.",
  },
  {
    id: "service-4",
    order: 4,
    icon: getImgPath("/images/services/ux-design-product_1.svg"),
    title: "AI Development & Integration",
    description:
      "Bring AI into your product with custom assistants, intelligent workflows, and integrations with AI models and APIs.",
  },
  {
    id: "service-5",
    order: 5,
    icon: getImgPath("/images/services/perfomance-optimization.svg"),
    title: "Databases & Cloud Services",
    description:
      "Data storage and application services with MongoDB, PostgreSQL, MySQL, Firebase, and Supabase.",
  },
  {
    id: "service-6",
    order: 6,
    icon: getImgPath("/images/services/ux-design-product_2.svg"),
    title: "MVP & Product Development",
    description:
      "Turn a product idea into a focused first release, then improve it through testing, feedback, and ongoing development.",
  },
];

export const defaultCounters: CounterItem[] = [
  {
    id: "counter-1",
    order: 1,
    icon: getImgPath("/images/counter/star.svg"),
    value: "Mobile",
    description: "React Native and Flutter apps for iOS and Android",
  },
  {
    id: "counter-2",
    order: 2,
    icon: getImgPath("/images/counter/admin.svg"),
    value: "Web",
    description: "Full-stack applications, backends, and databases",
  },
  {
    id: "counter-3",
    order: 3,
    icon: getImgPath("/images/counter/bag.svg"),
    value: "AI",
    description: "AI development and integrations for your products",
  },
];

export const defaultTechnologies: TechnologyItem[] = [
  { id: "tech-1", order: 1, name: "React.js", icon: "react" },
  { id: "tech-2", order: 2, name: "Flutter", icon: "flutter" },
  { id: "tech-3", order: 3, name: "Next.js", icon: "nextjs-icon" },
  { id: "tech-4", order: 4, name: "Firebase", icon: "firebase" },
  { id: "tech-5", order: 5, name: "Node.js", icon: "nodejs-icon" },
  { id: "tech-6", order: 6, name: "Supabase", icon: "supabase-icon" },
  { id: "tech-7", order: 7, name: "Dart", icon: "dart" },
  { id: "tech-8", order: 8, name: "PostgreSQL", icon: "postgresql" },
  { id: "tech-9", order: 9, name: "React Native", icon: "react" },
  { id: "tech-10", order: 10, name: "MongoDB", icon: "mongodb-icon" },
  { id: "tech-11", order: 11, name: "PHP", icon: "php" },
  { id: "tech-12", order: 12, name: "MySQL", icon: "mysql" },
  { id: "tech-13", order: 13, name: "Express.js", icon: "express" },
];

export const defaultProjects: ProjectItem[] = [
  {
    id: "project-1",
    order: 1,
    image: getImgPath("/images/portfolio/cozycasa.png"),
    alt: "Cozycasa property booking app",
    title: "Cozycasa",
    category: "Mobile App",
    description:
      "A property booking app with map search, saved stays, and in-app payments.",
    technologies: ["React Native", "Node.js", "PostgreSQL"],
  },
  {
    id: "project-2",
    order: 2,
    image: getImgPath("/images/portfolio/mars.png"),
    alt: "Mars logistics dashboard",
    title: "Mars",
    category: "Web Platform",
    description:
      "A logistics dashboard that tracks shipments and fleet activity in real time.",
    technologies: ["Next.js", "Express", "MongoDB"],
  },
  {
    id: "project-3",
    order: 3,
    image: getImgPath("/images/portfolio/humans.png"),
    alt: "Everyday Humans community app",
    title: "Everyday Humans",
    category: "Mobile App",
    description:
      "A community app with member profiles, direct chat, and push notifications.",
    technologies: ["Flutter", "Dart", "Firebase"],
  },
  {
    id: "project-4",
    order: 4,
    image: getImgPath("/images/portfolio/roket-squred.png"),
    alt: "Rocket Squared support assistant",
    title: "Rocket Squared",
    category: "AI Integration",
    description:
      "A support assistant that answers customer questions from the product docs.",
    technologies: ["Next.js", "AI APIs", "Supabase"],
  },
  {
    id: "project-5",
    order: 5,
    image: getImgPath("/images/portfolio/panda-logo.png"),
    alt: "Panda brand website",
    title: "Panda",
    category: "Web Platform",
    description:
      "A brand website with an editable CMS and a reusable design system.",
    technologies: ["Next.js", "MySQL", "PHP"],
  },
  {
    id: "project-6",
    order: 6,
    image: getImgPath("/images/portfolio/humans.png"),
    alt: "Fusion Dynamics billing platform",
    title: "Fusion Dynamics",
    category: "Backend & API",
    description:
      "Multi-tenant billing APIs with role-based access and usage reporting.",
    technologies: ["Node.js", "Express", "PostgreSQL"],
  },
];

export const defaultTestimonials: TestimonialItem[] = [
  {
    id: "testimonial-1",
    order: 1,
    quote:
      "They took our booking idea from a sketch to a working app in one quarter. The team explained every technical decision and kept us involved the whole way.",
    name: "Sarah Mitchell",
    role: "Product Lead, Cozycasa",
    avatar: getImgPath("/images/hero/hero-profile-1.jpg"),
    rating: 5,
  },
  {
    id: "testimonial-2",
    order: 2,
    quote:
      "Our dashboard replaced three spreadsheets and a lot of guesswork. Shipments are now tracked in real time and the reports we used to build by hand are automatic.",
    name: "Daniel Okafor",
    role: "Founder, Mars Logistics",
    avatar: getImgPath("/images/hero/hero-profile-2.jpg"),
    rating: 5,
  },
  {
    id: "testimonial-3",
    order: 3,
    quote:
      "The API work was clean, documented, and easy for our own developers to pick up. Support after launch has been just as steady as the delivery.",
    name: "Priya Raman",
    role: "CTO, Fusion Dynamics",
    avatar: getImgPath("/images/hero/hero-profile-3.jpg"),
    rating: 5,
  },
];

export const defaultPortfolio: PortfolioItem[] = [
  {
    id: "portfolio-1",
    order: 1,
    image: getImgPath("/images/portfolio/cozycasa.png"),
    alt: "Cozycasa project",
    title: "Cozycasa",
    slug: "cozycasa",
    info: "Mobile App",
    Class: "md:mt-0",
  },
  {
    id: "portfolio-2",
    order: 2,
    image: getImgPath("/images/portfolio/mars.png"),
    alt: "Mars project",
    title: "Mars",
    slug: "mars",
    info: "Web Platform",
    Class: "md:mt-24",
  },
  {
    id: "portfolio-3",
    order: 3,
    image: getImgPath("/images/portfolio/humans.png"),
    alt: "Everyday Humans project",
    title: "Everyday Humans",
    slug: "everyday-humans",
    info: "Mobile App",
    Class: "md:mt-0",
  },
  {
    id: "portfolio-4",
    order: 4,
    image: getImgPath("/images/portfolio/roket-squred.png"),
    alt: "Rocket Squared project",
    title: "Rocket Squared",
    slug: "rocket-squared",
    info: "AI Integration",
    Class: "md:mt-24",
  },
  {
    id: "portfolio-5",
    order: 5,
    image: getImgPath("/images/portfolio/panda-logo.png"),
    alt: "Panda project",
    title: "Panda Logo",
    slug: "panda-logo",
    info: "Web Platform",
    Class: "md:mt-0",
  },
  {
    id: "portfolio-6",
    order: 6,
    image: getImgPath("/images/portfolio/humans.png"),
    alt: "Fusion Dynamics project",
    title: "Fusion Dynamics",
    slug: "fusion-dynamics",
    info: "Backend & API",
    Class: "md:mt-0",
  },
];

export const defaultHero: HeroContent = {
  eyebrow: "Eagle Nest Technologies",
  title: "Your idea. Our code. Real possibilities.",
  subtitle:
    "We are a software development startup building mobile apps, web platforms, backend systems, and AI integrations that help your business move forward.",
  ctaLabel: "Discuss Your Project",
  ctaHref: "/contact",
  helpText: "Tell us about your project",
  image: getImgPath("/images/hero/hero-banner.gif"),
  imageAlt: "Animated preview of software built by Eagle Nest Technologies",
};

/** Fallback list collections. Blog posts fall back to the bundled markdown. */
export const defaultContent: SiteContent = {
  services: defaultServices,
  projects: defaultProjects,
  testimonials: defaultTestimonials,
  counters: defaultCounters,
  technologies: defaultTechnologies,
  portfolio: defaultPortfolio,
  posts: [],
  submissions: [],
};

/** The values the seed script writes to Firestore. */
export const seedContent = {
  services: defaultServices,
  projects: defaultProjects,
  testimonials: defaultTestimonials,
  counters: defaultCounters,
  technologies: defaultTechnologies,
  portfolio: defaultPortfolio,
  hero: defaultHero,
};
