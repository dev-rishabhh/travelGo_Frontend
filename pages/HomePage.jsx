"use client"
import './HomePage.css'
import AboutUs from '@/components/AboutUs';
import Testimonials from '@/components/Testimonials';
import FeaturedTours from '@/components/FeaturedTours';
import Stay from '@/components/Stay';
import Gallery from '@/components/Carousel';
import WhyChooseUs from '@/components/WhyChooseUs';
import FloatingButton from '@/components/FloatingButton';

import Link from 'next/link';

export const metadata = {
  title:
  {
    template: "Home |Explore Temples, Culture & Heritage| Holiday Vibes",
  }
};

function HomePage() {
  return (
    <>
    
    <div>
      <div className="hero-section">
        <div className="hero-content">
          <h1>Welcome to Holiday Vibes</h1>
          <p>Your journey to unforgettable destinations starts here</p>
          <Link href="/booking" className="btn btn-primary">Book Now</Link>
        </div>
      </div>

      <video autoPlay muted loop className="hero-video">
        <source src={'./hero-video.mp4'} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <AboutUs />
      <FloatingButton />
      <FeaturedTours />
      <Stay />
      <WhyChooseUs />
      <Gallery />
      <Testimonials />
    </div>
    </>
  )
}

export default HomePage