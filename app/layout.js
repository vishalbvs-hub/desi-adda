import "./globals.css";
import { AppProvider } from "@/lib/context";
import TopBar from "@/components/TopBar";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

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

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AppProvider>
          <TopBar />
          <Nav />
          {children}
          <Footer />
        </AppProvider>
      </body>
    </html>
  );
}
