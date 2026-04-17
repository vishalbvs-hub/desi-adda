// ─── DESIGN TOKENS ──────────────────────────────────────────────────────────

export const FONTS = {
  heading: "var(--font-inter), system-ui, sans-serif",
  body: "var(--font-inter), system-ui, sans-serif",
};

export const COLORS = {
  bg: "#FDFBF7",
  primary: "#E8881C",
  primaryHover: "#D07614",
  accent: "#0B7A75",
  accentHover: "#096862",
  danger: "#C44D3D",
  text: "#1A1A1A",
  textSecondary: "#6B6B6B",
  textMuted: "#8A8A8A",
  textFaint: "#8A8A8A",
  border: "#E6E6E6",
  borderLight: "#F0F0F0",
  surface: "#FFFFFF",
  cardBg: "#FFFFFF",
};

// ─── BADGE SYSTEM ───────────────────────────────────────────────────────────

export const BADGE_CONFIG = {
  "Halal": { bg: "#E8F5E9", color: "#2E7D32", icon: "🥩" },
  "Vegetarian": { bg: "#E8F5E9", color: "#2E7D32", icon: "🌿" },
  "Jain-Friendly": { bg: "#E8F5E9", color: "#33691E", icon: "🍃" },
  "Vegan Options": { bg: "#E8F5E9", color: "#2E7D32", icon: "🌱" },
  "Telugu Specialist": { bg: "#FFF3E0", color: "#E65100", icon: "⭐" },
  "Gujarati Specialist": { bg: "#FFF3E0", color: "#E65100", icon: "⭐" },
  "Tamil Specialist": { bg: "#FFF3E0", color: "#E65100", icon: "⭐" },
  "Bengali Specialist": { bg: "#FFF3E0", color: "#E65100", icon: "⭐" },
  "South Indian Specialist": { bg: "#FFF3E0", color: "#E65100", icon: "⭐" },
  "Pakistani Specialist": { bg: "#FFF3E0", color: "#E65100", icon: "⭐" },
  "Banquet Hall": { bg: "#E3F2FD", color: "#1565C0", icon: "🏛️" },
  "Catering Available": { bg: "#E3F2FD", color: "#1565C0", icon: "🍽️" },
  "Multi-Event Expert": { bg: "#FCE4EC", color: "#C2185B", icon: "💍" },
  "Bridal Specialist": { bg: "#FCE4EC", color: "#C2185B", icon: "👰" },
  "Weekend Hours": { bg: "#F3E5F5", color: "#7B1FA2", icon: "📅" },
  "Langar Open to All": { bg: "#FFF8E1", color: "#F57F17", icon: "🙏" },
  "Saturday Kitchen": { bg: "#FFF8E1", color: "#F57F17", icon: "🍳" },
  "Fresh Produce": { bg: "#E8F5E9", color: "#2E7D32", icon: "🥬" },
  "Prepared Food Counter": { bg: "#FFF3E0", color: "#E65100", icon: "🍛" },
  "South Indian Specialty": { bg: "#FFF3E0", color: "#BF360C", icon: "🌶️" },
  "Desi-Founded": { bg: "#FCE4EC", color: "#AD1457", icon: "✨" },
  "Same-Day Edit": { bg: "#E3F2FD", color: "#1565C0", icon: "🎬" },
  "Lighting Included": { bg: "#F3E5F5", color: "#7B1FA2", icon: "💡" },
  "15+ Years Experience": { bg: "#FFF8E1", color: "#F57F17", icon: "🏆" },
  "Luxury": { bg: "#FFF8E1", color: "#F57F17", icon: "💎" },
  "H-1B Specialist": { bg: "#E3F2FD", color: "#1565C0", icon: "📋" },
  "NRI Tax Expert": { bg: "#E3F2FD", color: "#1565C0", icon: "📋" },
  "FBAR/FATCA": { bg: "#E3F2FD", color: "#1565C0", icon: "📋" },
  "Desi Community Focus": { bg: "#FCE4EC", color: "#C2185B", icon: "🏠" },
  "Ayurvedic": { bg: "#E8F5E9", color: "#2E7D32", icon: "🌿" },
  "Melanin-Friendly": { bg: "#FFF3E0", color: "#BF360C", icon: "✨" },
  "Clean Ingredients": { bg: "#E8F5E9", color: "#33691E", icon: "🧴" },
  "Best Rate": { bg: "#FFF8E1", color: "#F57F17", icon: "🏆" },
  "Fastest": { bg: "#E3F2FD", color: "#1565C0", icon: "⚡" },
};

export const METROS = [
  "Detroit / Michigan", "Chicago", "Dallas / DFW", "Houston",
  "Bay Area / San Jose", "New Jersey / NYC", "Atlanta", "Seattle",
  "Los Angeles", "Boston", "Philadelphia", "DC / NoVA",
];

export const CULTURES = [
  "All Desi", "Telugu", "Tamil", "Hindi", "Gujarati", "Punjabi",
  "Malayalam", "Kannada", "Bengali", "Marathi", "Pakistani",
  "Sri Lankan", "Bangladeshi", "Nepali",
];

export const TRENDING = [
  "Navratri garba near me", "Telugu restaurants Troy",
  "Mehndi artist Canton", "Indian grocery Farmington Hills",
  "Send money to India", "Roommates Troy", "H-1B immigration lawyer",
  "Desi therapist", "Indian movies near me", "OCI card renewal",
];

export const CLASSIFIEDS_CATEGORIES = [
  { id: "all", label: "All Posts", icon: "📋" },
  { id: "roommates", label: "Roommates", icon: "🏠" },
  { id: "housing", label: "Housing", icon: "🏡" },
  { id: "jobs", label: "Jobs", icon: "💼" },
  { id: "for-sale", label: "For Sale", icon: "🏷️" },
  { id: "services", label: "Services", icon: "🔧" },
  { id: "carpool", label: "Carpool", icon: "🚗" },
  { id: "events", label: "Events / Meetups", icon: "🎉" },
  { id: "babysitting", label: "Babysitting", icon: "👶" },
  { id: "home-cooked-meals", label: "Home Cooked Meals", icon: "🍱" },
  { id: "misc", label: "Miscellaneous", icon: "💬" },
];

export const SPONSORED_HOME = [
  { brand: "Wise", tagline: "Send money to India at the real exchange rate.", cta: "Try Wise Free", url: "https://wise.com", bg: "#E8F5E9", color: "#2E7D32" },
  { brand: "Fable & Mane", tagline: "Ayurvedic hair rituals for the modern mane.", cta: "Shop Now", url: "https://fableandmane.com", bg: "#FCE4EC", color: "#C2185B" },
  { brand: "Shaadi.com", tagline: "30 million+ profiles. Find your perfect match.", cta: "Start Free", url: "https://shaadi.com", bg: "#FFF3E0", color: "#E65100" },
];
