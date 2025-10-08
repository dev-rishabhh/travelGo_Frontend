import { useState, } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import TestimonialCard from "./TestimonialCard";


const testimonials = [
{
  id: 2,
  name: "Ramesh Verma",
  role: "Bank Manager",
  content: "The local tour to Jaipur was incredibly well-organized. The guide was knowledgeable and everything ran on time. Highly trustworthy service!"
},
{
  id: 3,
  name: "Sunita Desai",
  role: "Homemaker",
  content: "I felt completely safe and cared for during our Varanasi temple tour. It’s rare to find such personal attention and local insight these days."
},
{
  id: 4,
  name: "Aarav Mehta",
  role: "Software Engineer",
  content: "Booked a weekend getaway to Rishikesh through this platform. Clean accommodations, transparent pricing, and no hidden surprises. Great job!"
},
{
  id: 5,
  name: "Neha Kulkarni",
  role: "College Professor",
  content: "I loved how culturally immersive our Nepal backwaters tour was. The local hosts were warm, and everything felt authentic—not touristy."
},
{
  id: 6,
  name: "Vikram Chauhan",
  role: "Photographer",
  content: "As someone who travels often, I was impressed by how smooth and reliable the booking experience was. The local food walk in Ayodhya was a highlight!"
}

];

const TestimonialCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);


  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => 
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const getVisibleTestimonials = () => {
    const visible = [];
    for (let i = -1; i <= 1; i++) {
      const index = (currentIndex + i + testimonials.length) % testimonials.length;
      visible.push({
        ...testimonials[index],
        position: i,
        isActive: i === 0
      });
    }
    return visible;
  };

  return (
    <div className="relative w-full max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-4xl md:text-5xl font-bold  bg-clip-text text-blue-600 mb-4">
          What Our Users Say
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Don't just take our word for it. Here's what real users have to say about their experience.
        </p>
      </div>

      {/* Carousel Container */}
      <div 
        className="relative overflow-hidden"
      >
        {/* Cards Container */}
        <div className="flex justify-center items-center gap-8 min-h-[320px]">
          {getVisibleTestimonials().map((testimonial, idx) => (
            <div
              key={`${testimonial.id}-${currentIndex}`}
              className={`
                flex-shrink-0 w-80 transition-all duration-700 ease-in-out
                ${testimonial.position === -1 ? 'hidden md:block transform translate-x-4' : ''}
                ${testimonial.position === 1 ? 'hidden md:block transform -translate-x-4' : ''}
                ${testimonial.position === 0 ? 'z-10' : 'z-0'}
              `}
            >
              <TestimonialCard
                name={testimonial.name}
                role={testimonial.role}
                company={testimonial.company}
                content={testimonial.content}
                rating={testimonial.rating}
                avatar={testimonial.avatar}
                isActive={testimonial.isActive}
              />
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={goToPrevious}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group border border-gray-200 hover:border-blue-300"
        >
          <ChevronLeft className="w-6 h-6 text-gray-600 group-hover:text-blue-600 transition-colors" />
        </button>
        
        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group border border-gray-200 hover:border-blue-300"
        >
          <ChevronRight className="w-6 h-6 text-gray-600 group-hover:text-blue-600 transition-colors" />
        </button>
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center gap-3 mt-2">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`
              w-3 h-3 rounded-full transition-all duration-300
              ${index === currentIndex 
                ? 'bg-blue-500 w-8' 
                : 'bg-gray-300 hover:bg-gray-400'
              }
            `}
          />
        ))}
      </div>

      {/* Background Decoration */}
      {/* <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-pink-400/20 to-blue-400/20 rounded-full blur-3xl"></div>
      </div> */}
    </div>
  );
};

export default TestimonialCarousel;