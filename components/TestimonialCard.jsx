import { Quote, } from "lucide-react";

const TestimonialCard = ({ 
  name, 
  role, 
  company, 
  content, 
  rating, 
  avatar, 
  isActive = false 
}) => {
  return (
    <div className={`
      relative bg-white rounded-2xl p-6 shadow-xl transition-all duration-500 transform
      ${isActive ? 'scale-105 shadow-2xl border-2 border-blue-200' : 'scale-95 opacity-80'}
      hover:scale-100 hover:opacity-100 hover:shadow-2xl
       flex flex-col justify-between
    `}>
      {/* Quote Icon */}
      <div className="absolute -top-3 -left-3 w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
        <Quote className="w-3 h-3 text-white" />
      </div>
      
      {/* Content */}
      <div className="flex-grow">
        <p className="text-gray-700 text-base leading-relaxed mb-4 italic line-clamp-4">
          "{content}"
        </p>
      </div>
      
      {/* Profile */}
      <div className="flex items-center gap-3">
        <div className="relative">
        </div>
        <div>
          <h4 className="font-bold text-gray-900 text-base">{name}</h4>
          <p className="text-gray-600 text-sm">{role}</p>
        </div>
      </div>
      
      {/* Decorative gradient border */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 hover:opacity-10 transition-opacity duration-300 pointer-events-none"></div>
    </div>
  );
};

export default TestimonialCard;