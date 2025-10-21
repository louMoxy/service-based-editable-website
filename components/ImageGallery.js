import React, { useState } from 'react';
import CustomLink from './CustomLink';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const ImageGallery = ({
  // Section configuration
  title = "Our Gallery",
  subtitle = "A collection of images and moments",
  
  // Gallery data
  images = [
    {
      src: "/images/gallery-1.jpg",
      alt: "Gallery Image 1",
      title: "Image Title",
      description: "Optional description text",
      link: null
    },
    {
      src: "/images/gallery-2.jpg",
      alt: "Gallery Image 2",
      title: "Another Image",
      description: "More details about this image",
      link: "/gallery/image-2"
    }
  ],
  
  // Layout options
  columns = 3, // 1-6 columns
  aspectRatio = "default", // 'default', 'square', 'wide', 'tall', 'auto'
  
  // Styling options
  backgroundColor = "bg-white",
  textColor = "text-gray-900",
  titleColor = "text-gray-900",
  cardStyle = "default", // 'default', 'elevated', 'outlined'
  
  // Text options
  showTitles = true,
  showDescriptions = true,
  
  // Hover options
  hoverEffect = "scale", // 'none', 'scale', 'overlay'
  
  // Lightbox options
  lightbox = false,
  lightboxTitle = "Gallery Image",
  
  // Layout options
  containerMaxWidth = "max-w-7xl",
  padding = "py-16 px-4 sm:px-6 lg:px-8"
}) => {
  
  const [lightboxImage, setLightboxImage] = useState(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  
  const getAspectRatioClasses = () => {
    switch (aspectRatio) {
      case 'square':
        return "aspect-square";
      case 'wide':
        return "aspect-video";
      case 'tall':
        return "aspect-[3/4]";
      case 'auto':
        return "aspect-auto";
      default:
        return "aspect-[4/3]"; // Default aspect ratio
    }
  };

  const getCardClasses = () => {
    const baseClasses = "h-full transition-all duration-300";
    
    // Add hover effects based on hoverEffect option
    const hoverClasses = hoverEffect === 'none' 
      ? '' 
      : hoverEffect === 'scale' 
        ? 'hover:transform hover:-translate-y-2' 
        : 'hover:transform hover:-translate-y-2';
    
    switch (cardStyle) {
      case 'elevated':
        return `${baseClasses} ${hoverClasses} bg-white shadow-lg hover:shadow-xl border border-gray-100 rounded-lg overflow-hidden`;
      case 'outlined':
        return `${baseClasses} ${hoverClasses} bg-transparent border-2 border-gray-200 hover:border-blue-500 hover:bg-blue-50 rounded-lg overflow-hidden`;
      default:
        return `${baseClasses} ${hoverClasses} bg-white/80 backdrop-blur-sm border border-gray-200 hover:shadow-lg rounded-lg overflow-hidden`;
    }
  };

  const getColumnLayout = () => {
    switch (columns) {
      case 1:
        return "grid-cols-1 max-w-2xl mx-auto";
      case 2:
        return "grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto";
      case 3:
        return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto";
      case 4:
        return "grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-7xl mx-auto";
      case 5:
        return "grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 max-w-7xl mx-auto";
      case 6:
        return "grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-3 max-w-7xl mx-auto";
      default:
        return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto";
    }
  };

  const openLightbox = (image, index) => {
    if (lightbox) {
      setLightboxImage(image);
      setLightboxIndex(index);
    }
  };

  const closeLightbox = () => {
    setLightboxImage(null);
  };

  const nextLightboxImage = () => {
    const nextIndex = (lightboxIndex + 1) % images.length;
    setLightboxIndex(nextIndex);
    setLightboxImage(images[nextIndex]);
  };

  const prevLightboxImage = () => {
    const prevIndex = (lightboxIndex - 1 + images.length) % images.length;
    setLightboxIndex(prevIndex);
    setLightboxImage(images[prevIndex]);
  };

  const renderImage = (image, index) => {
    const imageElement = (
      <div className={getCardClasses()}>
        {/* Image */}
        <div 
          className={`relative overflow-hidden ${getAspectRatioClasses()} ${lightbox ? 'cursor-pointer' : ''}`}
          onClick={() => openLightbox(image, index)}
        >
          <img
            src={image.src}
            alt={image.alt}
            className={`w-full h-full object-cover transition-transform duration-300 ${
              hoverEffect === 'scale' ? 'hover:scale-105' : ''
            }`}
          />
          
          {/* Overlay on hover */}
          {hoverEffect === 'overlay' && (
            <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors duration-300" />
          )}
        </div>

        {/* Text Content */}
        {(showTitles || showDescriptions) && (image.title || image.description) && (
          <div className="p-4">
            {showTitles && image.title && (
              <h3 className={`text-lg font-semibold mb-2 ${titleColor}`}>
                {image.title}
              </h3>
            )}
            {showDescriptions && image.description && (
              <p className={`text-sm leading-relaxed ${textColor}`}>
                {image.description}
              </p>
            )}
          </div>
        )}
      </div>
    );

    // Wrap with link if provided (only if lightbox is disabled)
    if (image.link && !lightbox) {
      return (
        <CustomLink key={index} href={image.link} className="block">
          {imageElement}
        </CustomLink>
      );
    }

    return <div key={index}>{imageElement}</div>;
  };

  const renderLightbox = () => {
    if (!lightboxImage) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90">
        {/* Close button */}
        <button
          onClick={closeLightbox}
          className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors duration-200 z-10"
        >
          <X className="w-8 h-8" />
        </button>

        {/* Navigation arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevLightboxImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors duration-200 z-10"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
            <button
              onClick={nextLightboxImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors duration-200 z-10"
            >
              <ChevronRight className="w-8 h-8" />
            </button>
          </>
        )}

        {/* Image */}
        <div className="max-w-4xl max-h-[90vh] mx-4">
          <img
            src={lightboxImage.src}
            alt={lightboxImage.alt}
            className="w-full h-full object-contain rounded-lg"
          />
        </div>

        {/* Image info */}
        {(lightboxImage.title || lightboxImage.description) && (
          <div className="absolute bottom-4 left-4 right-4 text-center text-white">
            {lightboxImage.title && (
              <h3 className="text-xl font-semibold mb-2">{lightboxImage.title}</h3>
            )}
            {lightboxImage.description && (
              <p className="text-sm opacity-90">{lightboxImage.description}</p>
            )}
          </div>
        )}
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
              <p className={`text-lg md:text-xl ${textColor} max-w-3xl mx-auto`}>
                {subtitle}
              </p>
            )}
          </div>
        )}

        {/* Gallery Grid */}
        <div className={`grid ${getColumnLayout()}`}>
          {images.map((image, index) => renderImage(image, index))}
        </div>
      </div>

      {/* Lightbox */}
      {renderLightbox()}
    </section>
  );
};

export default ImageGallery;
