import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Plus, Minus } from 'lucide-react';

const FAQ = ({
  // Section configuration
  title = "Frequently Asked Questions",
  subtitle = "Find answers to common questions about our services",
  
  // FAQ data
  faqs = [
    {
      question: "What is your coaching approach?",
      answer: "Our coaching approach is personalized and results-driven. We work with each client to understand their unique goals and challenges, then develop a customized strategy to help them achieve breakthrough results.",
      isOpen: false
    },
    {
      question: "How long does the coaching process take?",
      answer: "The duration varies depending on your goals and needs. Most clients see significant progress within 3-6 months, with some programs lasting 6-12 months for comprehensive transformation.",
      isOpen: false
    },
    {
      question: "Do you offer group coaching sessions?",
      answer: "Yes, we offer both individual and group coaching sessions. Group sessions provide additional value through peer learning and shared experiences, while individual sessions offer focused, one-on-one attention.",
      isOpen: false
    }
  ],
  
  // Layout options
  allowMultiple = false, // Allow multiple FAQs to be open at once
  
  // Styling options
  backgroundColor = "bg-white",
  textColor = "text-gray-900",
  titleColor = "text-gray-900",
  cardStyle = "default", // 'default', 'elevated', 'outlined'
  
  // Icon options
  iconStyle = "chevron", // 'chevron', 'plus-minus'
  
  // Layout options
  containerMaxWidth = "max-w-4xl",
  padding = "py-16 px-4 sm:px-6 lg:px-8"
}) => {
  
  const [openItems, setOpenItems] = useState(
    faqs.map((faq, index) => faq.isOpen ? index : null).filter(item => item !== null)
  );

  const toggleFAQ = (index) => {
    if (allowMultiple) {
      setOpenItems(prev => 
        prev.includes(index) 
          ? prev.filter(item => item !== index)
          : [...prev, index]
      );
    } else {
      setOpenItems(prev => 
        prev.includes(index) ? [] : [index]
      );
    }
  };

  const isOpen = (index) => openItems.includes(index);

  const getCardClasses = () => {
    const baseClasses = "transition-all duration-300";
    
    switch (cardStyle) {
      case 'elevated':
        return `${baseClasses} bg-white shadow-lg border border-gray-100 rounded-lg overflow-hidden`;
      case 'outlined':
        return `${baseClasses} bg-transparent border-2 border-gray-200 hover:border-blue-500 rounded-lg overflow-hidden`;
      default:
        return `${baseClasses} bg-white/80 backdrop-blur-sm border border-gray-200 rounded-lg overflow-hidden`;
    }
  };

  const getIcon = (index) => {
    const isItemOpen = isOpen(index);
    
    if (iconStyle === 'plus-minus') {
      return isItemOpen ? (
        <Minus className="w-5 h-5 text-blue-600" />
      ) : (
        <Plus className="w-5 h-5 text-gray-600" />
      );
    } else {
      return isItemOpen ? (
        <ChevronUp className="w-5 h-5 text-blue-600" />
      ) : (
        <ChevronDown className="w-5 h-5 text-gray-600" />
      );
    }
  };

  const renderFAQ = (faq, index) => {
    const isItemOpen = isOpen(index);
    
    return (
      <div key={index} className={`${getCardClasses()} mb-4`}>
        {/* Question */}
        <button
          onClick={() => toggleFAQ(index)}
          className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
        >
          <h3 className={`text-lg font-semibold ${titleColor} pr-4`}>
            {faq.question}
          </h3>
          <div className="flex-shrink-0">
            {getIcon(index)}
          </div>
        </button>

        {/* Answer */}
        <div className={`overflow-hidden transition-all duration-300 ${
          isItemOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="px-6 pb-4">
            <p className={`text-base leading-relaxed ${textColor}`}>
              {faq.answer}
            </p>
          </div>
        </div>
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

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => renderFAQ(faq, index))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
