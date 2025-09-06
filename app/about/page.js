
import { Button } from "@/components/ui/button";
import { ArrowRight, Award, Heart, Globe, Users, TrendingUp, Clock, MapPin, Shield, Star, Quote, Mail } from "lucide-react";
import Link from "next/link";


const About = () => {
  const stats = [
    { icon: Users, number: "50,000+", label: "Happy Travelers" },
    { icon: Globe, number: "150+", label: "Destinations" },
    { icon: Award, number: "25+", label: "Years Experience" },
    { icon: TrendingUp, number: "98%", label: "Satisfaction Rate" }
  ];

  const values = [
    {
      icon: Heart,
      title: "Passion for Travel",
      description: "We believe travel transforms lives and creates connections that transcend borders."
    },
    {
      icon: Award,
      title: "Excellence in Service",
      description: "Every detail matters. We strive for perfection in planning and execution."
    },
    {
      icon: Globe,
      title: "Sustainable Tourism",
      description: "We're committed to responsible travel that benefits local communities."
    },
    {
      icon: Clock,
      title: "24/7 Support",
      description: "Our dedicated team is always available to ensure your journey is seamless."
    }
  ];


  return (

    <div className=" py-16 min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-blue-300 text-white py-24">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
            About Us
            {/* <span className="block text-blue-200">Wanderlust & Wonder</span> */}
          </h1>
          <p className="text-xl text-red-50 max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
            For over two decades, we've been crafting extraordinary journeys that inspire,
            educate, and create lasting memories for travelers from around the globe.
          </p>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-16 bg-blue-50">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="max-w-4xl mx-auto animate-fade-in">
            <h2 className="text-4xl font-bold text-gray-900 mb-8">Our Mission</h2>
            <p className="text-2xl text-gray-700 leading-relaxed mb-8">
              "To bridge cultures, create meaningful connections, and inspire a deeper understanding
              of our world through transformative travel experiences that respect local communities
              and preserve the beauty of our planet for future generations."
            </p>
            <div className="flex justify-center items-center gap-4">
              <div className="w-12 h-0.5 bg-blue-600"></div>
              <Globe className="h-8 w-8 text-blue-600" />
              <div className="w-12 h-0.5 bg-blue-600"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-2 bg-white">
        <div className="max-w-7xl mx-auto px-3">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center animate-fade-in hover-scale"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="bg-blue-400 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="h-8 w-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-blue-400 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-14 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="">
            <div className="animate-fade-in">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                A Journey That Started With a Dream
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Founded in 1999 by Sarah Chen, TourEscape began as a small travel consultancy
                with a simple mission: to make the world more accessible through thoughtfully
                designed travel experiences.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                What started as weekend trips for friends and family has grown into a globally
                recognized travel company, but our core values remain unchanged - authentic
                experiences, personal connections, and sustainable travel practices.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Today, we're proud to have facilitated over 50,000 journeys, created partnerships
                with local communities worldwide, and maintained our 98% customer satisfaction rate.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                Our commitment to responsible tourism has earned us recognition as industry leaders
                in sustainable travel, and we continue to innovate while preserving the authentic
                spirit of exploration that defines us.
              </p>
              <Button className="bg-blue-600 hover:bg-blue-700 hover-scale">
                <Link href="/tours"> Explore Our Tours </Link>
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>


      {/* Values Section */}
      <section className="py-12 bg-blue-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 animate-fade-in">Our Core Values</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
              These principles guide every decision we make and every experience we create.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover-scale animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                  <value.icon className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Team Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 animate-fade-in">Meet The Founder</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Passionate travel experts dedicated to creating your perfect journey.
            </p>
          </div>
          <div className="">
              <div
                className="grid  grid-cols-1 md:grid-cols-2  bg-gray-50 p-4 rounded-lg group animate-fade-in hover-scale"
              >
                <div className="relative flex-shrink-0">
                  <img
                    src={"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face"}
                    alt="Mohit Tiwari"
                    className=" rounded-sm object-cover shadow-lg  duration-300"
                  />
                  <div className="absolute inset-0 rounded-full  transition-all duration-300"></div>
                </div>
                <div className="flex-1 px-3 my-2 md:my-0">
                  <h3 className="text-2xl font-bold text-gray-900 text-center">Mohit Tiwari</h3>
                  <p className="text-blue-600 font-medium mb-3 text-center">Founder & CEO</p>
                  <p className="text-gray-600 mb-3"> " lorem ipsum de ivor lorem ipsum
                    lorem ipsum de ivor lorem ipsum  lorem ipsum de ivor lorem ipsum  lorem ipsum de ivor lorem ipsum  lorem ipsum de ivor lorem ipsum
                    lorem ipsum de ivor lorem ipsum  lorem ipsum de ivor lorem ipsum  lorem ipsum de ivor lorem ipsum  lorem ipsum de ivor lorem ipsum
                    lorem ipsum de ivor lorem ipsum  lorem ipsum de ivor lorem ipsum  lorem ipsum de ivor lorem ipsum  lorem ipsum de ivor lorem ipsum
                    lorem ipsum de ivor lorem ipsum  lorem ipsum de ivor lorem ipsum  lorem ipsum de ivor lorem ipsum  lorem ipsum de ivor lorem ipsum
                    lorem ipsum de ivor lorem ipsum  lorem ipsum de ivor lorem ipsum  lorem ipsum de ivor lorem ipsum
                    lorem ipsum de ivor lorem ipsum  lorem ipsum de ivor lorem ipsum  lorem ipsum de ivor lorem ipsum  lorem ipsum de ivor lorem ipsum
                    lorem ipsum de ivor lorem ipsum  lorem ipsum de ivor lorem ipsum "
                  </p>
                    <p className="text-sm text-gray-500 flex gap-1 items-center">
                      <Mail color="blue" size={"16px"}/>
                       Email:  test@gmail.com
                      </p>
                </div>
              </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-6">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl text-blue-400 font-bold mb-6 animate-fade-in">
            Ready to Start Your Adventure?
          </h2>
          <p className="text-xl  mb-8 max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Let our expert team craft the perfect journey tailored to your dreams and preferences.
            Join thousands of satisfied travelers who have discovered the world with TourEscape.
          </p>
          <div className="flex gap-4 justify-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <Button className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-3 hover-scale">
              <Link href="/tours">Browse Tours</Link>
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 text-lg px-8 py-3 hover-scale">
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
    </div>
  );
};

export default About;