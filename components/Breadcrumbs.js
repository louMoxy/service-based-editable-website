import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ChevronRight, Home } from 'lucide-react';

const Breadcrumbs = ({
  // Custom breadcrumb data (overrides auto-generation)
  customBreadcrumbs = null,
  
  includeHome = true,
  homeLabel = "Home",
  homeHref = "/",
  
  // Route mapping for custom labels
  routeLabels = {
    "/about": "About Us",
    "/services": "Services",
    "/blog": "Blog",
    "/contact": "Contact",
    "/pricing": "Pricing",
    "/team": "Our Team",
    "/testimonials": "Testimonials",
    "/faq": "FAQ",
    "/privacy": "Privacy Policy",
    "/terms": "Terms of Service"
  },
  
  // Schema markup
  enableSchema = true,
  siteName = "Your Site",
  siteUrl = "https://yoursite.com",
  
  // Styling options
  backgroundColor = "bg-gray-50",
  textColor = "text-gray-600",
  linkColor = "text-blue-600",
  linkHoverColor = "text-blue-800",
  separatorColor = "text-gray-400",
  
  // Layout options
  containerMaxWidth = "max-w-7xl",
  padding = "py-4 px-4 sm:px-6 lg:px-8",
  className = ""
}) => {
  
  const router = useRouter();
  
  // Generate breadcrumbs from current route
  const generateBreadcrumbs = () => {
    if (customBreadcrumbs) {
      return customBreadcrumbs;
    }
    
    const pathSegments = router.asPath.split('/').filter(segment => segment !== '');
    const breadcrumbs = [];
    
    // Add home if enabled
    if (includeHome) {
      breadcrumbs.push({
        label: homeLabel,
        href: homeHref,
        isLast: pathSegments.length === 0
      });
    }
    
    // Build breadcrumbs from path segments
    let currentPath = '';
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const isLast = index === pathSegments.length - 1;
      
      // Get label from route mapping or format segment
      let label = routeLabels[currentPath] || formatSegment(segment);
      
      // Handle dynamic routes (e.g., [slug])
      if (segment.includes('[') && segment.includes(']')) {
        label = formatSegment(segment);
      }
      
      breadcrumbs.push({
        label,
        href: currentPath,
        isLast
      });
    });
    
    return breadcrumbs;
  };
  
  // Format segment for display
  const formatSegment = (segment) => {
    return segment
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };
  
  // Generate JSON-LD schema markup
  const generateSchemaMarkup = (breadcrumbs) => {
    if (!enableSchema) return null;
    
    const schema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": breadcrumbs.map((breadcrumb, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": breadcrumb.label,
        "item": `${siteUrl}${breadcrumb.href}`
      }))
    };
    
    return (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    );
  };
  
  // Get breadcrumb classes
  const getBreadcrumbClasses = () => {
    return `flex items-center space-x-1 text-sm ${textColor}`;
  };
  
  // Get link classes
  const getLinkClasses = (isLast = false) => {
    if (isLast) {
      return `${textColor} font-medium`;
    }
    return `${linkColor} hover:${linkHoverColor} transition-colors duration-200`;
  };
  
  // Get separator classes
  const getSeparatorClasses = () => {
    return `${separatorColor} w-4 h-4`;
  };
  
  // Render breadcrumb item
  const renderBreadcrumbItem = (breadcrumb, index) => {
    const isLast = breadcrumb.isLast;
    
    return (
      <React.Fragment key={index}>
        {index > 0 && (
          <ChevronRight className={getSeparatorClasses()} />
        )}
        
        {isLast ? (
          <span className={getLinkClasses(true)}>
            {breadcrumb.label}
          </span>
        ) : (
          <Link href={breadcrumb.href} className={getLinkClasses()}>
            {breadcrumb.label}
          </Link>
        )}
      </React.Fragment>
    );
  };
  
  // Render home icon
  const renderHomeIcon = () => {
    if (!includeHome) return null;
    
    return (
      <Home className="w-4 h-4 mr-2" />
    );
  };
  
  // Get breadcrumbs data
  const breadcrumbs = generateBreadcrumbs();
  
  // Don't render if no breadcrumbs or only home
  if (breadcrumbs.length <= 1) {
    return null;
  }
  
  return (
    <>
      {/* Schema Markup */}
      {generateSchemaMarkup(breadcrumbs)}
      
      {/* Breadcrumbs */}
      <nav 
        className={`${backgroundColor} ${padding} ${className}`}
        aria-label="Breadcrumb"
      >
        <div className={`${containerMaxWidth} mx-auto`}>
          <ol className={getBreadcrumbClasses()}>
            {breadcrumbs.map((breadcrumb, index) => (
              <li key={index} className="flex items-center">
                {index === 0 && includeHome && renderHomeIcon()}
                {renderBreadcrumbItem(breadcrumb, index)}
              </li>
            ))}
          </ol>
        </div>
      </nav>
    </>
  );
};

export default Breadcrumbs;
