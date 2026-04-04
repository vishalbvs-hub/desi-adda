import "./globals.css";
import { cookies } from "next/headers";
import { AppProvider } from "@/lib/context";
import TopBar from "@/components/TopBar";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import NewsletterOverlay from "@/components/NewsletterOverlay";
import AskAdda from "@/components/AskAdda";
import GlobalSearch from "@/components/GlobalSearch";
import FestivalStrip from "@/components/FestivalStrip";

export const metadata = {
  title: "Desi Adda — Your Desi Life in Detroit",
  description: "Restaurants, wedding vendors, temples, roommates, movies, and more — curated by the community, for the community.",
  openGraph: {
    title: "Desi Adda — Your Desi Life in Detroit",
    description: "The gathering place for desi life in America. Find restaurants, wedding vendors, temples, roommates, Indian movies, and more in Metro Detroit.",
    siteName: "Desi Adda",
    locale: "en_US",
    type: "website",
  },
};

export default async function RootLayout({ children }) {
  const cookieStore = await cookies();
  const isAuthed = cookieStore.get("site-access")?.value === "granted";

  return (
    <html lang="en">
      <body>
        {isAuthed ? (
          <AppProvider>
            <NewsletterOverlay />
            <TopBar />
            <Nav />
            <GlobalSearch />
            <FestivalStrip />
            {children}
            <Footer />
            <AskAdda />
          </AppProvider>
        ) : (
          children
        )}
      </body>
    </html>
  );
}
