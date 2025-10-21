import React from 'react';
import CustomLink from './CustomLink';

const ContentSection = ({
  // Section configuration
  title = "Our Services",
  subtitle = "Discover what we can do for you",
  columns = 2,
  
  // Content for each column
  column1 = {
    type: 'text',
    title: 'Service 1',
    content: 'Description of service 1',
    image: null,
    ctaText: null,
    ctaLink: null
  },
  column2 = {
    type: 'text',
    title: 'Service 2', 
    content: 'Description of service 2',
    image: null,
    ctaText: null,
    ctaLink: null
  },
  column3 = {
    type: 'text',
    title: 'Service 3',
    content: 'Description of service 3', 
    image: null,
    ctaText: null,
    ctaLink: null
  },
  
  // Styling options
  backgroundColor = "bg-white",
  textColor = "text-gray-900",
  titleColor = "text-gray-900",
  cardStyle = "default", // 'default', 'elevated', 'outlined'
  imagePosition = "top", // 'top', 'bottom', 'left', 'right'
  
  // Layout options
  containerMaxWidth = "max-w-7xl",
  padding = "py-16 px-4 sm:px-6 lg:px-8"
}) => {
  
  const getCardClasses = () => {
    const baseClasses = "h-full p-6 rounded-lg transition-all duration-300 hover:transform hover:-translate-y-2";
    
    switch (cardStyle) {
      case 'elevated':
        return `${baseClasses} bg-white shadow-lg hover:shadow-xl border border-gray-100`;
      case 'outlined':
        return `${baseClasses} bg-transparent border-2 border-gray-200 hover:border-blue-500 hover:bg-blue-50`;
      default:
        return `${baseClasses} bg-white/80 backdrop-blur-sm border border-gray-200 hover:shadow-lg`;
    }
  };

  const getImageClasses = (position) => {
    const baseClasses = "w-full object-cover rounded-lg";
    
    switch (position) {
      case 'top':
        return `${baseClasses} mb-4`;
      case 'bottom':
        return `${baseClasses} mt-4`;
      case 'left':
        return `${baseClasses} w-1/3 float-left mr-4`;
      case 'right':
        return `${baseClasses} w-1/3 float-right ml-4`;
      default:
        return `${baseClasses} mb-4`;
    }
  };

  const getColumnLayout = () => {
    switch (columns) {
      case 1:
        return "grid-cols-1 max-w-2xl mx-auto";
      case 2:
        return "grid-cols-1 md:grid-cols-2 gap-8";
      case 3:
        return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8";
      default:
        return "grid-cols-1 md:grid-cols-2 gap-8";
    }
  };

  const renderColumn = (column, index) => {
    if (!column) return null;

    const { type, title, content, image, ctaText, ctaLink } = column;

    return (
      <div key={index} className={getCardClasses()}>
        {/* Image */}
        {image && (type === 'image' || type === 'text-image') && (
          <div className="mb-4">
            <img
              src={image}
              alt={title || `Column ${index + 1}`}
              className={getImageClasses(imagePosition)}
            />
          </div>
        )}

        {/* Text Content */}
        {(type === 'text' || type === 'text-image') && (
          <div className="flex-1">
            {title && (
              <h3 className={`text-xl font-bold mb-3 ${titleColor}`}>
                {title}
              </h3>
            )}
            {content && (
              <p className={`text-base leading-relaxed mb-4 ${textColor}`}>
                {content}
              </p>
            )}
          </div>
        )}

        {/* Image only */}
        {type === 'image' && !title && !content && (
          <div className="flex items-center justify-center h-64">
            <img
              src={image}
              alt={`Column ${index + 1}`}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        )}

        {/* CTA Button */}
        {ctaText && ctaLink && (
          <div className="mt-4">
            <CustomLink
              href={ctaLink}
              className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
            >
              {ctaText}
            </CustomLink>
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

        {/* Columns Grid */}
        <div className={`grid ${getColumnLayout()}`}>
          {columns >= 1 && renderColumn(column1, 0)}
          {columns >= 2 && renderColumn(column2, 1)}
          {columns >= 3 && renderColumn(column3, 2)}
        </div>
      </div>
    </section>
  );
};

export default ContentSection;
