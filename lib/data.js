import {
  Utensils, Music, GraduationCap, Briefcase, Home, Plane, Users, Sparkles,
  ShoppingBag, Church, Gem, Heart, PartyPopper, Stethoscope, Film,
} from "lucide-react";

// ─── RESTAURANTS ────────────────────────────────────────────────────────────

export const RESTAURANTS = [
  { name: "Royal Indian Cuisine", city: "Troy", sub: ["North Indian", "Catering"], badges: ["Banquet Hall", "Catering Available"], desc: "Full menu, banquet hall, catering available.", url: "https://royalindiancuisine.com", rating: 4.2, reviews: 890, hours: "11am–10pm" },
  { name: "Saffron Fine Indian Cuisine", city: "Farmington Hills", sub: ["North Indian", "Fine Dining"], badges: ["Luxury"], desc: "Upscale North Indian dining with refined flavors.", url: "#", rating: 4.4, reviews: 520, hours: "11:30am–10pm" },
  { name: "Andhra Cafe", city: "Troy", sub: ["South Indian", "Telugu", "Hyderabadi"], badges: ["Telugu Specialist"], desc: "Telugu/Andhra cuisine — known for thalis that transport you home.", url: "#", rating: 4.3, reviews: 480, hours: "11:30am–9:30pm" },
  { name: "Neehee's", city: "Troy", sub: ["South Indian", "Gujarati", "Street Food", "Vegetarian"], badges: ["Vegetarian", "Gujarati Specialist"], desc: "Gujarati + South Indian snacks and chaat heaven.", url: "https://neehees.com", rating: 4.4, reviews: 620, hours: "11am–9pm" },
  { name: "Charminar Biryani House", city: "Troy", sub: ["Biryani", "Hyderabadi"], badges: ["Halal", "Telugu Specialist"], desc: "Hyderabadi biryani specialist — the dum is real.", url: "#", rating: 4.5, reviews: 810, hours: "11am–10pm" },
  { name: "RaoGari Vindu", city: "Farmington", sub: ["Telugu", "Biryani", "South Indian"], badges: ["Telugu Specialist", "Banquet Hall", "Halal"], desc: "Telugu/Andhra flavors with killer biryani.", url: "#", rating: 4.3, reviews: 540, hours: "11:30am–10pm" },
  { name: "Honest Indian Vegetarian", city: "Canton", sub: ["Vegetarian", "South Indian", "North Indian"], badges: ["Vegetarian", "Jain-Friendly", "Vegan Options"], desc: "Pure veg — Jain and vegan friendly.", url: "#", rating: 4.1, reviews: 290, hours: "11:30am–9pm" },
  { name: "Namaste Flavours", city: "Canton / Farmington", sub: ["North Indian", "South Indian", "Vegetarian"], badges: ["Vegetarian", "Jain-Friendly"], desc: "Vegetarian-friendly, Jain options available.", url: "#", rating: 4.3, reviews: 420, hours: "11am–9:30pm" },
  { name: "Jalsa", city: "Sterling Heights", sub: ["Indo-Chinese", "Street Food"], badges: [], desc: "Indo-Chinese and street food that hits all the right notes.", url: "#", rating: 4.2, reviews: 320, hours: "12pm–9:30pm" },
  { name: "Authentikka", city: "Canton", sub: ["North Indian", "Catering"], badges: ["Banquet Hall", "Catering Available"], desc: "Full bar, banquet services, and catering.", url: "#", rating: 4.0, reviews: 310, hours: "11:30am–10pm" },
  { name: "Priya Indian Cuisine", city: "Troy", sub: ["North Indian"], badges: ["Vegetarian"], desc: "Popular lunch buffet with North Indian staples.", url: "#", rating: 4.1, reviews: 650, hours: "11:30am–9:30pm" },
  { name: "Ashoka Indian Cuisine", city: "Troy", sub: ["North Indian"], badges: ["Vegetarian"], desc: "Beloved lunch buffet — a Troy desi go-to.", url: "#", rating: 4.0, reviews: 710, hours: "11am–9:30pm" },
  { name: "Bheemasmi", city: "Multiple", sub: ["South Indian", "Biryani"], badges: ["South Indian Specialist"], desc: "South Indian meals, crispy dosa, legit biryani.", url: "#", rating: 4.2, reviews: 350, hours: "11am–9:30pm" },
  { name: "Krishna Catering", city: "Farmington Hills", sub: ["Catering", "North Indian"], badges: ["Catering Available", "Vegetarian"], desc: "Reliable catering. Wedding-tested.", url: "#", rating: 4.0, reviews: 180, hours: "11am–9pm" },
];

// ─── GROCERIES ──────────────────────────────────────────────────────────────

export const GROCERIES = [
  { name: "Patel Brothers", city: "Rochester Hills", sub: ["Full Selection"], badges: ["Fresh Produce", "Prepared Food Counter"], desc: "The OG. Largest chain, widest selection.", url: "https://patelbros.com", rating: 4.3, reviews: 1200, hours: "10am–9pm" },
  { name: "India Grocers", city: "Farmington Hills", sub: ["Full Selection"], badges: ["Prepared Food Counter", "Weekend Hours"], desc: "Large store with prepared food counter.", url: "#", rating: 4.1, reviews: 680, hours: "10am–9pm" },
  { name: "Aditya Foods", city: "Rochester Hills", sub: ["South Indian Specialty"], badges: ["South Indian Specialty"], desc: "South Indian specialty items you can't find elsewhere.", url: "#", rating: 4.2, reviews: 140, hours: "10am–8pm" },
  { name: "Famous Meat Hub", city: "Troy", sub: ["Halal", "Meat"], badges: ["Halal"], desc: "Halal meats plus grocery essentials.", url: "#", rating: 4.1, reviews: 310, hours: "9am–9pm" },
  { name: "Bengali Grocery Store", city: "Warren", sub: ["Bengali Specialty"], badges: ["Bengali Specialist"], desc: "Bengali specialty — fish, meats, Bangla staples.", url: "#", rating: 4.0, reviews: 90, hours: "10am–8pm" },
  { name: "Desi Fruit and Vegetable", city: "Madison Heights", sub: ["Fresh Produce"], badges: ["Fresh Produce"], desc: "Fresh produce focus — freshest desi veggies.", url: "#", rating: 4.0, reviews: 110, hours: "9am–8pm" },
  { name: "India Market", city: "Grand Rapids", sub: ["Full Selection"], badges: [], desc: "West Michigan's go-to for Indian groceries.", url: "#", rating: 4.1, reviews: 160, hours: "10am–8pm" },
];

// ─── TEMPLES ────────────────────────────────────────────────────────────────

export const TEMPLES = [
  { name: "Bharatiya Temple", city: "Troy", sub: ["Hindu", "All Denominations"], badges: ["Weekend Hours"], desc: "The largest temple in metro Detroit. All denominations.", url: "https://bharatiyatemple.org", rating: 4.7, reviews: 920 },
  { name: "Hindu Temple of Canton", city: "Canton", sub: ["Hindu", "All Denominations"], badges: ["Banquet Hall"], desc: "Large complex with 600+ seat hall.", url: "#", rating: 4.6, reviews: 580 },
  { name: "Sri Venkateswara Temple", city: "Novi", sub: ["Hindu", "Telugu"], badges: ["Telugu Specialist", "Saturday Kitchen"], desc: "Telugu community home. Balaji Kitchen on Saturdays.", url: "#", rating: 4.8, reviews: 410 },
  { name: "BAPS Swaminarayan Mandir", city: "Canton", sub: ["Hindu", "Swaminarayan", "Gujarati"], badges: ["Gujarati Specialist"], desc: "Ornate Swaminarayan tradition temple.", url: "https://baps.org", rating: 4.9, reviews: 650 },
  { name: "Michigan Kalibari", city: "Warren", sub: ["Hindu", "Bengali"], badges: ["Bengali Specialist"], desc: "Bengali community home. Durga Puja is legendary.", url: "#", rating: 4.6, reviews: 140 },
  { name: "Muthumariamman Temple", city: "Novi", sub: ["Hindu", "Tamil"], badges: ["Tamil Specialist"], desc: "Tamil tradition. Pongal celebrations are incredible.", url: "#", rating: 4.7, reviews: 170 },
  { name: "Gurudwara Sahib of Michigan", city: "Plymouth", sub: ["Sikh", "Gurudwara"], badges: ["Langar Open to All"], desc: "Sikh community center. Langar open to all.", url: "#", rating: 4.8, reviews: 310 },
  { name: "Islamic Center of America", city: "Dearborn", sub: ["Mosque", "Muslim"], badges: [], desc: "One of the largest mosques in the US.", url: "#", rating: 4.6, reviews: 1100 },
];

// ─── WEDDING VENDORS ────────────────────────────────────────────────────────

export const WEDDING_VENDORS = [
  { name: "Killer Creations Photography", city: "Clawson", sub: ["Photography", "Cinematography"], badges: ["Multi-Event Expert", "Same-Day Edit"], desc: "Hundreds of South Asian weddings shot.", url: "https://killercreationsphoto.com", rating: 4.9, reviews: 85 },
  { name: "Art of Mehndi By Bhumika Mistry", city: "Greater Detroit", sub: ["Mehndi"], badges: ["Bridal Specialist", "15+ Years Experience"], desc: "The name in Detroit mehndi.", url: "#", rating: 5.0, reviews: 120 },
  { name: "DJ RAJ Entertainment", city: "Michigan", sub: ["DJ", "Entertainment"], badges: ["15+ Years Experience", "Lighting Included"], desc: "15+ years of packed dance floors.", url: "#", rating: 4.7, reviews: 90 },
  { name: "The Wedding Elegance", city: "Michigan", sub: ["Planner", "Decor"], badges: ["Luxury", "Multi-Event Expert"], desc: "Luxury South Asian wedding planning.", url: "#", rating: 4.9, reviews: 35 },
  { name: "Damini Desai Photography", city: "Royal Oak", sub: ["Photography"], badges: ["Gujarati Specialist"], desc: "Knows every ritual, every angle.", url: "#", rating: 4.9, reviews: 45 },
  { name: "Zainab's Mehndi", city: "Canton", sub: ["Mehndi"], badges: ["Pakistani Specialist", "Bridal Specialist"], desc: "Pakistani/Muslim wedding mehndi specialist.", url: "#", rating: 4.7, reviews: 42 },
  { name: "One2 Entertainment", city: "Michigan", sub: ["DJ", "Entertainment", "Sangeet"], badges: ["Multi-Event Expert", "Lighting Included"], desc: "Premiere South Asian wedding entertainment.", url: "#", rating: 4.8, reviews: 70 },
  { name: "JHobby Makeup Studio", city: "Detroit area", sub: ["Makeup"], badges: ["Bridal Specialist"], desc: "Bridal makeup that lasts all day.", url: "#", rating: 4.7, reviews: 48 },
  { name: "Rasna Catering", city: "Canton", sub: ["Catering"], badges: ["Catering Available", "Multi-Event Expert"], desc: "Wedding catering trusted by the community.", url: "#", rating: 4.3, reviews: 55 },
];

// ─── EVENTS ─────────────────────────────────────────────────────────────────

export const EVENTS = [
  { name: "Holi Festival", type: "Festival", date: "March 2026", where: "Multiple locations", icon: "🎨", desc: "Festival of colors with music, food, and organic colors." },
  { name: "Telugu New Year (Ugadi)", type: "Cultural", date: "March/April 2026", where: "SV Temple, Novi", icon: "🌸", desc: "Traditional Ugadi celebrations." },
  { name: "Cricket Tournament", type: "Sports", date: "Summer 2026", where: "Canton", icon: "🏏", desc: "Annual summer cricket tournament." },
  { name: "Navratri Garba", type: "Festival/Dance", date: "October 2026", where: "Bharatiya Temple, Troy", icon: "💃", desc: "Nine nights of garba and dandiya." },
  { name: "Diwali Mela", type: "Festival", date: "November 2026", where: "Hindu Temple, Canton", icon: "🪔", desc: "Grand Diwali celebration with fireworks, rangoli, food." },
  { name: "Comedy Night", type: "Entertainment", date: "Various", where: "Various", icon: "😂", desc: "Desi comedy circuit with touring comedians." },
  { name: "Bollywood Night", type: "Entertainment", date: "Monthly", where: "Various venues", icon: "🎶", desc: "Monthly Bollywood music and dance nights." },
];

// ─── MOVIES ─────────────────────────────────────────────────────────────────

export const MOVIES = [
  { title: "Pushpa 2: The Rule", language: "Telugu", genre: "Action / Drama", status: "Now Showing", theaters: ["AMC Forum 30 (Sterling Heights)", "Emagine Novi", "MJR Troy"], rating: "⭐ 4.2", url: "https://www.amctheatres.com" },
  { title: "Sikandar", language: "Hindi", genre: "Action", status: "Coming Soon", theaters: ["AMC Forum 30", "Emagine Canton"], rating: "—", url: "https://www.amctheatres.com" },
  { title: "Thandel", language: "Telugu", genre: "Drama", status: "Now Showing", theaters: ["AMC Forum 30", "Emagine Novi"], rating: "⭐ 4.0", url: "https://www.amctheatres.com" },
  { title: "Housefull 5", language: "Hindi", genre: "Comedy", status: "Coming Soon", theaters: ["AMC Forum 30", "MJR Troy"], rating: "—", url: "https://www.amctheatres.com" },
  { title: "Vidaamuyarchi", language: "Tamil", genre: "Action / Thriller", status: "Now Showing", theaters: ["AMC Forum 30", "Emagine Novi"], rating: "⭐ 3.8", url: "https://www.amctheatres.com" },
];

// ─── KIDS / FAMILY ──────────────────────────────────────────────────────────

export const KIDS = [
  { name: "Kumon", city: "Troy, Canton, Novi", sub: ["Tutoring", "Math"], badges: [], desc: "Math + reading enrichment. Multiple locations.", url: "https://kumon.com", rating: 4.0, reviews: 450 },
  { name: "Mathnasium", city: "Troy, Novi, Canton", sub: ["Tutoring", "Math"], badges: [], desc: "Math-focused tutoring.", url: "https://mathnasium.com", rating: 4.3, reviews: 320 },
  { name: "Chinmaya Mission (Bala Vihar)", city: "Troy, Novi, Canton", sub: ["Cultural", "Religious", "Language"], badges: [], desc: "Hindu values, language, cultural education.", url: "#", rating: 4.7, reviews: 80 },
  { name: "Bharatanatyam Classes", city: "Metro Detroit", sub: ["Dance", "Classical"], badges: ["South Indian Specialist"], desc: "Classical South Indian dance. Arangetram prep.", url: "#", rating: 4.8, reviews: 35 },
  { name: "Carnatic Music Lessons", city: "Metro Detroit", sub: ["Music", "Classical"], badges: ["South Indian Specialist"], desc: "South Indian classical vocal and instrumental.", url: "#", rating: 4.7, reviews: 28 },
];

// ─── BEAUTY ─────────────────────────────────────────────────────────────────

export const BEAUTY_BRANDS = [
  { name: "Fable & Mane", city: "National", sub: ["Hair Care", "Hair Oil"], badges: ["Desi-Founded", "Ayurvedic", "Clean Ingredients"], desc: "Ayurvedic-inspired hair rituals.", url: "https://fableandmane.com" },
  { name: "Kulfi Beauty", city: "National", sub: ["Makeup"], badges: ["Desi-Founded", "Melanin-Friendly"], desc: "Makeup made for South Asian skin tones.", url: "https://kulfibeauty.com" },
  { name: "Live Tinted", city: "National", sub: ["Makeup"], badges: ["Desi-Founded", "Melanin-Friendly"], desc: "Celebrating undertones and hyperpigmentation.", url: "https://livetinted.com" },
  { name: "Kama Ayurveda", city: "National", sub: ["Skincare"], badges: ["Ayurvedic", "Luxury"], desc: "Luxury Ayurvedic skincare.", url: "https://kamaayurveda.com" },
  { name: "Himalaya", city: "National", sub: ["Skincare"], badges: ["Ayurvedic"], desc: "Herbal healthcare trusted by millions.", url: "https://himalayausa.com" },
];

// ─── PROFESSIONAL SERVICES ──────────────────────────────────────────────────

export const PROFESSIONAL_SERVICES = [
  { name: "Immigration Attorneys (H-1B/EB)", city: "Metro Detroit", sub: ["Immigration", "H-1B", "Green Card"], badges: ["H-1B Specialist"], desc: "H-1B, L-1, EB-2/EB-3, PERM, family-based petitions.", url: "#" },
  { name: "NRI Tax & Compliance CPAs", city: "Metro Detroit", sub: ["Tax", "NRI", "FBAR"], badges: ["NRI Tax Expert", "FBAR/FATCA"], desc: "US-India dual tax. FBAR, FATCA, NRO/NRE reporting.", url: "#" },
  { name: "Indian-American Real Estate Agents", city: "Troy, Canton, Novi", sub: ["Real Estate"], badges: ["Desi Community Focus"], desc: "Realtors who know school districts and temple proximity.", url: "#" },
  { name: "Financial Advisors", city: "Metro Detroit", sub: ["Financial Planning"], badges: ["Desi Community Focus"], desc: "CFPs familiar with H-1B constraints and NRI rules.", url: "#" },
];

// ─── HEALTH & WELLNESS ──────────────────────────────────────────────────────

export const HEALTH_WELLNESS = [
  { name: "South Asian Therapists", city: "Metro Detroit", sub: ["Mental Health", "Therapy"], badges: ["Desi Community Focus"], desc: "Therapists who understand immigrant family dynamics.", url: "#" },
  { name: "Desi Primary Care Physicians", city: "Troy, Farmington Hills", sub: ["Primary Care"], badges: ["Desi Community Focus"], desc: "Doctors who understand South Asian health risks.", url: "#" },
  { name: "Nutritionists for Desi Diets", city: "Metro Detroit", sub: ["Nutrition"], badges: ["Desi Community Focus"], desc: "Dietitians who work within Indian dietary frameworks.", url: "#" },
];

// ─── REMITTANCE ─────────────────────────────────────────────────────────────

export const REMITTANCE_COMPARISON = [
  { name: "Wise", city: "Online", sub: ["Bank Transfer"], badges: ["Best Rate"], desc: "Mid-market rate with transparent fees.", url: "https://wise.com", rate: "Mid-market", fee: "$0–5", speed: "1–2 days", minSend: "$1" },
  { name: "Remitly", city: "Online", sub: ["Bank Transfer", "Cash Pickup"], badges: ["Fastest"], desc: "Fast transfers with promo rates.", url: "https://remitly.com", rate: "Competitive", fee: "$0–4", speed: "Min–2 days", minSend: "$1" },
  { name: "Xoom (PayPal)", city: "Online", sub: ["Bank Transfer", "Cash Pickup"], badges: [], desc: "PayPal-backed. Multiple options.", url: "https://xoom.com", rate: "Good", fee: "$0–5", speed: "Min–3 days", minSend: "$10" },
  { name: "Western Union", city: "Online / In-Store", sub: ["Bank Transfer", "Cash Pickup"], badges: [], desc: "Largest cash pickup network.", url: "https://westernunion.com", rate: "Fair", fee: "$0–10+", speed: "Min–3 days", minSend: "$1" },
];

// ─── DATING & MATRIMONY ─────────────────────────────────────────────────────

export const DATING_MATRIMONY = [
  { name: "Shaadi.com", city: "Online", sub: ["Matrimony"], badges: [], desc: "The original desi matrimony.", url: "https://shaadi.com", type: "Matrimony" },
  { name: "BharatMatrimony", city: "Online", sub: ["Matrimony"], badges: [], desc: "Community-specific with regional sub-sites.", url: "https://bharatmatrimony.com", type: "Matrimony" },
  { name: "Dil Mil", city: "App", sub: ["Dating"], badges: ["Desi-Founded"], desc: "South Asian dating app.", url: "https://dilmil.co", type: "Dating App" },
  { name: "Hinge", city: "App", sub: ["Dating"], badges: [], desc: "Strong desi user base.", url: "https://hinge.co", type: "Dating App" },
  { name: "Muzz", city: "App", sub: ["Dating", "Muslim"], badges: [], desc: "Muslim dating and marriage app.", url: "https://muzz.com", type: "Dating App" },
];

// ─── TRAVEL & HOMELAND ──────────────────────────────────────────────────────

export const TRAVEL_HOMELAND = [
  { name: "OCI Card Services", city: "Chicago Consulate", sub: ["OCI", "Documentation"], badges: [], desc: "OCI card — visa-free India travel. Detroit → Chicago consulate.", url: "https://ociservices.gov.in" },
  { name: "VFS Global", city: "Chicago", sub: ["Visa", "Documentation"], badges: [], desc: "Outsourced visa and OCI processing.", url: "https://visa.vfsglobal.com/usa" },
  ...REMITTANCE_COMPARISON,
];

// ─── COMMUNITY & NETWORKING ─────────────────────────────────────────────────

export const COMMUNITY_NETWORKING = [
  { name: "TiE Detroit", city: "Metro Detroit", sub: ["Entrepreneurship"], badges: [], desc: "The Indus Entrepreneurs. Networking and mentorship.", url: "https://detroit.tie.org" },
  { name: "Michigan Telugu Association", city: "Metro Detroit", sub: ["Cultural", "Telugu"], badges: ["Telugu Specialist"], desc: "Telugu community org. Ugadi, cultural events." },
  { name: "Michigan Tamil Sangam", city: "Metro Detroit", sub: ["Cultural", "Tamil"], badges: ["Tamil Specialist"], desc: "Tamil community. Pongal, programs, Tamil school." },
  { name: "Bengali Association", city: "Metro Detroit", sub: ["Cultural", "Bengali"], badges: ["Bengali Specialist"], desc: "Durga Puja, Saraswati Puja, community events." },
  { name: "Gujarati Samaj of Michigan", city: "Metro Detroit", sub: ["Cultural", "Gujarati"], badges: ["Gujarati Specialist"], desc: "Navratri garba, cultural events, networking." },
];

// ─── CLASSIFIEDS ────────────────────────────────────────────────────────────

export const CLASSIFIEDS_POSTS = [
  { id: 1, cat: "roommates", title: "Looking for roommate in Troy — 2BR apartment near Big Beaver", author: "Rahul M.", date: "2 hours ago", body: "Starting June 1. Rent is $750/month + utilities. Close to Bharatiya Temple and Patel Brothers. Vegetarian household preferred. I'm a 26M software engineer, clean and quiet. DM for details.", replies: 4 },
  { id: 2, cat: "roommates", title: "Female roommate needed — Canton, near Ford Rd", author: "Priya K.", date: "5 hours ago", body: "Looking for a female roommate to share a 3BR townhouse. $650/month all inclusive. Near India Grocers Canton and Hindu Temple. Vegetarian-only kitchen. Available immediately.", replies: 7 },
  { id: 3, cat: "housing", title: "2BR/2BA apartment available — Farmington Hills, $1,400/mo", author: "Vijay S.", date: "1 day ago", body: "Subletting my apartment from July–December. Great location on Halsted Rd, walking distance to India Grocers and Namaste Plaza. Complex has gym, pool. Indian families in the building.", replies: 12 },
  { id: 4, cat: "jobs", title: "Hiring: Part-time weekend help at Indian grocery store", author: "Store Owner", date: "3 hours ago", body: "Looking for part-time help on weekends (Sat-Sun) at our Farmington Hills grocery store. Must speak Hindi or Gujarati. $15/hr. Students welcome. Call or DM.", replies: 3 },
  { id: 5, cat: "jobs", title: "IT consulting company hiring Java developers — H-1B sponsorship available", author: "Recruiters India LLC", date: "6 hours ago", body: "Multiple openings for Java/Spring Boot developers. 5+ years experience. Detroit metro area (hybrid). H-1B transfer and sponsorship available. Send resume.", replies: 8 },
  { id: 6, cat: "for-sale", title: "Selling home mandir — carved wood, excellent condition", author: "Sunita P.", date: "4 hours ago", body: "Beautiful carved wooden mandir (pooja cabinet), 4ft tall. Paid $800, selling for $350. Moving out of state. Pickup in Novi. Photos available on request.", replies: 6 },
  { id: 7, cat: "for-sale", title: "Wedding lehenga — wore once, designer piece, size M", author: "Ananya R.", date: "1 day ago", body: "Red and gold bridal lehenga from Sabyasachi-inspired collection. Wore once for my reception. Dry cleaned. Original price $1,200, asking $400. Located in Troy.", replies: 15 },
  { id: 8, cat: "services", title: "Indian home-cooked tiffin service — Troy/Rochester Hills area", author: "Lakshmi's Kitchen", date: "8 hours ago", body: "Daily tiffin service. South Indian and North Indian options. Veg and non-veg. $8–12 per meal. Weekly plans available. Fresh, homestyle cooking. WhatsApp for menu.", replies: 22 },
  { id: 9, cat: "services", title: "Experienced pandit available — griha pravesh, satyanarayan, wedding ceremonies", author: "Pandit Sharma", date: "2 days ago", body: "Performing all Hindu ceremonies — griha pravesh, satyanarayan puja, wedding, naamkaran, mundan. Serving all of metro Detroit. Hindi, Sanskrit, and English. Flexible scheduling.", replies: 9 },
  { id: 10, cat: "carpool", title: "Daily carpool — Troy to Downtown Detroit, 8am–5pm", author: "Aravind T.", date: "12 hours ago", body: "Looking for carpool partners for daily commute from Troy (Big Beaver area) to downtown Detroit. I work 8–5. Happy to drive or ride. Split gas. Starting ASAP.", replies: 2 },
  { id: 11, cat: "carpool", title: "Weekend ride share to Chicago — April 5th", author: "Meera J.", date: "1 day ago", body: "Driving from Troy to Chicago on Saturday April 5th, returning Sunday evening. Have 3 seats available. $30/person for gas. Leaving around 7am.", replies: 5 },
  { id: 12, cat: "for-sale", title: "Instant Pot Duo 8qt + Indian cookbooks — $40 for everything", author: "Deepak V.", date: "3 hours ago", body: "Moving sale. Instant Pot Duo 8qt, great condition, plus 3 Indian cookbooks (Madhur Jaffrey, 660 Curries, Vegan Richa). All for $40. Pickup in Canton.", replies: 4 },
  { id: 13, cat: "roommates", title: "Room available in 4BR house — Novi, near SV Temple", author: "Karthik N.", date: "10 hours ago", body: "One room available in a 4BR house shared with 3 Telugu guys. $550/month + utilities. 5 min drive to SV Temple and Patel Brothers. Non-smoking. Available May 1.", replies: 11 },
  { id: 14, cat: "misc", title: "Anyone know a good Telugu tutor for 7-year-old?", author: "Swathi M.", date: "5 hours ago", body: "Looking for someone to teach my daughter Telugu — reading and writing. Weekend classes preferred. Novi/Troy area. Please share contacts if you know anyone!", replies: 8 },
  { id: 15, cat: "services", title: "Tax filing for H-1B and NRI — $150 flat fee", author: "CPA Services", date: "1 day ago", body: "CPA specializing in H-1B, OPT, NRI tax filing. Federal + state + FBAR if needed. $150 flat for simple returns, $250 for complex (rental income, India assets). Book now for 2025 returns.", replies: 14 },
  { id: 16, cat: "events", title: "Telugu families potluck — April 12th at Canton park", author: "Suresh G.", date: "6 hours ago", body: "Organizing a Telugu families potluck at Heritage Park, Canton. Kids activities, cricket, and food. Bring one dish. RSVP in replies so we can plan. All Telugu families welcome!", replies: 19 },
  { id: 17, cat: "housing", title: "3BR house for rent — Troy school district, $2,100/mo", author: "Landlord", date: "2 days ago", body: "3BR/2.5BA house in Troy. Troy school district (rated excellent). Near Bharatiya Temple, Patel Brothers. Garage, fenced yard. Available July 1. Indian family preferred — vegetarian kitchen.", replies: 21 },
];

// ─── BLOG ARTICLES ──────────────────────────────────────────────────────────

export const BLOG_ARTICLES = [
  { id: 1, slug: "biryani-power-rankings", title: "The Biryani Power Rankings: Every Biryani in Metro Detroit, Ranked", excerpt: "We ate biryani at every spot in metro Detroit — from Charminar's legendary dum to RaoGari's Andhra spice bomb. Here's the definitive ranking.", category: "Food & Dining", author: "Adda Team", date: "March 20, 2026", readTime: "8 min read", color: "#E65100", featured: true },
  { id: 2, slug: "h1b-green-card-2026", title: "H-1B to Green Card in 2026: The Complete Timeline for Indian Nationals", excerpt: "EB-2 vs EB-3, priority date movement, PERM processing times, and what the latest USCIS policy changes mean for your case. Plain English, no legalese.", category: "Immigration", author: "Adda Team", date: "March 18, 2026", readTime: "12 min read", color: "#1565C0", featured: true },
  { id: 3, slug: "south-asian-heart-disease", title: "Why South Asians Have 4x the Heart Disease Risk — and What You Can Do", excerpt: "The MASALA study confirmed what cardiologists suspected: South Asians face disproportionate cardiovascular risk. Here's what your doctor might not be telling you.", category: "Health", author: "Adda Team", date: "March 15, 2026", readTime: "10 min read", color: "#2E7D32", featured: true },
  { id: 4, slug: "wise-vs-remitly-2026", title: "Wise vs Remitly vs Xoom: The Real Comparison for Sending Money to India (2026)", excerpt: "We sent $1,000 through every major service and tracked the actual amount received. The results might surprise you.", category: "Money", author: "Adda Team", date: "March 12, 2026", readTime: "6 min read", color: "#00695C", featured: false },
  { id: 5, slug: "new-restaurants-2026", title: "5 New Indian Restaurants in Metro Detroit You Need to Try This Spring", excerpt: "From a new Hyderabadi spot in Sterling Heights to an upscale modern Indian concept in Birmingham — the Detroit desi dining scene is heating up.", category: "Food & Dining", author: "Adda Team", date: "March 10, 2026", readTime: "5 min read", color: "#E65100", featured: false },
  { id: 6, slug: "oci-renewal-guide", title: "OCI Card After New Passport: The Step-by-Step Guide That Actually Works", excerpt: "Got a new passport? Your OCI needs re-stamping. Here's exactly what to upload, which consulate you use from Michigan, and how to avoid the common rejection reasons.", category: "Immigration", author: "Adda Team", date: "March 8, 2026", readTime: "7 min read", color: "#1565C0", featured: false },
  { id: 7, slug: "desi-therapist-guide", title: "Finding a Therapist Who Gets the Desi Experience", excerpt: "\"Just think positive\" isn't therapy. How to find a culturally competent therapist who understands immigrant guilt, family enmeshment, and the model minority pressure.", category: "Health", author: "Adda Team", date: "March 5, 2026", readTime: "9 min read", color: "#2E7D32", featured: false },
  { id: 8, slug: "fbar-fatca-guide", title: "FBAR and FATCA: Do You Need to Report Your India Bank Accounts? (Yes, Probably)", excerpt: "If you have NRO/NRE accounts, PPF, or mutual funds in India, you likely have US reporting obligations you don't know about. Here's the plain-English explainer.", category: "Money", author: "Adda Team", date: "March 1, 2026", readTime: "8 min read", color: "#00695C", featured: false },
];

// ─── CATEGORIES ─────────────────────────────────────────────────────────────

export const CATEGORIES = [
  { id: "weddings", name: "Weddings & Celebrations", count: "45+", icon: Gem, color: "#C2185B", data: WEDDING_VENDORS, subs: ["Photography", "Cinematography", "Mehndi", "DJ", "Entertainment", "Sangeet", "Planner", "Decor", "Mandap", "Makeup", "Catering"], desc: "From mehndi to mandap — every vendor for a desi wedding in Michigan." },
  { id: "food", name: "Food & Dining", count: "25+", icon: Utensils, color: "#E65100", data: RESTAURANTS, subs: ["North Indian", "South Indian", "Telugu", "Gujarati", "Biryani", "Hyderabadi", "Indo-Chinese", "Street Food", "Vegetarian", "Fine Dining", "Catering"], desc: "Every cuisine from butter chicken to pesarattu." },
  { id: "movies", name: "Indian Movies", count: "6+", icon: Film, color: "#6A1B9A", data: null, desc: "Bollywood, Tollywood, Kollywood — what's playing in Detroit." },
  { id: "events", name: "Events", count: "10+", icon: PartyPopper, color: "#7B1FA2", data: null, desc: "Garba, Diwali melas, comedy shows, concerts." },
  { id: "family", name: "Family & Education", count: "12+", icon: GraduationCap, color: "#1565C0", data: KIDS, subs: ["Tutoring", "Math", "Cultural", "Religious", "Language", "Dance", "Music", "Classical"], desc: "Tutoring, dance, Bala Vihar, language school." },
  { id: "beauty", name: "Beauty", count: "15+", icon: Sparkles, color: "#D4845A", data: BEAUTY_BRANDS, subs: ["Hair Care", "Hair Oil", "Makeup", "Skincare"], desc: "Desi-founded brands and Ayurvedic skincare." },
  { id: "wellness", name: "Health & Wellness", count: "8+", icon: Stethoscope, color: "#2E7D32", data: HEALTH_WELLNESS, subs: ["Mental Health", "Therapy", "Primary Care", "Nutrition"], desc: "Doctors and therapists who get desi health." },
  { id: "services", name: "Professional Services", count: "10+", icon: Briefcase, color: "#37474F", data: PROFESSIONAL_SERVICES, subs: ["Immigration", "H-1B", "Green Card", "Tax", "NRI", "FBAR", "Real Estate", "Financial Planning"], desc: "Immigration attorneys, NRI CPAs, desi realtors." },
  { id: "travel", name: "Travel & Homeland", count: "12+", icon: Plane, color: "#00695C", data: TRAVEL_HOMELAND, subs: ["OCI", "Visa", "Documentation", "Bank Transfer", "Cash Pickup"], desc: "OCI, remittances, everything connecting here to home." },
  { id: "dating", name: "Dating & Matrimony", count: "8+", icon: Heart, color: "#E91E63", data: DATING_MATRIMONY, subs: ["Matrimony", "Dating", "Muslim"], desc: "Whether aunty-approved or not." },
  { id: "community", name: "Community", count: "7+", icon: Users, color: "#455A64", data: COMMUNITY_NETWORKING, subs: ["Entrepreneurship", "Cultural", "Telugu", "Tamil", "Bengali", "Gujarati"], desc: "Cultural associations and professional networks." },
  { id: "religious", name: "Religious & Spiritual", count: "20+", icon: Church, color: "#BF360C", data: TEMPLES, subs: ["Hindu", "All Denominations", "Telugu", "Tamil", "Bengali", "Gujarati", "Swaminarayan", "ISKCON", "Sikh", "Gurudwara", "Mosque", "Muslim"], desc: "Every temple, gurudwara, and mosque." },
  { id: "grocery", name: "Grocery", count: "20+", icon: ShoppingBag, color: "#33691E", data: GROCERIES, subs: ["Full Selection", "South Indian Specialty", "Bengali Specialty", "Halal", "Fresh Produce", "Meat"], desc: "From Patel Brothers to specialty stores." },
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
  { id: "misc", label: "Miscellaneous", icon: "💬" },
];