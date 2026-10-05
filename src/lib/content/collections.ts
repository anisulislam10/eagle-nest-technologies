import {
  CONTENT_KEYS,
  type ContentKey,
  type SingletonKey,
} from "./types";

export type FieldType = "text" | "textarea" | "number" | "image" | "list";

export interface FieldDef {
  name: string;
  label: string;
  type: FieldType;
  help?: string;
  placeholder?: string;
  /** Rendered as a <select> when present. */
  options?: string[];
}

export interface CollectionDef {
  key: ContentKey;
  label: string;
  singular: string;
  description: string;
  fields: FieldDef[];
  /** Human label for a row, used in lists and delete confirmations. */
  itemLabel: (item: Record<string, unknown>) => string;
}

const order: FieldDef = {
  name: "order",
  label: "Order",
  type: "number",
  help: "Lower numbers appear first.",
};

export const collections: Record<ContentKey, CollectionDef> = {
  services: {
    key: "services",
    label: "Services",
    singular: "service",
    description: "The service cards on the home and services pages.",
    fields: [
      order,
      { name: "title", label: "Title", type: "text" },
      { name: "description", label: "Description", type: "textarea" },
      {
        name: "icon",
        label: "Icon path",
        type: "image",
        help: "Path to an SVG/PNG under /public, e.g. /images/services/ux-design-product_1.svg",
      },
    ],
    itemLabel: (item) => String(item.title ?? "Untitled service"),
  },
  projects: {
    key: "projects",
    label: "Projects",
    singular: "project",
    description: "The project cards in the home page Projects section.",
    fields: [
      order,
      { name: "title", label: "Title", type: "text" },
      { name: "category", label: "Category", type: "text" },
      { name: "description", label: "Description", type: "textarea" },
      { name: "image", label: "Image", type: "image" },
      { name: "alt", label: "Image alt text", type: "text" },
      {
        name: "technologies",
        label: "Technologies",
        type: "list",
        help: "One technology per line.",
      },
    ],
    itemLabel: (item) => String(item.title ?? "Untitled project"),
  },
  testimonials: {
    key: "testimonials",
    label: "Testimonials",
    singular: "testimonial",
    description: "Client quotes shown on the home page.",
    fields: [
      order,
      { name: "quote", label: "Quote", type: "textarea" },
      { name: "name", label: "Client name", type: "text" },
      { name: "role", label: "Client role / company", type: "text" },
      { name: "avatar", label: "Avatar image", type: "image" },
      { name: "rating", label: "Rating (1-5)", type: "number" },
    ],
    itemLabel: (item) => String(item.name ?? "Unnamed client"),
  },
  counters: {
    key: "counters",
    label: "Counters",
    singular: "counter",
    description: "The Mobile / Web / AI highlights near the top of the page.",
    fields: [
      order,
      { name: "value", label: "Value", type: "text" },
      { name: "description", label: "Description", type: "textarea" },
      { name: "icon", label: "Icon", type: "image" },
    ],
    itemLabel: (item) => String(item.value ?? "Untitled counter"),
  },
  technologies: {
    key: "technologies",
    label: "Technologies",
    singular: "technology",
    description: "Logos in the scrolling technology ticker.",
    fields: [
      order,
      { name: "name", label: "Name", type: "text" },
      {
        name: "icon",
        label: "Icon name",
        type: "text",
        help: "File name without extension in /images/technologies, e.g. react",
      },
    ],
    itemLabel: (item) => String(item.name ?? "Untitled technology"),
  },
  portfolio: {
    key: "portfolio",
    label: "Portfolio",
    singular: "portfolio item",
    description: "Items on the portfolio page.",
    fields: [
      order,
      { name: "title", label: "Title", type: "text" },
      { name: "info", label: "Subtitle", type: "text" },
      { name: "slug", label: "Slug", type: "text" },
      { name: "image", label: "Image", type: "image" },
      { name: "alt", label: "Image alt text", type: "text" },
      {
        name: "Class",
        label: "Layout offset class",
        type: "text",
        options: ["md:mt-0", "md:mt-24"],
      },
    ],
    itemLabel: (item) => String(item.title ?? "Untitled item"),
  },
  posts: {
    key: "posts",
    label: "Blog posts",
    singular: "post",
    description:
      "Blog posts. When this list is empty the site falls back to the bundled markdown posts.",
    fields: [
      order,
      { name: "title", label: "Title", type: "text" },
      { name: "excerpt", label: "Excerpt", type: "textarea" },
      { name: "coverImage", label: "Cover image", type: "image" },
      { name: "date", label: "Date (YYYY-MM-DD)", type: "text" },
      { name: "slug", label: "Slug", type: "text" },
    ],
    itemLabel: (item) => String(item.title ?? "Untitled post"),
  },
  submissions: {
    key: "submissions",
    label: "Contact submissions",
    singular: "submission",
    description: "Messages submitted through the contact form.",
    fields: [
      { name: "firstName", label: "First name", type: "text" },
      { name: "lastName", label: "Last name", type: "text" },
      { name: "email", label: "Email", type: "text" },
      { name: "service", label: "Service", type: "text" },
      { name: "date", label: "Preferred date", type: "text" },
      { name: "time", label: "Preferred time", type: "text" },
      { name: "message", label: "Message", type: "textarea" },
    ],
    itemLabel: (item) =>
      [item.firstName, item.lastName].filter(Boolean).join(" ") ||
      String(item.email ?? "Submission"),
  },
};

export const singletonCollections: Record<
  SingletonKey,
  { label: string; description: string; fields: FieldDef[] }
> = {
  hero: {
    label: "Hero",
    description: "The headline and imagery at the top of the home page.",
    fields: [
      { name: "eyebrow", label: "Eyebrow", type: "text" },
      { name: "title", label: "Headline", type: "text" },
      { name: "subtitle", label: "Subheadline", type: "textarea" },
      { name: "ctaLabel", label: "Button label", type: "text" },
      { name: "ctaHref", label: "Button link", type: "text" },
      { name: "helpText", label: "Help text", type: "text" },
      { name: "image", label: "Hero image", type: "image" },
      { name: "imageAlt", label: "Image alt text", type: "text" },
    ],
  },
};

export function isContentKey(value: string): value is ContentKey {
  return (CONTENT_KEYS as readonly string[]).includes(value);
}
