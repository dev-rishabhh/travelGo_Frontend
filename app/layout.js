
import "./globals.css";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export const metadata = {
  title:
  {
    template: "%s |Explore Temples, Culture & Heritage| Holiday Vibes",
    default: "Explore Temples, Culture & Heritage| Holiday Vibes"
  },
  description: "Explore Ayodhya, Varanasi, Lucknow, Jaipur and Delhi with our customized spiritual tour packages",
  keywords:"Ayodhya tours, Ayodhya Varanasi tour, Ram Mandir, Delhi Jaipur tour, Lucknow Ayodhya Tour"
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
