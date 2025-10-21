import React, { useState, useEffect, useRef } from 'react';
import { 
  Users, 
  TrendingUp, 
  Award, 
  Star, 
  Target, 
  Zap, 
  Heart, 
  Shield,
  CheckCircle,
  Clock,
  DollarSign,
  BarChart3
} from 'lucide-react';

const Stats = ({
  // Section configuration
  title = "Our Impact",
  subtitle = "Numbers that speak for themselves",
  
  // Cards configuration (1-4 cards)
  cards = [
    {
      title: "Happy Clients",
      subtitle: "Satisfied customers",
      description: "Clients who have transformed their lives with our coaching",
      number: 500,
      suffix: "+",
      prefix: "",
      icon: "Users",
      image: null,
      animationDuration: 2000
    },
    {
      title: "Success Rate",
      subtitle: "Goal achievement",
      description: "Percentage of clients who achieve their primary goals",
      number: 95,
      suffix: "%",
      prefix: "",
      icon: "Target",
      image: null,
      animationDuration: 2500
    }
  ],
  
  // Layout options  
  // Styling options
  backgroundColor = "bg-gray-50",
  textColor = "text-gray-900",
  titleColor = "text-gray-900",
  cardStyle = "elevated", // 'default', 'elevated', 'outlined', 'gradient'
  numberColor = "text-blue-600",
  
  // Animation options
  animateNumbers = true,
  animationDelay = 100,
  
  // Layout options
  containerMaxWidth = "max-w-7xl",
  padding = "py-16 px-4 sm:px-6 lg:px-8"
}) => {
  
  const [isVisible, setIsVisible] = useState(false);
  const [animatedNumbers, setAnimatedNumbers] = useState({});
  const sectionRef = useRef(null);

  // Icon mapping
  const iconMap = {
    Users,
    TrendingUp,
    Award,
    Star,
    Target,
    Zap,
    Heart,
    Shield,
    CheckCircle,
    Clock,
    DollarSign,
    BarChart3
  };

  // Intersection Observer for animation trigger
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Animate numbers when visible
  useEffect(() => {
    if (isVisible && animateNumbers) {
      cards.forEach((card, index) => {
        const delay = index * animationDelay;
        
        setTimeout(() => {
          animateNumber(card.number, card.animationDuration || 2000, index);
        }, delay);
      });
    }
  }, [isVisible, animateNumbers]);

  const animateNumber = (targetNumber, duration, cardIndex) => {
    const startTime = Date.now();
    const startNumber = 0;

    const updateNumber = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for smooth animation
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      const currentNumber = Math.floor(startNumber + (targetNumber - startNumber) * easeOutCubic);
      
      setAnimatedNumbers(prev => ({
        ...prev,
        [cardIndex]: currentNumber
      }));

      if (progress < 1) {
        requestAnimationFrame(updateNumber);
      } else {
        setAnimatedNumbers(prev => ({
          ...prev,
          [cardIndex]: targetNumber
        }));
      }
    };

    requestAnimationFrame(updateNumber);
  };

  const getCardClasses = () => {
    const baseClasses = "h-full p-6 rounded-lg transition-all duration-300 hover:transform hover:-translate-y-2 text-center";
    
    switch (cardStyle) {
      case 'elevated':
        return `${baseClasses} bg-white shadow-lg hover:shadow-xl border border-gray-100`;
      case 'outlined':
        return `${baseClasses} bg-transparent border-2 border-gray-200 hover:border-blue-500 hover:bg-blue-50`;
      case 'gradient':
        return `${baseClasses} bg-gradient-to-br from-blue-50 to-indigo-100 border border-blue-200 hover:from-blue-100 hover:to-indigo-200`;
      default:
        return `${baseClasses} bg-white/80 backdrop-blur-sm border border-gray-200 hover:shadow-lg`;
    }
  };

  const getColumnLayout = () => {
    switch (cards.length) {
      case 1:
        return "grid-cols-1 max-w-md mx-auto";
      case 2:
        return "grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto";
      case 3:
        return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto";
      case 4:
        return "grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto";
      default:
        return "grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto";
    }
  };

  const renderCard = (card, index) => {
    const IconComponent = card.icon ? iconMap[card.icon] : null;
    const displayNumber = animateNumbers && isVisible 
      ? (animatedNumbers[index] !== undefined ? animatedNumbers[index] : 0)
      : card.number;

    return (
      <div key={index} className={getCardClasses()}>
        {/* Icon or Image */}
        <div className="mb-4 flex justify-center">
          {card.image ? (
            <img
              src={card.image}
              alt={card.title}
              className="w-16 h-16 object-cover rounded-full"
            />
          ) : IconComponent ? (
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <IconComponent className="w-8 h-8 text-blue-600" />
            </div>
          ) : null}
        </div>

        {/* Number */}
        {card.number !== undefined && card.number !== null && (
          <div className="mb-4">
            <div className={`text-4xl md:text-5xl font-bold ${numberColor}`}>
              {card.prefix}{displayNumber.toLocaleString()}{card.suffix}
            </div>
          </div>
        )}

        {/* Title */}
        <h3 className={`text-xl font-bold mb-2 ${titleColor}`}>
          {card.title}
        </h3>

        {/* Subtitle */}
        {card.subtitle && (
          <p className={`text-sm font-medium mb-3 text-blue-600`}>
            {card.subtitle}
          </p>
        )}

        {/* Description */}
        {card.description && (
          <p className={`text-sm leading-relaxed ${textColor}`}>
            {card.description}
          </p>
        )}
      </div>
    );
  };

  return (
    <section ref={sectionRef} className={`${backgroundColor} ${padding}`}>
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

        {/* Stats Cards Grid */}
        <div className={`grid ${getColumnLayout()}`}>
          {cards.map((card, index) => renderCard(card, index))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
