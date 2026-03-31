/**
 * Generate a URL-safe slug from a professional's name and city.
 * Used both on the listing page (to build links) and on the detail page (to look up).
 */
export function professionalSlug(name, city) {
  return (name + "-" + (city || "mi"))
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
