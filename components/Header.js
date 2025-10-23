import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown } from 'lucide-react';

const Header = ({
  // Header configuration
  logo = {
    text: "Your Logo",
    image: null,
    link: "/"
  },
  
  // Navigation items
  navigation = [
    { name: "Home", href: "/", type: "link" },
    { name: "About", href: "/about", type: "link" },
    { 
      name: "Services", 
      href: "/services", 
      type: "dropdown",
      dropdown: [
        { name: "Service 1", href: "/service-1" },
        { name: "Service 2", href: "/service-2" },
        { name: "Service 3", href: "/service-3" }
      ]
    },
    { name: "Blog", href: "/blog", type: "link" },
    { name: "Contact", href: "/contact", type: "link" }
  ],
  
  // CTA button
  ctaButton = {
    text: "Get Started",
    href: "/contact",
    show: true
  },
  
  // Styling options
  headerStyle = "default", // 'default', 'transparent', 'solid', 'glass'
  size = "default", // 'default', 'compact', 'large'
  
  // Layout options
  layout = "default", // 'default', 'centered', 'split'
  showMobileMenu = true,
  
  // Colors
  backgroundColor = "bg-white",
  textColor = "text-gray-900",
  logoColor = "text-gray-900",
  linkColor = "text-gray-600",
  linkHoverColor = "text-blue-600",
  
  // Additional options
  showLogo = true,
  showNavigation = true,
  showCTA = true,
  className = ""
}) => {
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleDropdownToggle = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  const getHeaderClasses = () => {
    const baseClasses = "w-full z-50 transition-all duration-300";
    
    
    // Style
    let styleClasses = '';
    switch (headerStyle) {
      case 'transparent':
        styleClasses = 'bg-transparent';
        break;
      case 'solid':
        styleClasses = `${backgroundColor} shadow-lg`;
        break;
      case 'glass':
        styleClasses = 'bg-white/80 backdrop-blur-md shadow-lg';
        break;
      default:
        styleClasses = `${backgroundColor} shadow-sm`;
    }
    
    // Size
    const sizeClasses = size === 'compact' ? 'py-2' : 
                       size === 'large' ? 'py-6' : 'py-4';
    
    return `${baseClasses} ${styleClasses} ${sizeClasses} ${className}`;
  };

  const getLogoClasses = () => {
    const baseClasses = "font-bold transition-colors duration-200";
    const sizeClasses = size === 'compact' ? 'text-xl' : 
                       size === 'large' ? 'text-3xl' : 'text-2xl';
    
    return `${baseClasses} ${sizeClasses} ${logoColor}`;
  };

  const getNavClasses = () => {
    const baseClasses = "hidden md:flex items-center space-x-8";
    return baseClasses;
  };

  const getLinkClasses = () => {
    const baseClasses = "font-medium transition-colors duration-200 hover:transition-colors";
    return `${baseClasses} ${linkColor} hover:${linkHoverColor}`;
  };

  const getCTAButtonClasses = () => {
    const baseClasses = "hidden md:inline-flex items-center px-6 py-2 rounded-lg font-semibold transition-colors duration-200";
    
    switch (headerStyle) {
      case 'transparent':
        return `${baseClasses} bg-blue-600 text-white hover:bg-blue-700`;
      case 'glass':
        return `${baseClasses} bg-blue-600 text-white hover:bg-blue-700 shadow-lg`;
      default:
        return `${baseClasses} bg-blue-600 text-white hover:bg-blue-700`;
    }
  };

  const getMobileMenuClasses = () => {
    const baseClasses = "md:hidden absolute top-full left-0 right-0 bg-white shadow-lg border-t";
    const openClasses = isMobileMenuOpen ? 'block' : 'hidden';
    return `${baseClasses} ${openClasses}`;
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

  const renderDropdown = (item, index) => {
    return (
      <div key={index} className="relative group">
        <button
          onClick={() => handleDropdownToggle(index)}
          className={`${getLinkClasses()} flex items-center space-x-1`}
        >
          <span>{item.name}</span>
          <ChevronDown className="w-4 h-4" />
        </button>
        
        {activeDropdown === index && (
          <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border py-2 z-50">
            {item.dropdown.map((dropdownItem, dropdownIndex) => (
              <Link
                key={dropdownIndex}
                href={dropdownItem.href}
                className="block px-4 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors duration-200"
                onClick={() => setActiveDropdown(null)}
              >
                {dropdownItem.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  };

  const renderNavigationItem = (item, index) => {
    if (item.type === 'dropdown') {
      return renderDropdown(item, index);
    }
    
    return (
      <Link
        key={index}
        href={item.href}
        className={getLinkClasses()}
      >
        {item.name}
      </Link>
    );
  };

  return (
    <header className={getHeaderClasses()}>
      <div className={getLayoutClasses()}>
        <div className="flex items-center justify-between">
          {/* Logo */}
          {showLogo && (
            <div className="flex-shrink-0">
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

          {/* Desktop Navigation */}
          {showNavigation && (
            <nav className={getNavClasses()}>
              {navigation.map((item, index) => renderNavigationItem(item, index))}
            </nav>
          )}

          {/* CTA Button */}
          {showCTA && ctaButton.show && (
            <div className="hidden md:block">
              <Link
                href={ctaButton.href}
                className={getCTAButtonClasses()}
              >
                {ctaButton.text}
              </Link>
            </div>
          )}

          {/* Mobile Menu Button */}
          {showMobileMenu && (
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors duration-200"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          )}
        </div>

        {/* Mobile Menu */}
        {showMobileMenu && (
          <div className={getMobileMenuClasses()}>
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item, index) => (
                <div key={index}>
                  {item.type === 'dropdown' ? (
                    <div>
                      <button
                        onClick={() => handleDropdownToggle(index)}
                        className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors duration-200 flex items-center justify-between"
                      >
                        {item.name}
                        <ChevronDown className="h-4 w-4" />
                      </button>
                      {activeDropdown === index && (
                        <div className="pl-4 space-y-1">
                          {item.dropdown.map((dropdownItem, dropdownIndex) => (
                            <Link
                              key={dropdownIndex}
                              href={dropdownItem.href}
                              className="block px-3 py-2 rounded-md text-sm text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-colors duration-200"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              {dropdownItem.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors duration-200"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
              
              {/* Mobile CTA Button */}
              {showCTA && ctaButton.show && (
                <div className="pt-4 pb-2">
                  <Link
                    href={ctaButton.href}
                    className="block w-full text-center px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {ctaButton.text}
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;