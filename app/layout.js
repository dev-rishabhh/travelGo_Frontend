
import "./globals.css";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export const metadata = {
  title:"Tour Packages |Explore Temples, Culture & Heritage| Holiday Vibes",
  description: "Discover  Ayodhya, Varanasi, Lucknow, Delhi, Jaipur with us. Plan perfect journey across spiritual centers of India",
  keywords:"same day ayodhya tour, jaipur tour pacakges, varanasi tour packages, ayodhya tour packages,ayodhya tour package,best time visit ayodhya,ayodhya package"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
