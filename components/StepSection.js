import React, { useState, useEffect, useRef } from 'react';
import { 
  CheckCircle, 
  ArrowRight, 
  User, 
  MessageCircle, 
  Target, 
  Award,
  Star,
  Zap,
  Heart,
  Shield,
  Clock,
  BookOpen,
  TrendingUp,
  Users,
  Lightbulb
} from 'lucide-react';

const StepSection = ({
  // Section configuration
  title = "How It Works",
  subtitle = "Our proven process to help you achieve your goals",
  
  // Steps data (3-5 steps)
  steps = [
    {
      number: 1,
      icon: "User",
      title: "Initial Consultation",
      description: "We start with a comprehensive assessment of your current situation and goals.",
      color: "blue"
    },
    {
      number: 2,
      icon: "MessageCircle",
      title: "Strategy Development",
      description: "Together, we create a personalized roadmap tailored to your specific needs.",
      color: "green"
    },
    {
      number: 3,
      icon: "Target",
      title: "Implementation",
      description: "We work closely with you to execute the plan and track your progress.",
      color: "purple"
    },
    {
      number: 4,
      icon: "Award",
      title: "Achievement",
      description: "Celebrate your success and plan for continued growth and development.",
      color: "orange"
    }
  ],
  
  // Layout options
  layout = "horizontal", // 'horizontal', 'vertical'
  
  // Display options
  displayMode = "number", // 'icon', 'number'
  
  // Animation options
  showProgress = true,
  animateOnScroll = true,
  animationDelay = 200,
  
  // Styling options
  backgroundColor = "bg-white",
  textColor = "text-gray-900",
  titleColor = "text-gray-900",
  stepColor = "text-blue-600",
  
  // Progress line styling
  progressLineColor = "bg-blue-200",
  progressLineActiveColor = "bg-blue-600",
  
  // Layout options
  containerMaxWidth = "max-w-7xl",
  padding = "py-16 px-4 sm:px-6 lg:px-8"
}) => {
  
  const [visibleSteps, setVisibleSteps] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const sectionRef = useRef(null);
  
  // Icon mapping
  const iconMap = {
    CheckCircle,
    User,
    MessageCircle,
    Target,
    Award,
    Star,
    Zap,
    Heart,
    Shield,
    Clock,
    BookOpen,
    TrendingUp,
    Users,
    Lightbulb
  };
  
  // Color mapping
  const colorMap = {
    blue: {
      bg: "bg-blue-100",
      text: "text-blue-600",
      border: "border-blue-200",
      progress: "bg-blue-600"
    },
    green: {
      bg: "bg-green-100",
      text: "text-green-600",
      border: "border-green-200",
      progress: "bg-green-600"
    },
    purple: {
      bg: "bg-purple-100",
      text: "text-purple-600",
      border: "border-purple-200",
      progress: "bg-purple-600"
    },
    orange: {
      bg: "bg-orange-100",
      text: "text-orange-600",
      border: "border-orange-200",
      progress: "bg-orange-600"
    },
    red: {
      bg: "bg-red-100",
      text: "text-red-600",
      border: "border-red-200",
      progress: "bg-red-600"
    },
    indigo: {
      bg: "bg-indigo-100",
      text: "text-indigo-600",
      border: "border-indigo-200",
      progress: "bg-indigo-600"
    }
  };
  
  // Intersection Observer for animation
  useEffect(() => {
    if (!animateOnScroll) {
      setVisibleSteps(steps.map((_, index) => index));
      return;
    }
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsAnimating(true);
            animateSteps();
          }
        });
      },
      { threshold: 0.3 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => observer.disconnect();
  }, []);
  
  // Animate steps sequentially
  const animateSteps = () => {
    steps.forEach((_, index) => {
      setTimeout(() => {
        setVisibleSteps(prev => [...prev, index]);
      }, index * animationDelay);
    });
  };
  
  // Get step classes
  const getStepClasses = (step, index) => {
    const baseClasses = "relative flex flex-col transition-all duration-500";
    const alignmentClasses = layout === "vertical" ? "items-start text-left ml-20" : "items-center text-center";
    const isVisible = visibleSteps.includes(index);
    const opacity = isVisible ? "opacity-100" : "opacity-0";
    const transform = isVisible ? "translate-y-0" : "translate-y-8";
    
    return `${baseClasses} ${alignmentClasses} ${opacity} ${transform}`;
  };
  
  // Get icon classes
  const getIconClasses = (step) => {
    const colorClasses = colorMap[step.color] || colorMap.blue;
    return `w-12 h-12 ${colorClasses.bg} ${colorClasses.text} rounded-full flex items-center justify-center mb-4 transition-all duration-300`;
  };
  
  // Get progress line classes
  const getProgressLineClasses = (index) => {
    const isVisible = visibleSteps.includes(index);
    const isActive = visibleSteps.includes(index - 1);
    const baseClasses = "h-1 transition-all duration-500";
    
    if (isActive) {
      return `${baseClasses} ${progressLineActiveColor}`;
    }
    
    return `${baseClasses} ${progressLineColor}`;
  };
  
  // Get step number classes
  const getStepNumberClasses = (step) => {
    const colorClasses = colorMap[step.color] || colorMap.blue;
    const baseClasses = `w-12 h-12 ${colorClasses.bg} ${colorClasses.text} rounded-full flex items-center justify-center text-lg font-bold`;
    
    return baseClasses;
  };
  
  // Get layout classes
  const getLayoutClasses = () => {
    if (layout === "vertical") {
      return "space-y-8";
    }
    
    // Horizontal layout with proper grid
    switch (steps.length) {
      case 3:
        return "grid grid-cols-1 md:grid-cols-3 gap-8";
      case 4:
        return "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6";
      case 5:
        return "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4";
      default:
        return "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6";
    }
  };
  
  // Render step
  const renderStep = (step, index) => {
    const IconComponent = iconMap[step.icon] || User;
    const isLast = index === steps.length - 1;
    
    return (
      <div key={index} className={getStepClasses(step, index)}>
        {/* Step Icon/Number */}
        <div className="relative">
          {(displayMode === "icon") && (
            <div className={getIconClasses(step)}>
              <IconComponent className="w-6 h-6" />
            </div>
          )}
          {(displayMode === "number") && (
            <div className={getStepNumberClasses(step)}>
              {step.number}
            </div>
          )}
        </div>
        
        {/* Step Content */}
        <div className="max-w-xs">
          <h3 className={`text-lg font-semibold mb-2 ${titleColor}`}>
            {step.title}
          </h3>
          <p className={`text-sm leading-relaxed ${textColor}`}>
            {step.description}
          </p>
        </div>
        
        {/* Progress Line (for horizontal layout) */}
        {layout === "horizontal" && !isLast && showProgress && (
          <div className="hidden lg:block absolute top-6 left-1/2 w-full h-1 -z-10">
            <div className={getProgressLineClasses(index + 1)} />
          </div>
        )}
      </div>
    );
  };
  
  // Render vertical progress line
  const renderVerticalProgress = () => {
    if (layout !== "vertical" || !showProgress) return null;
    
    return (
      <div className="absolute left-8 top-0 bottom-0 w-1 bg-gray-200">
        {steps.map((_, index) => {
          const isVisible = visibleSteps.includes(index);
          const isActive = visibleSteps.includes(index);
          
          return (
            <div
              key={index}
              className={`absolute w-1 h-8 transition-all duration-500 ${
                isActive ? progressLineActiveColor : progressLineColor
              }`}
              style={{ top: `${index * 25}%` }}
            />
          );
        })}
      </div>
    );
  };
  
  return (
    <section ref={sectionRef} className={`${backgroundColor} ${padding}`}>
      <div className={`${containerMaxWidth} mx-auto`}>
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-4 ${titleColor}`}>
            {title}
          </h2>
          {subtitle && (
            <p className={`text-lg md:text-xl ${textColor} max-w-3xl mx-auto`}>
              {subtitle}
            </p>
          )}
        </div>
        
        {/* Steps */}
        <div className={`relative ${getLayoutClasses()}`}>
          {/* Vertical Progress Line */}
          {renderVerticalProgress()}
          
          {/* Steps */}
          {steps.map((step, index) => renderStep(step, index))}
        </div>
      </div>
    </section>
  );
};

export default StepSection;
