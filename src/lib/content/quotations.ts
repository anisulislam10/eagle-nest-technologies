export const quotationServices = ['Mobile App Development', 'Web App Development', 'Backend & API Development', 'AI Development & Integration'] as const
export interface QuotationForm {
  firstName: string; lastName: string; email: string; service: string;
  date: string; time: string; timeZone: string; message: string;
}
export function validateQuotation(value: QuotationForm): string | null {
  if (!value.firstName.trim() || value.firstName.length > 80 || !value.lastName.trim() || value.lastName.length > 80) return 'Enter your first and last name (up to 80 characters each).'
  if (value.email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.email)) return 'Enter a valid email address.'
  if (!(quotationServices as readonly string[]).includes(value.service)) return 'Choose a service.'
  if (!value.message.trim() || value.message.length > 5000) return 'Describe your project in up to 5,000 characters.'
  if (value.date && (!/^\d{4}-\d{2}-\d{2}$/.test(value.date) || Number.isNaN(Date.parse(value.date)) || new Date(value.date).toISOString().slice(0, 10) !== value.date)) return 'Choose a valid preferred date.'
  if (value.time && !/^([01]\d|2[0-3]):[0-5]\d$/.test(value.time)) return 'Choose a valid preferred time.'
  if (Boolean(value.date) !== Boolean(value.time)) return 'Provide both a preferred date and time, or leave both empty.'
  if (!value.timeZone || value.timeZone.length > 100) return 'Your time zone could not be determined. Please refresh and try again.'
  return null
}
