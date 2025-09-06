import "./AboutUs.css";

const AboutUs = () => {
  return (
    <section className="about-section" id="about" data-aos="fade-right">
      <div className="about-content">
        <div className="about-text">
           <h4 className="text-center text-blue-500 p-2">OUR ACCOMMODATIONS</h4>
          <h2>About ExploreEase Tourism</h2>
          <p>
            At ExploreEase Tourism, we specialize in crafting personalized travel experiences that turn your dreams into unforgettable journeys. Whether it's a relaxing beach vacation, an adventure-packed getaway, or a cultural exploration, we ensure every trip is seamless and memorable.
          </p>
          <p>
            Our mission is to provide top-notch service, affordable packages, and 24/7 support to travelers across the globe. Trusted by thousands, we bring your travel dreams to life — one destination at a time.
          </p>
        </div>
        <div className="about-image" data-aos="fade-left">
          <img src="https://images.unsplash.com/photo-1502920514313-52581002a659" alt="About ExploreEase" />
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
