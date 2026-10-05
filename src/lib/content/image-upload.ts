export const MAX_IMAGE_BYTES = 5 * 1024 * 1024
export const imageExtensions: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
}
export function validateImageFile(file: { type: string; size: number }): string | null {
  if (!Object.hasOwn(imageExtensions, file.type) || file.size <= 0 || file.size > MAX_IMAGE_BYTES) {
    return 'Choose a JPG, PNG, or WebP image, up to 5 MB.'
  }
  return null
}
