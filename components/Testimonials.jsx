import { useState, } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import TestimonialCard from "./TestimonialCard";


const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Product Manager",
    company: "TechCorp Inc.",
    content: "This platform has revolutionized how we handle our daily operations. The intuitive design and powerful features have increased our team's productivity by 40%. I can't imagine working without it now.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Software Engineer",
    company: "InnovateLab",
    content: "The attention to detail and user experience is phenomenal. Every feature feels thoughtfully designed and the performance is outstanding. It's rare to find software that exceeds expectations.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Marketing Director",
    company: "BrandBoost",
    content: "We've tried many solutions, but nothing comes close to this level of quality and reliability. The customer support is exceptional and the results speak for themselves.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 4,
    name: "David Kim",
    role: "CEO",
    company: "StartupXY",
    content: "As a startup founder, I need tools that scale with my business. This solution has grown with us from day one and continues to impress with new features and improvements.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 5,
    name: "Lisa Thompson",
    role: "Operations Manager",
    company: "Global Solutions",
    content: "The automation features have saved us countless hours every week. What used to take our team days now happens automatically with perfect accuracy. It's been a game-changer.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=150&h=150&fit=crop&crop=face"
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