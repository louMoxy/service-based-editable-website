import React from 'react';
import CustomLink from './CustomLink';

const Hero = ({
  // Text content
  headline = "Transform Your Business with Expert Coaching",
  subheadline = "Unlock your potential and achieve breakthrough results with personalized coaching strategies designed for your success.",
  
  // Button configuration
  primaryButtonText = "Book a Free Discovery Call",
  primaryButtonLink = "/contact",
  secondaryButtonText = "View Coaching Packages", 
  secondaryButtonLink = "/packages",
  
  // Media configuration
  heroImage = "/images/hero-image.jpg",
  heroVideo = null,
  
  // Styling options
  overlay = true,
  overlayOpacity = "bg-black/40",
  textAlign = "center",
  showScrollIndicator = true,
  
  // Layout options
  fullHeight = true,
  minHeight = "min-h-screen"
}) => {
  return (
    <section className={`relative ${minHeight} flex items-center justify-center overflow-hidden`}>
      {/* Background Media */}
      {heroVideo ? (
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src={heroVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
      )}
      
      {/* Overlay */}
      {overlay && (
        <div className={`absolute inset-0 ${overlayOpacity}`} />
      )}
      
      {/* Content */}
      <div className={`relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-${textAlign}`}>
        <div className="max-w-4xl mx-auto">
          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 leading-tight">
            {headline}
          </h1>
          
          {/* Subheadline */}
          <p className="text-lg sm:text-xl lg:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            {subheadline}
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <CustomLink
              href={primaryButtonLink}
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              {primaryButtonText}
            </CustomLink>
            
            <CustomLink
              href={secondaryButtonLink}
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white border-2 border-white hover:bg-white hover:text-gray-900 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              {secondaryButtonText}
            </CustomLink>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      {showScrollIndicator && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
          <div className="animate-bounce">
            <svg 
              className="w-6 h-6 text-white" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M19 14l-7 7m0 0l-7-7m7 7V3" 
              />
            </svg>
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;
