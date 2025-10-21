import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';

const Testimonials = ({
  // Section configuration
  title = "What Our Clients Say",
  subtitle = "Real stories from real people who have transformed their lives",
  
  // Testimonials data
  testimonials = [
    {
      quote: "This coaching program completely transformed my business. I went from struggling to make ends meet to generating six-figure revenue in just 8 months.",
      name: "Sarah Johnson",
      business: "E-commerce Entrepreneur",
      rating: 5
    },
    {
      quote: "The personalized approach and expert guidance helped me overcome my biggest challenges and achieve goals I never thought possible.",
      name: "Michael Chen",
      business: "Tech Startup Founder",
      rating: 5
    },
    {
      quote: "Working with this team was the best investment I've ever made. The ROI has been incredible, both personally and professionally.",
      name: "Emily Rodriguez",
      business: "Marketing Agency Owner",
      rating: 5
    }
  ],
  
  // Layout options
  layout = "carousel", // 'carousel' or 'grid'
  columns = 3, // for grid layout
  
  // Carousel options
  autoPlay = true,
  autoPlayInterval = 5000,
  showDots = true,
  showArrows = true,
  
  // Styling options
  backgroundColor = "bg-gray-50",
  textColor = "text-gray-900",
  titleColor = "text-gray-900",
  cardStyle = "elevated", // 'default', 'elevated', 'outlined'
  showQuoteIcon = true, // Show quote icon when no photo
  
  // Layout options
  containerMaxWidth = "max-w-7xl",
  padding = "py-16 px-4 sm:px-6 lg:px-8"
}) => {
  
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(autoPlay);

  // Auto-play functionality
  useEffect(() => {
    if (layout === 'carousel' && isAutoPlaying && autoPlay) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % testimonials.length);
      }, autoPlayInterval);
      
      return () => clearInterval(interval);
    }
  }, [isAutoPlaying, autoPlay, autoPlayInterval, testimonials.length, layout]);

  // Pause auto-play on hover
  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(autoPlay);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const getCardClasses = () => {
    const baseClasses = "h-full p-6 rounded-lg transition-all duration-300";
    
    switch (cardStyle) {
      case 'elevated':
        return `${baseClasses} bg-white shadow-lg hover:shadow-xl border border-gray-100`;
      case 'outlined':
        return `${baseClasses} bg-transparent border-2 border-gray-200 hover:border-blue-500 hover:bg-blue-50`;
      default:
        return `${baseClasses} bg-white/80 backdrop-blur-sm border border-gray-200 hover:shadow-lg`;
    }
  };

  const getGridLayout = () => {
    switch (columns) {
      case 1:
        return "grid-cols-1 max-w-2xl mx-auto";
      case 2:
        return "grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto";
      case 3:
        return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto";
      case 4:
        return "grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto";
      default:
        return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto";
    }
  };

  const renderTestimonial = (testimonial, index) => (
    <div key={index} className={getCardClasses()}>
      {/* Quote Icon or Client Photo */}
      <div className="mb-4 flex justify-center">
        {testimonial.photo ? (
          <img
            src={testimonial.photo}
            alt={testimonial.name}
            className="w-16 h-16 rounded-full object-cover"
          />
        ) : showQuoteIcon ? (
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <Quote className="w-6 h-6 text-blue-600" />
          </div>
        ) : null}
      </div>

      {/* Rating */}
      {testimonial.rating && (
        <div className="flex justify-center mb-4">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-5 h-5 ${
                i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
              }`}
            />
          ))}
        </div>
      )}

      {/* Quote */}
      <blockquote className={`text-lg leading-relaxed mb-6 text-center ${textColor}`}>
        "{testimonial.quote}"
      </blockquote>

       {/* Client Info */}
       <div className="flex items-center justify-center">
         {/* Name and Business */}
         <div className="text-center">
           <div className={`font-semibold ${textColor}`}>
             {testimonial.name}
           </div>
           <div className="text-sm text-gray-600">
             {testimonial.business}
           </div>
         </div>
       </div>
    </div>
  );

  const renderCarousel = () => (
    <div 
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Testimonial */}
      <div className="overflow-hidden">
        <div 
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {testimonials.map((testimonial, index) => (
            <div key={index} className="w-full flex-shrink-0">
              <div className="max-w-4xl mx-auto">
                {renderTestimonial(testimonial, index)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      {showArrows && testimonials.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50 transition-colors duration-200 z-10"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50 transition-colors duration-200 z-10"
          >
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </button>
        </>
      )}

      {/* Dots Indicator */}
      {showDots && testimonials.length > 1 && (
        <div className="flex justify-center mt-8 space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                index === currentSlide ? 'bg-blue-600' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );

  const renderGrid = () => (
    <div className={`grid ${getGridLayout()}`}>
      {testimonials.map((testimonial, index) => renderTestimonial(testimonial, index))}
    </div>
  );

  return (
    <section className={`${backgroundColor} ${padding}`}>
      <div className={`${containerMaxWidth} mx-auto`}>
        {/* Section Header */}
        {(title || subtitle) && (
          <div className="text-center mb-12">
            {title && (
              <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-4 ${titleColor}`}>
                {title}
              </h2>
            )}
            {subtitle && (
              <p className={`text-lg md:text-xl ${textColor} max-w-3xl mx-auto`}>
                {subtitle}
              </p>
            )}
          </div>
        )}

        {/* Testimonials Content */}
        {layout === 'carousel' ? renderCarousel() : renderGrid()}
      </div>
    </section>
  );
};

export default Testimonials;
