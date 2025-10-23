import React, { useState } from 'react';
import CustomLink from './CustomLink';
import { 
  Check, 
  X, 
  Star, 
  Zap, 
  Crown, 
  Award,
  ArrowRight,
  CheckCircle
} from 'lucide-react';

const Pricing = ({
  // Section configuration
  title = "Choose Your Plan",
  subtitle = "Select the perfect plan for your needs and start your transformation today",
  
  // Pricing plans (2-4 plans)
  plans = [
    {
      name: "Starter",
      description: "Perfect for getting started",
      monthlyPrice: 97,
      yearlyPrice: 970,
      currency: "$",
      billingPeriod: "month",
      features: [
        "1-on-1 coaching session",
        "Email support",
        "Basic resources",
        "30-day money-back guarantee"
      ],
      buttonText: "Get Started",
      buttonLink: "/contact",
      popular: false,
      icon: "Zap"
    },
    {
      name: "Professional",
      description: "Most popular choice",
      monthlyPrice: 197,
      yearlyPrice: 1970,
      currency: "$",
      billingPeriod: "month",
      features: [
        "4 coaching sessions per month",
        "Priority email support",
        "Advanced resources & templates",
        "Monthly group calls",
        "Progress tracking",
        "60-day money-back guarantee"
      ],
      buttonText: "Choose Professional",
      buttonLink: "/contact",
      popular: true,
      icon: "Star"
    },
    {
      name: "Enterprise",
      description: "For serious transformation",
      monthlyPrice: 397,
      yearlyPrice: 3970,
      currency: "$",
      billingPeriod: "month",
      features: [
        "Unlimited coaching sessions",
        "24/7 priority support",
        "Complete resource library",
        "Weekly group calls",
        "Advanced progress tracking",
        "Custom action plans",
        "90-day money-back guarantee"
      ],
      buttonText: "Go Enterprise",
      buttonLink: "/contact",
      popular: false,
      icon: "Crown"
    }
  ],
  
  // Pricing toggle
  showToggle = true,
  toggleLabels = {
    monthly: "Monthly",
    yearly: "Yearly"
  },
  yearlyDiscount = "Save 20%",
  
  // Styling options
  backgroundColor = "bg-white",
  textColor = "text-gray-900",
  titleColor = "text-gray-900",
  cardStyle = "elevated", // 'default', 'elevated', 'outlined', 'gradient'
  
  // Popular plan styling
  popularBadgeText = "Most Popular",
  popularBadgeColor = "bg-blue-600",
  popularBorderColor = "border-blue-500",
  
  // Layout options
  containerMaxWidth = "max-w-7xl",
  padding = "py-16 px-4 sm:px-6 lg:px-8"
}) => {
  
  const [isYearly, setIsYearly] = useState(false);
  
  // Icon mapping
  const iconMap = {
    Check,
    X,
    Star,
    Zap,
    Crown,
    Award,
    ArrowRight,
    CheckCircle
  };

  const getCardClasses = (isPopular = false) => {
    const baseClasses = "h-full p-8 rounded-lg transition-all duration-300 hover:transform hover:-translate-y-2 relative flex flex-col";
    
    if (isPopular) {
      switch (cardStyle) {
        case 'elevated':
          return `${baseClasses} bg-white shadow-xl border-2 ${popularBorderColor} hover:shadow-2xl`;
        case 'outlined':
          return `${baseClasses} bg-transparent border-2 ${popularBorderColor} hover:bg-blue-50`;
        case 'gradient':
          return `${baseClasses} bg-gradient-to-br from-blue-50 to-indigo-100 border-2 ${popularBorderColor} hover:from-blue-100 hover:to-indigo-200`;
        default:
          return `${baseClasses} bg-white shadow-lg border-2 ${popularBorderColor} hover:shadow-xl`;
      }
    }
    
    switch (cardStyle) {
      case 'elevated':
        return `${baseClasses} bg-white shadow-lg hover:shadow-xl border border-gray-100`;
      case 'outlined':
        return `${baseClasses} bg-transparent border-2 border-gray-200 hover:border-blue-500 hover:bg-blue-50`;
      case 'gradient':
        return `${baseClasses} bg-gradient-to-br from-gray-50 to-blue-50 border border-gray-200 hover:from-blue-50 hover:to-indigo-100`;
      default:
        return `${baseClasses} bg-white/80 backdrop-blur-sm border border-gray-200 hover:shadow-lg`;
    }
  };

  const getColumnLayout = () => {
    switch (plans.length) {
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

  const getButtonClasses = (isPopular = false) => {
    const baseClasses = "w-full py-3 px-6 rounded-lg font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 text-center";
    
    if (isPopular) {
      return `${baseClasses} bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 shadow-lg hover:shadow-xl`;
    }
    
    return `${baseClasses} bg-gray-900 text-white hover:bg-gray-800 focus:ring-gray-500`;
  };

  const formatPrice = (price) => {
    return price.toLocaleString();
  };

  const renderPopularBadge = () => (
    <div className={`absolute -top-4 left-1/2 transform -translate-x-1/2 ${popularBadgeColor} text-white px-4 py-1 rounded-full text-sm font-semibold shadow-lg`}>
      {popularBadgeText}
    </div>
  );

  const renderPlan = (plan, index) => {
    const isPopular = plan.popular;
    const currentPrice = isYearly ? plan.yearlyPrice : plan.monthlyPrice;
    const IconComponent = plan.icon ? iconMap[plan.icon] : null;
    
    return (
      <div key={index} className={getCardClasses(isPopular)}>
        {/* Popular Badge */}
        {isPopular && renderPopularBadge()}
        
        {/* Plan Header */}
        <div className="text-center mb-6">
          {/* Icon */}
          {IconComponent && (
            <div className="mb-4 flex justify-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <IconComponent className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          )}
          
          {/* Plan Name */}
          <h3 className={`text-2xl font-bold mb-2 ${titleColor}`}>
            {plan.name}
          </h3>
          
          {/* Description */}
          {plan.description && (
            <p className={`text-sm ${textColor} mb-4`}>
              {plan.description}
            </p>
          )}
          
          {/* Price */}
          <div className="mb-6">
            <div className={`text-4xl font-bold ${titleColor}`}>
              {plan.currency}{formatPrice(currentPrice)}
            </div>
            <div className={`text-sm ${textColor}`}>
              per {plan.billingPeriod}
            </div>
            {isYearly && yearlyDiscount && (
              <div className="text-sm text-green-600 font-semibold mt-1">
                {yearlyDiscount}
              </div>
            )}
          </div>
        </div>
        
         {/* Features List */}
         <div className="mb-8 flex-grow">
           <ul className="space-y-3">
             {plan.features.map((feature, featureIndex) => (
               <li key={featureIndex} className="flex items-start">
                 <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5 mr-3" />
                 <span className={`text-sm ${textColor}`}>
                   {feature}
                 </span>
               </li>
             ))}
           </ul>
         </div>
         
         {/* CTA Button */}
         <div className="mt-auto flex justify-center">
             <CustomLink
             href={plan.buttonLink}
             className={getButtonClasses(isPopular)}
             >
             {plan.buttonText}
             </CustomLink>
         </div>
      </div>
    );
  };

  return (
    <section className={`${backgroundColor} ${padding}`}>
      <div className={`${containerMaxWidth} mx-auto`}>
        {/* Section Header */}
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

        {/* Pricing Toggle */}
        {showToggle && (
          <div className="flex justify-center mb-12">
            <div className="bg-gray-100 rounded-lg p-1 flex">
              <button
                onClick={() => setIsYearly(false)}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  !isYearly 
                    ? 'bg-white text-gray-900 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {toggleLabels.monthly}
              </button>
              <button
                onClick={() => setIsYearly(true)}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  isYearly 
                    ? 'bg-white text-gray-900 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {toggleLabels.yearly}
                {yearlyDiscount && (
                  <span className="ml-2 text-xs bg-green-100 text-green-600 px-2 py-0.5 rounded-full">
                    {yearlyDiscount}
                  </span>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Pricing Plans */}
        <div className={`grid ${getColumnLayout()}`}>
          {plans.map((plan, index) => renderPlan(plan, index))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
