"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Search, ArrowRight, TrendingUp, Clock, MapPin,
  MessageSquare, BookOpen, Send,
} from "lucide-react";
import { FONTS, COLORS, TRENDING, SPONSORED_HOME, CLASSIFIEDS_CATEGORIES } from "@/lib/constants";
import { fetchAllData } from "@/lib/data";
import CategoryCard from "@/components/CategoryCard";
import SponsoredCard from "@/components/SponsoredCard";
import NewsletterSignup from "@/components/NewsletterSignup";

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchAllData().then(setData);
  }, []);


  const router = useRouter();
  const ff = FONTS.heading;
  const fb = FONTS.body;
  const { primary, marigold, teal } = COLORS;

  if (!data) return <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>Loading...</div>;
  const { CATEGORIES, EVENTS, BLOG_ARTICLES, CLASSIFIEDS_POSTS } = data;

  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    const q = searchQuery.toLowerCase();
    if (q.includes("movie") || q.includes("film") || q.includes("bollywood")) {
      router.push("/movies");
      return;
    }
    if (q.includes("roommate") || q.includes("room") || q.includes("carpool") || q.includes("for sale") || q.includes("tiffin")) {
      router.push("/community");
      return;
    }
    for (const cat of CATEGORIES.filter(c => c.data)) {
      if (cat.data.some(r =>
        r.name.toLowerCase().includes(q) ||
        r.sub?.some(s => s.toLowerCase().includes(q)) ||
        r.desc?.toLowerCase().includes(q)
      )) {
        router.push(`/category/${cat.id}?q=${encodeURIComponent(searchQuery)}`);
        return;
      }
    }
    router.push(`/category/food?q=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <>
      {/* Hero */}
      <section style={{ position: "relative", overflow: "hidden", background: "linear-gradient(170deg, #FFFBF5 0%, #FFF0E6 40%, #FCE4EC 100%)",
        padding: "60px 20px 50px", textAlign: "center", position: "relative", overflow: "hidden",
      }}>
        <div className="rangoli-pattern" />
        <div style={{
          position: "absolute", top: "-40px", right: "-60px", width: "200px", height: "200px",
          borderRadius: "50%", background: `${marigold}10`, pointerEvents: "none",
        }} />
        <div style={{ maxWidth: "680px", margin: "0 auto", position: "relative", zIndex: 1 }}>
          <h1 style={{ fontFamily: fb, fontSize: "clamp(30px, 5.5vw, 48px)", fontWeight: 700, lineHeight: 1.2, margin: "0 0 6px" }}>
            Your desi life in <span style={{ fontFamily: ff, fontStyle: "italic", color: primary }}>Detroit</span>
          </h1>
          <p style={{ fontFamily: ff, fontSize: "clamp(18px, 3vw, 24px)", fontWeight: 300, color: "#6B5B4F", margin: "0 0 24px", fontStyle: "italic" }}>
            all in one place.
          </p>
          <p style={{ fontSize: "16px", color: "#6B5B4F", marginBottom: "28px", lineHeight: 1.6, maxWidth: "520px", marginLeft: "auto", marginRight: "auto" }}>
            Restaurants, wedding vendors, temples, roommates, movies, and more — curated by the community, for the community.
          </p>
          <div style={{ maxWidth: "540px", margin: "0 auto", position: "relative" }}>
            <Search size={20} style={{ position: "absolute", left: "18px", top: "50%", transform: "translateY(-50%)", color: "#A89888" }} />
            <input
              value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleSearch()}
              placeholder="Search restaurants, roommates, movies, services..."
              style={{
                width: "100%", padding: "16px 130px 16px 48px", borderRadius: "16px",
                border: "1px solid #E0D8CF", fontSize: "15px", fontFamily: fb,
                background: "white", boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
                boxSizing: "border-box", outline: "none",
              }}
            />
            <button onClick={handleSearch} style={{
              position: "absolute", right: "6px", top: "50%", transform: "translateY(-50%)",
              background: primary, color: "white", border: "none", borderRadius: "12px",
              padding: "10px 20px", fontFamily: fb, fontWeight: 600, fontSize: "14px", cursor: "pointer",
            }}>Search</button>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "8px", marginTop: "20px" }}>
            {["Biryani", "Roommates", "Wedding Vendors", "Temples", "Indian Movies", "Send Money"].map(t => (
              <button key={t} onClick={() => setSearchQuery(t)} style={{
                padding: "6px 14px", borderRadius: "999px", border: "1px solid #E8E0D8",
                background: "white", fontSize: "12px", fontFamily: fb, color: "#6B5B4F",
                cursor: "pointer", fontWeight: 500, transition: "all 0.2s",
              }}>{t}</button>
            ))}
          </div>
        </div>
      </section>

      {/* Sponsored */}
      <section style={{ maxWidth: "1100px", margin: "0 auto", padding: "24px 20px 0" }}>
        <SponsoredCard ad={SPONSORED_HOME[0]} />
      </section>

      {/* Category Grid */}
      <section style={{ maxWidth: "1100px", margin: "0 auto", padding: "40px 20px" }}>
        <h2 style={{ fontFamily: ff, fontSize: "28px", fontWeight: 700, marginBottom: "6px" }}>
          Explore Detroit&apos;s Desi World
        </h2>
        <p style={{ color: "#8A7968", fontSize: "15px", marginBottom: "28px" }}>
          Everything the South Asian community needs.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "14px" }}>
          {CATEGORIES.map(cat => <CategoryCard key={cat.id} cat={cat} />)}
        </div>
      </section>

      {/* Community Board Preview */}
      <section style={{ background: "white", padding: "50px 20px", borderTop: "1px solid #EDE6DE", borderBottom: "1px solid #EDE6DE" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "20px", flexWrap: "wrap", gap: "8px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <MessageSquare size={18} color={primary} />
              <h2 style={{ fontFamily: ff, fontSize: "24px", fontWeight: 700, margin: 0 }}>Community Board</h2>
            </div>
            <Link href="/community" style={{ color: primary, fontWeight: 600, fontSize: "14px", fontFamily: fb, display: "flex", alignItems: "center", gap: "4px" }}>
              View all posts <ArrowRight size={14} />
            </Link>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "14px" }}>
            {CLASSIFIEDS_POSTS.slice(0, 4).map(post => {
              const catInfo = CLASSIFIEDS_CATEGORIES.find(c => c.id === post.cat);
              return (
                <Link key={post.id} href="/community" style={{
                  padding: "16px 18px", borderRadius: "14px", border: "1px solid #EDE6DE",
                  display: "block", transition: "all 0.2s", textDecoration: "none", color: "inherit",
                }}>
                  <div style={{ display: "flex", gap: "8px", marginBottom: "6px", alignItems: "center" }}>
                    <span style={{ padding: "2px 8px", borderRadius: "999px", fontSize: "11px", fontWeight: 600, background: "#F5EDE4", color: "#8A7968" }}>
                      {catInfo?.icon} {catInfo?.label}
                    </span>
                    <span style={{ fontSize: "11px", color: "#A89888" }}>{post.date}</span>
                  </div>
                  <h4 style={{ fontFamily: ff, fontSize: "14px", fontWeight: 600, margin: "0 0 4px", lineHeight: 1.3 }}>
                    {post.title}
                  </h4>
                  <div style={{ fontSize: "12px", color: "#A89888" }}>
                    <MessageSquare size={11} style={{ display: "inline", verticalAlign: "middle" }} /> {post.replies} replies
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Blog Preview */}
      <section style={{ maxWidth: "1100px", margin: "0 auto", padding: "40px 20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "20px", flexWrap: "wrap", gap: "8px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <BookOpen size={18} color={teal} />
            <h2 style={{ fontFamily: ff, fontSize: "24px", fontWeight: 700, margin: 0 }}>From the Blog</h2>
          </div>
          <Link href="/blog" style={{ color: primary, fontWeight: 600, fontSize: "14px", fontFamily: fb, display: "flex", alignItems: "center", gap: "4px" }}>
            All articles <ArrowRight size={14} />
          </Link>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "16px" }}>
          {BLOG_ARTICLES.filter(a => a.featured).map(a => (
            <Link key={a.id} href={`/blog/${a.slug}`} style={{
              borderRadius: "16px", overflow: "hidden", border: "1px solid #EDE6DE",
              background: "white", transition: "transform 0.2s, box-shadow 0.2s",
              display: "block", textDecoration: "none", color: "inherit",
            }}>
              <div style={{ height: "6px", background: `linear-gradient(90deg, ${a.color}, ${a.color}80)` }} />
              <div style={{ padding: "20px" }}>
                <div style={{ display: "flex", gap: "8px", marginBottom: "6px" }}>
                  <span style={{ fontSize: "11px", fontWeight: 600, color: a.color, textTransform: "uppercase" }}>{a.category}</span>
                  <span style={{ fontSize: "11px", color: "#A89888" }}>{a.readTime}</span>
                </div>
                <h3 style={{ fontFamily: ff, fontSize: "17px", fontWeight: 600, margin: "0 0 8px", lineHeight: 1.3 }}>{a.title}</h3>
                <p style={{ fontSize: "13px", color: "#8A7968", lineHeight: 1.5, margin: 0 }}>
                  {a.excerpt.substring(0, 100)}...
                </p>
              </div>
            </Link>
          ))}
          <SponsoredCard ad={SPONSORED_HOME[1]} style={{ border: "1px solid #EDE6DE" }} />
        </div>
      </section>

      {/* Trending */}
      <section style={{ maxWidth: "1100px", margin: "0 auto", padding: "20px 20px 40px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
          <TrendingUp size={18} color="#C75B39" />
          <h2 style={{ fontFamily: ff, fontSize: "22px", fontWeight: 700, margin: 0 }}>Trending</h2>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
          {TRENDING.map((t, i) => (
            <button key={i} onClick={() => { setSearchQuery(t); }} style={{
              padding: "8px 16px", borderRadius: "999px", background: "white",
              border: "1px solid #E8E0D8", fontSize: "13px", fontFamily: fb,
              fontWeight: 500, color: "#5A4A3F", cursor: "pointer", transition: "all 0.2s",
            }}>{t}</button>
          ))}
        </div>
      </section>

      {/* Events + Remittance */}
      <section style={{ background: "white", padding: "50px 20px", borderTop: "1px solid #EDE6DE", borderBottom: "1px solid #EDE6DE" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "20px" }}>
            <h2 style={{ fontFamily: ff, fontSize: "24px", fontWeight: 700 }}>Upcoming Events</h2>
            <Link href="/events" style={{ color: primary, fontWeight: 600, fontSize: "14px", fontFamily: fb, display: "flex", alignItems: "center", gap: "4px" }}>
              View all <ArrowRight size={14} />
            </Link>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "14px" }}>
            {EVENTS.slice(0, 4).map((ev, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "14px", padding: "16px 18px", borderRadius: "14px", border: "1px solid #EDE6DE" }}>
                <span style={{ fontSize: "28px" }}>{ev.icon}</span>
                <div>
                  <h4 style={{ fontFamily: ff, fontSize: "15px", fontWeight: 600, margin: "0 0 3px" }}>{ev.name}</h4>
                  <div style={{ fontSize: "12px", color: "#8A7968" }}>
                    <Clock size={11} style={{ display: "inline", verticalAlign: "middle" }} /> {ev.date} · <MapPin size={11} style={{ display: "inline", verticalAlign: "middle" }} /> {ev.where}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Remittance + Sponsored */}
      <section style={{ maxWidth: "1100px", margin: "0 auto", padding: "40px 20px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "16px" }}>
          <div style={{
            background: `linear-gradient(135deg, ${teal}08, ${teal}04)`,
            borderRadius: "20px", padding: "30px", border: "1px solid #EDE6DE",
          }}>
            <h3 style={{ fontFamily: ff, fontSize: "20px", fontWeight: 700, margin: "0 0 6px" }}>💸 Sending money home?</h3>
            <p style={{ fontSize: "14px", color: "#5A4A3F", margin: "0 0 16px" }}>Compare Wise, Remitly, Xoom — side by side.</p>
            <Link href="/category/travel" style={{
              display: "inline-block", padding: "10px 22px", borderRadius: "12px",
              background: teal, color: "white", fontFamily: fb, fontWeight: 600,
              fontSize: "14px",
            }}>
              Compare Now <ArrowRight size={14} style={{ display: "inline", marginLeft: 6, verticalAlign: "middle" }} />
            </Link>
          </div>
          <SponsoredCard ad={SPONSORED_HOME[2]} />
        </div>
      </section>

      {/* Suggest Business */}
      <section style={{ maxWidth: "700px", margin: "0 auto", padding: "20px 20px 40px", textAlign: "center" }}>
        <div style={{
          background: `linear-gradient(135deg, ${primary}06, ${marigold}06)`,
          borderRadius: "20px", padding: "40px 30px", border: "1px solid #EDE6DE",
        }}>
          <h2 style={{ fontFamily: ff, fontSize: "24px", fontWeight: 700, marginBottom: "8px" }}>
            Know a business we&apos;re missing?
          </h2>
          <p style={{ fontSize: "15px", color: "#6B5B4F", marginBottom: "20px" }}>Help us grow the directory.</p>
          <button style={{
            padding: "12px 28px", borderRadius: "12px", background: primary,
            color: "white", border: "none", fontFamily: fb, fontWeight: 600,
            fontSize: "15px", cursor: "pointer",
          }}>
            Suggest a Business <ArrowRight size={14} style={{ display: "inline", marginLeft: 6, verticalAlign: "middle" }} />
          </button>
        </div>
      </section>

      {/* Newsletter */}
      <NewsletterSignup />
    </>
  );
}
