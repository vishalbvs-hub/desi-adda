import {
  Utensils, Music, GraduationCap, Briefcase, Home, Plane, Users, Sparkles,
  ShoppingBag, Church, Gem, Heart, PartyPopper, Stethoscope, Film,
} from "lucide-react";
import { supabase } from "@/lib/supabase";

// ——— Fetch functions for each table ———

export async function fetchRestaurants() {
  const { data, error } = await supabase.from("restaurants").select("*").order("name");
  if (error) { console.error("Error fetching restaurants:", error); return []; }
  return data.map(r => ({ ...r, sub: r.subcategories }));
}

export async function fetchGroceries() {
  const { data, error } = await supabase.from("groceries").select("*").order("name");
  if (error) { console.error("Error fetching groceries:", error); return []; }
  return data.map(r => ({ ...r, sub: r.subcategories }));
}

export async function fetchTemples() {
  const { data, error } = await supabase.from("temples").select("*").order("name");
  if (error) { console.error("Error fetching temples:", error); return []; }
  return data.map(r => ({ ...r, sub: r.subcategories }));
}

export async function fetchWeddingVendors() {
  const { data, error } = await supabase.from("wedding_vendors").select("*").order("name");
  if (error) { console.error("Error fetching wedding vendors:", error); return []; }
  return data.map(r => ({ ...r, sub: r.subcategories }));
}

export async function fetchEvents() {
  const { data, error } = await supabase.from("events").select("*").eq("status", "approved").order("name");
  if (error) { console.error("Error fetching events:", error); return []; }
  return data.map(e => ({ ...e, where: e.location, date: e.event_date }));
}

export async function fetchMovies() {
  const { data, error } = await supabase.from("movies").select("*").order("title");
  if (error) { console.error("Error fetching movies:", error); return []; }
  return data;
}

export async function fetchKids() {
  const { data, error } = await supabase.from("kids").select("*").order("name");
  if (error) { console.error("Error fetching kids:", error); return []; }
  return data.map(r => ({ ...r, sub: r.subcategories }));
}

export async function fetchBeautyBrands() {
  const { data, error } = await supabase.from("beauty_brands").select("*").order("name");
  if (error) { console.error("Error fetching beauty brands:", error); return []; }
  return data.map(r => ({ ...r, sub: r.subcategories }));
}

export async function fetchProfessionalServices() {
  const { data, error } = await supabase.from("professional_services").select("*").order("name");
  if (error) { console.error("Error fetching professional services:", error); return []; }
  return data.map(r => ({ ...r, sub: r.subcategories }));
}

export async function fetchHealthWellness() {
  const { data, error } = await supabase.from("health_wellness").select("*").order("name");
  if (error) { console.error("Error fetching health wellness:", error); return []; }
  return data.map(r => ({ ...r, sub: r.subcategories }));
}

export async function fetchRemittanceComparison() {
  const { data, error } = await supabase.from("remittance_comparison").select("*").order("name");
  if (error) { console.error("Error fetching remittance:", error); return []; }
  return data.map(r => ({ ...r, sub: r.subcategories }));
}

export async function fetchDatingMatrimony() {
  const { data, error } = await supabase.from("dating_matrimony").select("*").order("name");
  if (error) { console.error("Error fetching dating:", error); return []; }
  return data.map(r => ({ ...r, sub: r.subcategories }));
}

export async function fetchCommunityNetworking() {
  const { data, error } = await supabase.from("community_networking").select("*").order("name");
  if (error) { console.error("Error fetching community:", error); return []; }
  return data.map(r => ({ ...r, sub: r.subcategories }));
}

export async function fetchClassifieds() {
  const { data, error } = await supabase.from("classifieds").select("*").eq("status", "approved").order("created_at", { ascending: false });
  if (error) { console.error("Error fetching classifieds:", error); return []; }
  return data.map(c => ({ ...c, cat: c.category }));
}

export async function fetchBlogArticles() {
  const { data, error } = await supabase.from("blog_articles").select("*").eq("status", "published").order("id", { ascending: false });
  if (error) { console.error("Error fetching blog articles:", error); return []; }
  return data.map(a => ({ ...a, readTime: a.read_time, date: a.published_date }));
}

export async function fetchProfessionals() {
  const { data, error } = await supabase.from("professionals").select("*").order("featured", { ascending: false }).order("name");
  if (error) { console.error("Error fetching professionals:", error); return []; }
  return data;
}

// ——— Travel & Homeland combines OCI/VFS + remittance ———

export async function fetchTravelHomeland() {
  const remittance = await fetchRemittanceComparison();
  const oci = [
    { name: "OCI Card Services", city: "Chicago Consulate", sub: ["OCI", "Documentation"], badges: [], description: "OCI card — visa-free India travel. Detroit → Chicago consulate.", url: "https://ociservices.gov.in" },
    { name: "VFS Global", city: "Chicago", sub: ["Visa", "Documentation"], badges: [], description: "Outsourced visa and OCI processing.", url: "https://visa.vfsglobal.com/usa" },
  ];
  return [...oci, ...remittance];
}

// ——— Fetch ALL data at once (used by the homepage and search) ———

export async function fetchAllData() {
  const [
    restaurants, groceries, temples, weddingVendors, events, movies,
    kids, beautyBrands, professionalServices, healthWellness,
    remittanceComparison, datingMatrimony, communityNetworking,
    classifieds, blogArticles, travelHomeland, professionals,
  ] = await Promise.all([
    fetchRestaurants(), fetchGroceries(), fetchTemples(), fetchWeddingVendors(),
    fetchEvents(), fetchMovies(), fetchKids(), fetchBeautyBrands(),
    fetchProfessionalServices(), fetchHealthWellness(), fetchRemittanceComparison(),
    fetchDatingMatrimony(), fetchCommunityNetworking(), fetchClassifieds(),
    fetchBlogArticles(), fetchTravelHomeland(), fetchProfessionals(),
  ]);

  // Build CATEGORIES with the same shape as before — each category has a `data` array
  const CATEGORIES = [
    { id: "weddings", name: "Weddings & Celebrations", count: String(weddingVendors.length) + "+", icon: Gem, color: "#C2185B", data: weddingVendors, subs: ["Photography", "Cinematography", "Mehndi", "DJ", "Entertainment", "Sangeet", "Planner", "Decor", "Mandap", "Makeup", "Catering"], desc: "From mehndi to mandap — every vendor for a desi wedding in Michigan." },
    { id: "food", name: "Food & Dining", count: String(restaurants.length) + "+", icon: Utensils, color: "#E65100", data: restaurants, subs: ["North Indian", "South Indian", "Telugu", "Gujarati", "Biryani", "Hyderabadi", "Indo-Chinese", "Street Food", "Vegetarian", "Fine Dining", "Catering"], desc: "Every cuisine from butter chicken to pesarattu." },
    { id: "movies", name: "Indian Movies", count: String(movies.length) + "+", icon: Film, color: "#6A1B9A", data: null, subs: [], desc: "Bollywood, Tollywood, Kollywood — what's playing in Detroit." },
    { id: "events", name: "Events", count: String(events.length) + "+", icon: PartyPopper, color: "#7B1FA2", data: null, subs: [], desc: "Garba, Diwali melas, comedy shows, concerts." },
    { id: "family", name: "Family & Education", count: String(kids.length) + "+", icon: GraduationCap, color: "#1565C0", data: kids, subs: ["Tutoring", "Math", "Cultural", "Religious", "Language", "Dance", "Music", "Classical"], desc: "Tutoring, dance, Bala Vihar, language school." },
    { id: "beauty", name: "Beauty", count: String(beautyBrands.length) + "+", icon: Sparkles, color: "#D4845A", data: beautyBrands, subs: ["Hair Care", "Hair Oil", "Makeup", "Skincare"], desc: "Desi-founded brands and Ayurvedic skincare." },
    { id: "wellness", name: "Health & Wellness", count: String(healthWellness.length) + "+", icon: Stethoscope, color: "#2E7D32", data: healthWellness, subs: ["Mental Health", "Therapy", "Primary Care", "Nutrition"], desc: "Doctors and therapists who get desi health." },
    { id: "services", name: "Professional Services", count: String(professionalServices.length) + "+", icon: Briefcase, color: "#37474F", data: professionalServices, subs: ["Immigration", "H-1B", "Green Card", "Tax", "NRI", "FBAR", "Real Estate", "Financial Planning"], desc: "Immigration attorneys, NRI CPAs, desi realtors." },
    { id: "travel", name: "Travel & Homeland", count: String(travelHomeland.length) + "+", icon: Plane, color: "#00695C", data: travelHomeland, subs: ["OCI", "Visa", "Documentation", "Bank Transfer", "Cash Pickup"], desc: "OCI, remittances, everything connecting here to home." },
    { id: "dating", name: "Dating & Matrimony", count: String(datingMatrimony.length) + "+", icon: Heart, color: "#E91E63", data: datingMatrimony, subs: ["Matrimony", "Dating", "Muslim"], desc: "Whether aunty-approved or not." },
    { id: "community", name: "Community", count: String(communityNetworking.length) + "+", icon: Users, color: "#455A64", data: communityNetworking, subs: ["Entrepreneurship", "Cultural", "Telugu", "Tamil", "Bengali", "Gujarati"], desc: "Cultural associations and professional networks." },
    { id: "religious", name: "Religious & Spiritual", count: String(temples.length) + "+", icon: Church, color: "#BF360C", data: temples, subs: ["Hindu", "All Denominations", "Telugu", "Tamil", "Bengali", "Gujarati", "Swaminarayan", "ISKCON", "Sikh", "Gurudwara", "Mosque", "Muslim"], desc: "Every temple, gurudwara, and mosque." },
    { id: "grocery", name: "Grocery", count: String(groceries.length) + "+", icon: ShoppingBag, color: "#33691E", data: groceries, subs: ["Full Selection", "South Indian Specialty", "Bengali Specialty", "Halal", "Fresh Produce", "Meat"], desc: "From Patel Brothers to specialty stores." },
  ];

  return {
    RESTAURANTS: restaurants,
    GROCERIES: groceries,
    TEMPLES: temples,
    WEDDING_VENDORS: weddingVendors,
    EVENTS: events,
    MOVIES: movies,
    KIDS: kids,
    BEAUTY_BRANDS: beautyBrands,
    PROFESSIONAL_SERVICES: professionalServices,
    HEALTH_WELLNESS: healthWellness,
    REMITTANCE_COMPARISON: remittanceComparison,
    DATING_MATRIMONY: datingMatrimony,
    TRAVEL_HOMELAND: travelHomeland,
    COMMUNITY_NETWORKING: communityNetworking,
    CLASSIFIEDS_POSTS: classifieds,
    BLOG_ARTICLES: blogArticles,
    CATEGORIES: CATEGORIES,
    PROFESSIONALS: professionals,
  };
}
