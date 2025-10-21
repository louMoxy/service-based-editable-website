import React from 'react';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Youtube, 
  Github, 
  Mail, 
  Phone,
  Globe,
  MessageCircle,
  Send
} from 'lucide-react';

const SocialLinks = ({
  // Section configuration
  title = "Follow Us",
  subtitle = "Connect with us on social media",
  
  // Social links data
  links = [
    {
      platform: "facebook",
      url: "https://facebook.com/yourpage",
      label: "Follow us on Facebook"
    },
    {
      platform: "twitter",
      url: "https://twitter.com/yourhandle",
      label: "Follow us on Twitter"
    },
    {
      platform: "instagram",
      url: "https://instagram.com/yourhandle",
      label: "Follow us on Instagram"
    },
    {
      platform: "linkedin",
      url: "https://linkedin.com/company/yourcompany",
      label: "Connect on LinkedIn"
    }
  ],
  
  // Layout options
  layout = "horizontal", // 'horizontal', 'vertical'
  columns = 4, // for grid layout when layout is 'grid'
  
  // Styling options
  backgroundColor = "bg-white",
  textColor = "text-gray-900",
  titleColor = "text-gray-900",
  iconSize = "medium", // 'small', 'medium', 'large'
  iconStyle = "default", // 'default', 'filled', 'outlined'
  
  // Layout options
  containerMaxWidth = "max-w-4xl",
  padding = "py-16 px-4 sm:px-6 lg:px-8"
}) => {
  
  // Icon mapping
  const iconMap = {
    facebook: Facebook,
    twitter: Twitter,
    instagram: Instagram,
    linkedin: Linkedin,
    youtube: Youtube,
    github: Github,
    email: Mail,
    phone: Phone,
    website: Globe,
    whatsapp: MessageCircle,
    telegram: Send
  };

  // Platform colors
  const platformColors = {
    facebook: "text-blue-600 hover:text-blue-700",
    twitter: "text-blue-400 hover:text-blue-500",
    instagram: "text-pink-600 hover:text-pink-700",
    linkedin: "text-blue-700 hover:text-blue-800",
    youtube: "text-red-600 hover:text-red-700",
    github: "text-gray-800 hover:text-gray-900",
    email: "text-gray-600 hover:text-gray-700",
    phone: "text-green-600 hover:text-green-700",
    website: "text-purple-600 hover:text-purple-700",
    whatsapp: "text-green-500 hover:text-green-600",
    telegram: "text-blue-500 hover:text-blue-600"
  };

  const getIconSize = () => {
    switch (iconSize) {
      case 'small':
        return 'w-5 h-5';
      case 'large':
        return 'w-8 h-8';
      default:
        return 'w-6 h-6';
    }
  };

  const getIconClasses = (platform) => {
    const baseClasses = `${getIconSize()} transition-colors duration-200`;
    const colorClasses = platformColors[platform] || "text-gray-600 hover:text-gray-700";
    
    switch (iconStyle) {
      case 'filled':
        return `${baseClasses} ${colorClasses} p-2 rounded-full bg-gray-100 hover:bg-gray-200`;
      case 'outlined':
        return `${baseClasses} ${colorClasses} p-2 rounded-full border-2 border-gray-300 hover:border-gray-400`;
      default:
        return `${baseClasses} ${colorClasses}`;
    }
  };

  const getLayoutClasses = () => {
    switch (layout) {
      case 'vertical':
        return "flex flex-col space-y-4";
      case 'grid':
        return `grid grid-cols-2 md:grid-cols-${columns} gap-4`;
      default:
        return "flex flex-wrap justify-center items-center space-x-6";
    }
  };

  const renderSocialLink = (link, index) => {
    const IconComponent = iconMap[link.platform];
    
    if (!IconComponent) {
      console.warn(`Unknown platform: ${link.platform}`);
      return null;
    }

    return (
      <a
        key={index}
        href={link.url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center space-x-2 hover:transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg p-2"
        aria-label={link.label}
      >
        <IconComponent className={getIconClasses(link.platform)} />
        {layout === 'vertical' && (
          <span className={`text-sm font-medium ${textColor}`}>
            {link.platform.charAt(0).toUpperCase() + link.platform.slice(1)}
          </span>
        )}
      </a>
    );
  };

  return (
    <section className={`${backgroundColor} ${padding}`}>
      <div className={`${containerMaxWidth} mx-auto`}>
        {/* Section Header */}
        {(title || subtitle) && (
          <div className="text-center mb-8">
            {title && (
              <h2 className={`text-2xl md:text-3xl font-bold mb-2 ${titleColor}`}>
                {title}
              </h2>
            )}
            {subtitle && (
              <p className={`text-base ${textColor}`}>
                {subtitle}
              </p>
            )}
          </div>
        )}

        {/* Social Links */}
        <div className={getLayoutClasses()}>
          {links.map((link, index) => renderSocialLink(link, index))}
        </div>
      </div>
    </section>
  );
};

export default SocialLinks;
