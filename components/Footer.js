import React from 'react';
import Link from 'next/link';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Youtube, 
  Github, 
  Mail, 
  Phone,
  MapPin,
  Clock
} from 'lucide-react';

const Footer = ({
  // Footer configuration
  logo = {
    text: "Your Company",
    image: null,
    link: "/"
  },
  
  // Footer sections
  sections = [
    {
      title: "Company",
      links: [
        { name: "About Us", href: "/about" },
        { name: "Our Team", href: "/team" },
        { name: "Careers", href: "/careers" },
        { name: "Contact", href: "/contact" }
      ]
    },
    {
      title: "Services",
      links: [
        { name: "Web Design", href: "/web-design" },
        { name: "SEO", href: "/seo" },
        { name: "Marketing", href: "/marketing" },
        { name: "Consulting", href: "/consulting" }
      ]
    },
    {
      title: "Resources",
      links: [
        { name: "Blog", href: "/blog" },
        { name: "Help Center", href: "/help" },
        { name: "Privacy Policy", href: "/privacy" },
        { name: "Terms of Service", href: "/terms" }
      ]
    }
  ],
  
  // Contact information
  contact = {
    address: "123 Business St, City, State 12345",
    phone: "+1 (555) 123-4567",
    email: "info@company.com",
    hours: "Mon-Fri: 9AM-6PM"
  },
  
  // Social media links
  socialLinks = [
    { platform: "facebook", url: "https://facebook.com/yourpage" },
    { platform: "twitter", url: "https://twitter.com/yourhandle" },
    { platform: "instagram", url: "https://instagram.com/yourhandle" },
    { platform: "linkedin", url: "https://linkedin.com/company/yourcompany" }
  ],
  
  
  // Styling options
  footerStyle = "default", // 'default', 'minimal', 'dark', 'gradient'
  layout = "default", // 'default', 'centered', 'split'
  
  // Colors
  backgroundColor = "bg-gray-900",
  textColor = "text-gray-300",
  titleColor = "text-white",
  linkColor = "text-gray-400",
  linkHoverColor = "text-white",
  
  // Additional options
  showLogo = true,
  showSections = true,
  showContact = true,
  showSocial = true,
  showCopyright = true,
  copyrightText = "© 2024 Your Company. All rights reserved.",
  className = ""
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
    address: MapPin,
    hours: Clock
  };

  // Platform colors
  const platformColors = {
    facebook: "text-blue-400 hover:text-blue-300",
    twitter: "text-blue-400 hover:text-blue-300",
    instagram: "text-pink-400 hover:text-pink-300",
    linkedin: "text-blue-400 hover:text-blue-300",
    youtube: "text-red-400 hover:text-red-300",
    github: "text-gray-400 hover:text-gray-300"
  };

  const getFooterClasses = () => {
    const baseClasses = "w-full transition-all duration-300";
    
    switch (footerStyle) {
      case 'minimal':
        return `${baseClasses} ${backgroundColor} border-t`;
      case 'dark':
        return `${baseClasses} bg-black`;
      case 'gradient':
        return `${baseClasses} bg-gradient-to-r from-gray-900 to-gray-800`;
      default:
        return `${baseClasses} ${backgroundColor}`;
    }
  };

  const getLayoutClasses = () => {
    switch (layout) {
      case 'centered':
        return 'max-w-4xl mx-auto px-4 sm:px-6 lg:px-8';
      case 'split':
        return 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8';
      default:
        return 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8';
    }
  };

  const getLogoClasses = () => {
    const baseClasses = "font-bold transition-colors duration-200";
    return `${baseClasses} text-2xl ${titleColor}`;
  };

  const getSectionTitleClasses = () => {
    const baseClasses = "text-lg font-semibold mb-4";
    return `${baseClasses} ${titleColor}`;
  };

  const getLinkClasses = () => {
    const baseClasses = "block py-2 transition-colors duration-200";
    return `${baseClasses} ${linkColor} hover:${linkHoverColor}`;
  };

  const getSocialIconClasses = (platform) => {
    const baseClasses = "w-6 h-6 transition-colors duration-200";
    const colorClasses = platformColors[platform] || "text-gray-400 hover:text-gray-300";
    return `${baseClasses} ${colorClasses}`;
  };

  const renderSocialLink = (link, index) => {
    const IconComponent = iconMap[link.platform];
    
    if (!IconComponent) return null;

    return (
      <a
        key={index}
        href={link.url}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 hover:bg-gray-800 rounded-lg transition-colors duration-200"
        aria-label={`Follow us on ${link.platform}`}
      >
        <IconComponent className={getSocialIconClasses(link.platform)} />
      </a>
    );
  };

  const renderContactItem = (icon, text, href = null) => {
    const IconComponent = iconMap[icon];
    
    const content = (
      <div className="flex items-center space-x-3">
        {IconComponent && (
          <IconComponent className="w-5 h-5 text-gray-400 flex-shrink-0" />
        )}
        <span className={textColor}>{text}</span>
      </div>
    );

    if (href) {
      return (
        <a href={href} className="hover:opacity-80 transition-opacity duration-200">
          {content}
        </a>
      );
    }

    return content;
  };

  return (
    <footer className={getFooterClasses()}>
      <div className={getLayoutClasses()}>
        {/* Main Footer Content */}
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Logo and Description */}
            <div className="lg:col-span-1">
              {showLogo && (
                <div className="mb-6">
                  <Link href={logo.link} className="flex items-center">
                    {logo.image ? (
                      <img
                        src={logo.image}
                        alt={logo.text}
                        className="h-8 w-auto"
                      />
                    ) : (
                      <span className={getLogoClasses()}>
                        {logo.text}
                      </span>
                    )}
                  </Link>
                </div>
              )}
              
              <p className={`${textColor} mb-6 max-w-sm`}>
                We help businesses grow and succeed through innovative solutions and expert guidance.
              </p>
              
              {/* Social Links */}
              {showSocial && socialLinks.length > 0 && (
                <div className="flex space-x-2">
                  {socialLinks.map((link, index) => renderSocialLink(link, index))}
                </div>
              )}
            </div>

            {/* Footer Sections */}
            {showSections && sections.map((section, index) => (
              <div key={index}>
                <h3 className={getSectionTitleClasses()}>
                  {section.title}
                </h3>
                <ul className="space-y-2">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link
                        href={link.href}
                        className={getLinkClasses()}
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Contact Information */}
            {showContact && (
              <div>
                <h3 className={getSectionTitleClasses()}>
                  Contact Info
                </h3>
                <div className="space-y-4">
                  {contact.address && renderContactItem('address', contact.address)}
                  {contact.phone && renderContactItem('phone', contact.phone, `tel:${contact.phone}`)}
                  {contact.email && renderContactItem('email', contact.email, `mailto:${contact.email}`)}
                  {contact.hours && renderContactItem('hours', contact.hours)}
                </div>
              </div>
            )}
          </div>

        </div>

        {/* Copyright */}
        {showCopyright && (
          <div className="py-6 border-t border-gray-800">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className={`${textColor} text-sm`}>
                {copyrightText}
              </p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <Link href="/privacy" className={`${linkColor} hover:${linkHoverColor} text-sm transition-colors duration-200`}>
                  Privacy Policy
                </Link>
                <Link href="/terms" className={`${linkColor} hover:${linkHoverColor} text-sm transition-colors duration-200`}>
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </footer>
  );
};

export default Footer;