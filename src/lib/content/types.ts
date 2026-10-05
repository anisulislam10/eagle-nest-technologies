/**
 * Content model for the site. Every item carries an `id`, which is the
 * Firestore document id when the content comes from the database, and a stable
 * synthetic id when it comes from the bundled defaults.
 */

export interface ServiceItem {
  id: string;
  order: number;
  icon: string;
  title: string;
  description: string;
}

export interface ProjectItem {
  id: string;
  order: number;
  image: string;
  alt: string;
  title: string;
  category: string;
  description: string;
  technologies: string[];
}

export interface TestimonialItem {
  id: string;
  order: number;
  quote: string;
  name: string;
  role: string;
  avatar: string;
  rating: number;
}

export interface CounterItem {
  id: string;
  order: number;
  icon: string;
  value: string;
  description: string;
}

export interface TechnologyItem {
  id: string;
  order: number;
  name: string;
  icon: string;
}

export interface PortfolioItem {
  id: string;
  order: number;
  image: string;
  alt: string;
  title: string;
  slug: string;
  info: string;
  Class: string;
}

export interface BlogPost {
  id: string;
  order: number;
  title: string;
  excerpt: string;
  coverImage: string;
  date: string;
  slug: string;
}

export interface HeroContent {
  eyebrow: string;
  title: string;
  subtitle: string;
  ctaLabel: string;
  ctaHref: string;
  helpText: string;
  image: string;
  imageAlt: string;
}

export interface ContactSubmission {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  service: string;
  date: string;
  time: string;
  message: string;
  createdAt: number;
}

/** Collections that are a list of documents. */
export interface SiteContent {
  services: ServiceItem[];
  projects: ProjectItem[];
  testimonials: TestimonialItem[];
  counters: CounterItem[];
  technologies: TechnologyItem[];
  portfolio: PortfolioItem[];
  posts: BlogPost[];
  submissions: ContactSubmission[];
}

/** The list collections, in the order the admin nav shows them. */
export const CONTENT_KEYS = [
  "services",
  "projects",
  "testimonials",
  "counters",
  "technologies",
  "portfolio",
  "posts",
  "submissions",
] as const;

export type ContentKey = (typeof CONTENT_KEYS)[number];

/** A single document (settings/hero). */
export type SingletonKey = "hero";
