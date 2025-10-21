import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Carousel = ({
  // Section configuration
  title = "Featured Items",
  subtitle = "Discover our latest offerings",
  
  // Carousel data
  items = [
    {
      image: "/images/carousel-1.jpg",
      title: "Featured Item 1",
      description: "Description of the first featured item",
      overlayText: "New Collection",
      link: "/featured-1"
    },
    {
      image: "/images/carousel-2.jpg",
      title: "Featured Item 2",
      description: "Description of the second featured item",
      overlayText: "Limited Edition",
      link: "/featured-2"
    },
    {
      image: "/images/carousel-3.jpg",
      title: "Featured Item 3",
      description: "Description of the third featured item",
      overlayText: "Best Seller",
      link: "/featured-3"
    }
  ],
  
  // Carousel options
  autoPlay = true,
  autoPlayInterval = 5000,
  showArrows = true,
  showDots = true,
  showOverlay = true,
  
  // Styling options
  backgroundColor = "bg-white",
  textColor = "text-white",
  titleColor = "text-gray-900",
  overlayStyle = "dark", // 'dark', 'light', 'gradient'
  
  // Layout options
  containerMaxWidth = "max-w-7xl",
  padding = "py-16 px-4 sm:px-6 lg:px-8"
}) => {
  
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(autoPlay);

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlaying && autoPlay && items.length > 1) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % items.length);
      }, autoPlayInterval);
      
      return () => clearInterval(interval);
    }
  }, [isAutoPlaying, autoPlay, autoPlayInterval, items.length]);

  // Pause auto-play on hover
  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(autoPlay);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % items.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + items.length) % items.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const getOverlayClasses = () => {
    switch (overlayStyle) {
      case 'light':
        return "bg-white/90 text-gray-900";
      case 'gradient':
        return "bg-gradient-to-r from-black/80 to-transparent text-white";
      default:
        return "bg-black/70 text-white";
    }
  };

  const renderCarouselItem = (item, index) => {
    const isActive = index === currentSlide;
    
    return (
      <div
        key={index}
        className={`absolute inset-0 transition-opacity duration-500 ${
          isActive ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* Background Image */}
        <div 
          className="w-full h-full bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${item.image})` }}
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/30" />
        
        {/* Content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center max-w-4xl mx-auto px-4">
            {/* Overlay Text */}
            {showOverlay && item.overlayText && (
              <div className={`inline-block px-4 py-2 mb-6 rounded-full text-sm font-semibold ${getOverlayClasses()}`}>
                {item.overlayText}
              </div>
            )}
            
            {/* Title */}
            {item.title && (
              <h3 className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-4 ${textColor}`}>
                {item.title}
              </h3>
            )}
            
            {/* Description */}
            {item.description && (
              <p className={`text-lg md:text-xl mb-8 max-w-2xl mx-auto ${textColor}`}>
                {item.description}
              </p>
            )}
            
            {/* CTA Button */}
            {item.link && (
              <a
                href={item.link}
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
              >
                Learn More
              </a>
            )}
          </div>
        </div>
      </div>
    );
  };

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
              <p className={`text-lg md:text-xl ${titleColor} max-w-3xl mx-auto`}>
                {subtitle}
              </p>
            )}
          </div>
        )}

        {/* Carousel */}
        <div 
          className="relative w-full h-96 md:h-[500px] lg:h-[600px] rounded-lg overflow-hidden"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Carousel Items */}
          {items.map((item, index) => renderCarouselItem(item, index))}
          
          {/* Navigation Arrows */}
          {showArrows && items.length > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white shadow-lg rounded-full p-3 transition-colors duration-200 z-10"
              >
                <ChevronLeft className="w-6 h-6 text-gray-800" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white shadow-lg rounded-full p-3 transition-colors duration-200 z-10"
              >
                <ChevronRight className="w-6 h-6 text-gray-800" />
              </button>
            </>
          )}
          
          {/* Dots Indicator */}
          {showDots && items.length > 1 && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
              {items.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                    index === currentSlide ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Carousel;
