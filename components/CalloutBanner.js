import React from 'react';
import CustomLink from './CustomLink';
import { 
  ArrowRight, 
  CheckCircle, 
  Star, 
  Zap, 
  Heart, 
  Target, 
  Award,
  BookOpen,
  Calendar,
  Mail,
  Download,
  ExternalLink
} from 'lucide-react';

const CalloutBanner = ({
  // Content configuration
  title = "Ready to Get Started?",
  subtitle = "Join thousands of satisfied customers and transform your business today.",
  
  // CTA Buttons (1-2 buttons)
  primaryButton = {
    text: "Get Started Now",
    href: "/contact",
    style: "primary", // 'primary', 'secondary', 'outline'
    icon: "ArrowRight"
  },
  secondaryButton = {
    text: "Learn More",
    href: "/about",
    style: "secondary",
    icon: null
  },
  
  // Background configuration
  backgroundStyle = "solid", // 'solid', 'gradient', 'image'
  backgroundColor = "bg-blue-600",
  gradientFrom = "from-blue-600",
  gradientTo = "to-purple-600",
  backgroundImage = "/images/cta-banner-bg.jpg",
  overlayOpacity = "bg-black/40",
  
  // Text alignment
  alignment = "center", // 'left', 'center', 'right'
  
  // Decorative elements
  showIcon = true,
  icon = "Star", // 'Star', 'CheckCircle', 'Zap', 'Heart', 'Target', 'Award', 'BookOpen', 'Calendar', 'Mail', 'Download'
  iconColor = "text-white",
  iconSize = "large", // 'small', 'medium', 'large'
  
  // Styling options
  textColor = "text-white",
  titleColor = "text-white",
  subtitleColor = "text-white/90",
  
  // Layout options
  containerMaxWidth = "max-w-4xl",
  padding = "py-16 px-4 sm:px-6 lg:px-8",
  borderRadius = "rounded-lg",
  
  // Additional options
  showSubtitle = true,
  className = ""
}) => {
  
  // Icon mapping
  const iconMap = {
    ArrowRight,
    CheckCircle,
    Star,
    Zap,
    Heart,
    Target,
    Award,
    BookOpen,
    Calendar,
    Mail,
    Download,
    ExternalLink
  };

  const getIconSize = () => {
    switch (iconSize) {
      case 'small':
        return 'w-8 h-8';
      case 'medium':
        return 'w-12 h-12';
      case 'large':
        return 'w-16 h-16';
      default:
        return 'w-12 h-12';
    }
  };

  const getAlignmentClasses = () => {
    switch (alignment) {
      case 'left':
        return 'text-left';
      case 'right':
        return 'text-right';
      default:
        return 'text-center';
    }
  };

  const getButtonClasses = (buttonStyle, isPrimary = true) => {
    const baseClasses = "inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2";
    
    switch (buttonStyle) {
      case 'primary':
        return `${baseClasses} bg-white text-gray-900 hover:bg-gray-100 focus:ring-white shadow-lg hover:shadow-xl`;
      case 'secondary':
        return `${baseClasses} bg-transparent border-2 border-white text-white hover:bg-white hover:text-gray-900 focus:ring-white`;
      case 'outline':
        return `${baseClasses} bg-transparent border-2 border-white/50 text-white hover:bg-white hover:text-gray-900 focus:ring-white`;
      default:
        return `${baseClasses} bg-white text-gray-900 hover:bg-gray-100 focus:ring-white shadow-lg hover:shadow-xl`;
    }
  };

  const getBackgroundClasses = () => {
    switch (backgroundStyle) {
      case 'gradient':
        return `bg-gradient-to-r ${gradientFrom} ${gradientTo}`;
      case 'image':
        return 'bg-cover bg-center bg-no-repeat';
      default:
        return backgroundColor;
    }
  };

  const getBackgroundStyle = () => {
    if (backgroundStyle === 'image') {
      return {
        backgroundImage: `url(${backgroundImage})`
      };
    }
    return {};
  };

  const renderIcon = () => {
    if (!showIcon || !icon) return null;
    
    const IconComponent = iconMap[icon];
    if (!IconComponent) return null;

    return (
      <div className="mb-6 flex justify-center">
        <div className={`${getIconSize()} ${iconColor} flex items-center justify-center`}>
          <IconComponent className="w-full h-full" />
        </div>
      </div>
    );
  };

  const renderButton = (button, isPrimary = true) => {
    if (!button || !button.text || !button.href) return null;
    
    const IconComponent = button.icon ? iconMap[button.icon] : null;
    
    return (
      <CustomLink
        key={isPrimary ? 'primary' : 'secondary'}
        href={button.href}
        className={getButtonClasses(button.style, isPrimary)}
      >
        {button.text}
        {IconComponent && (
          <IconComponent className="ml-2 w-4 h-4" />
        )}
      </CustomLink>
    );
  };

  return (
    <section 
      className={`relative overflow-hidden ${getBackgroundClasses()} ${padding} ${borderRadius} ${className}`}
      style={getBackgroundStyle()}
    >
      {/* Image Overlay */}
      {backgroundStyle === 'image' && (
        <div className={`absolute inset-0 ${overlayOpacity}`} />
      )}
      
      {/* Content */}
      <div className={`relative z-10 ${containerMaxWidth} mx-auto ${getAlignmentClasses()}`}>
        {/* Decorative Icon */}
        {renderIcon()}
        
        {/* Title */}
        <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-4 ${titleColor}`}>
          {title}
        </h2>
        
        {/* Subtitle */}
        {showSubtitle && subtitle && (
          <p className={`text-lg md:text-xl mb-8 max-w-2xl ${alignment === 'center' ? 'mx-auto' : ''} ${subtitleColor}`}>
            {subtitle}
          </p>
        )}
        
        {/* CTA Buttons */}
        <div className={`flex flex-col sm:flex-row gap-4 ${alignment === 'center' ? 'justify-center' : alignment === 'right' ? 'justify-end' : 'justify-start'}`}>
          {renderButton(primaryButton, true)}
          {renderButton(secondaryButton, false)}
        </div>
      </div>
    </section>
  );
};

export default CalloutBanner;
