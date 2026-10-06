export type ManagedCollection = 'projects' | 'team' | 'clients';
export interface ManagedItem {
  id: string;
  title: string;
  description: string;
  image: string;
  alt: string;
  category: string;
  technologies: string[];
  link: string;
  order: number;
  published: boolean;
}
export const blankItem: ManagedItem = { id: '', title: '', description: '', image: '', alt: '', category: '', technologies: [], link: '', order: 0, published: false };
export function validUrl(value: string) {
  if (!value) return true;
  try { return new URL(value).protocol === 'https:'; } catch { return false; }
}
export function validateItem(item: ManagedItem, collection: ManagedCollection = 'projects'): string | null {
  if (!item.title.trim() || item.title.length > 120) return 'Enter a name or title (up to 120 characters).';
  if ((collection !== 'clients' && !item.category.trim()) || item.category.length > 120) return 'Enter a category or role (up to 120 characters).';
  if ((collection !== 'clients' && !item.description.trim()) || item.description.length > 2000) return 'Enter a description (up to 2,000 characters).';
  if (item.image.length > 2000 || item.link.length > 2000 || !validUrl(item.image) || !validUrl(item.link)) return 'Image and website links must be valid HTTPS URLs.';
  if (collection === 'clients' && !item.image) return 'Upload a client logo or enter its HTTPS image URL.';
  if (item.alt.length > 200) return 'Image description must be under 200 characters.';
  if (!Number.isInteger(item.order) || item.order < 0 || item.order > 10000) return 'Display order must be a whole number from 0 to 10,000.';
  if (item.technologies.length > 20 || item.technologies.some(value => value.length > 80)) return 'Use up to 20 technologies, each under 80 characters.';
  return null;
}
