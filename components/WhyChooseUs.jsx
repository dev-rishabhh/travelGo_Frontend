import React from "react";
import { Check, Headset, Heart, Hotel, } from "lucide-react"

function WhyChooseUs() {
  return (
    <section className="px-10 py-5 bg-blue-50">
      <h4 className="text-center text-blue-500 p-2">OUR ACCOMMODATIONS</h4>
      <h2 className="text-[32px] mb-8 font-bold text-center">Why Choose TravelX</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div
          className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover-scale animate-fade-in"
          style={{ animationDelay: `${1 * 0.1}s` }}
        >
          <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
            <Heart className="h-8 w-8 text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Handpicked Destinations</h3>
          <p className="text-gray-600">Explore best places tailored to your needs</p>
        </div>
        <div
          className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover-scale animate-fade-in"
          style={{ animationDelay: `${2 * 0.1}s` }}
        >
          <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
            <Check className="h-8 w-8 text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Best Price </h3>
          <p className="text-gray-600">Get the best travel deals without comprimising on quality</p>
        </div>
        <div
          className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover-scale animate-fade-in"
          style={{ animationDelay: `${3 * 0.1}s` }}
        >
          <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
            <Hotel className="h-8 w-8 text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Comfortable Stays</h3>
          <p className="text-gray-600">Stay in top-rated hotels with safety ensued</p>
        </div>
        <div
          className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover-scale animate-fade-in"
          style={{ animationDelay: `${4 * 0.1}s` }}
        >
          <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
            <Headset className="h-8 w-8 text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">24/7 Support </h3>
          <p className="text-gray-600">Our travel experts are always ready to help you</p>
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUs;
