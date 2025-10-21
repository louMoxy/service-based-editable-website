import React, { useState } from 'react';

const NetlifyForm = ({
  // Form configuration
  formName = "contact",
  title = "Get in Touch",
  subtitle = "Send us a message and we'll get back to you soon",
  
  // Form fields configuration
  fields = [
    {
      name: "fullName",
      type: "text",
      placeholder: "Full Name",
      required: true,
      label: "Full Name"
    },
    {
      name: "email",
      type: "email",
      placeholder: "Email Address",
      required: true,
      label: "Email"
    },
    {
      name: "phone",
      type: "tel",
      placeholder: "Phone Number",
      required: false,
      label: "Phone"
    },
    {
      name: "message",
      type: "textarea",
      placeholder: "Your Message",
      required: true,
      label: "Message",
      rows: 6
    }
  ],
  
  // Styling options
  backgroundColor = "bg-white",
  textColor = "text-gray-900",
  titleColor = "text-gray-900",
  inputStyle = "default", // 'default', 'outlined', 'filled'
  buttonStyle = "default", // 'default', 'outlined', 'filled'
  
  // Form options
  showLabels = true,
  showRequired = true,
  
  // Layout options
  containerMaxWidth = "max-w-2xl",
  padding = "py-16 px-4 sm:px-6 lg:px-8"
}) => {
  
  const [formData, setFormData] = useState(
    fields.reduce((acc, field) => {
      acc[field.name] = '';
      return acc;
    }, {})
  );
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const form = e.target;
      const formData = new FormData(form);
      
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData).toString()
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData(fields.reduce((acc, field) => {
          acc[field.name] = '';
          return acc;
        }, {}));
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getInputClasses = () => {
    const baseClasses = "w-full px-4 py-3 rounded-lg border transition-colors duration-200 focus:outline-none focus:ring-2";
    
    switch (inputStyle) {
      case 'outlined':
        return `${baseClasses} bg-transparent border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500`;
      case 'filled':
        return `${baseClasses} bg-gray-100 border-gray-200 text-gray-900 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500`;
      default:
        return `${baseClasses} bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500`;
    }
  };

  const getButtonClasses = () => {
    const baseClasses = "w-full py-3 px-6 rounded-lg font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";
    
    switch (buttonStyle) {
      case 'outlined':
        return `${baseClasses} border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white focus:ring-blue-500`;
      case 'filled':
        return `${baseClasses} bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500`;
      default:
        return `${baseClasses} bg-gray-900 text-white hover:bg-gray-800 focus:ring-gray-500`;
    }
  };

  const renderField = (field) => {
    const isRequired = field.required && showRequired;
    
    if (field.type === 'textarea') {
      return (
        <div key={field.name} className="space-y-2">
          {showLabels && (
            <label htmlFor={field.name} className={`block text-sm font-medium ${textColor}`}>
              {field.label}
              {isRequired && <span className="text-red-500 ml-1">*</span>}
            </label>
          )}
          <textarea
            id={field.name}
            name={field.name}
            placeholder={field.placeholder}
            rows={field.rows || 4}
            value={formData[field.name] || ''}
            onChange={handleInputChange}
            className={getInputClasses()}
            required={field.required}
          />
        </div>
      );
    }

    return (
      <div key={field.name} className="space-y-2">
        {showLabels && (
          <label htmlFor={field.name} className={`block text-sm font-medium ${textColor}`}>
            {field.label}
            {isRequired && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <input
          id={field.name}
          type={field.type}
          name={field.name}
          placeholder={field.placeholder}
          value={formData[field.name] || ''}
          onChange={handleInputChange}
          className={getInputClasses()}
          required={field.required}
        />
      </div>
    );
  };

  return (
    <section className={`${backgroundColor} ${padding}`}>
      <div className={`${containerMaxWidth} mx-auto`}>
        {/* Section Header */}
        {(title || subtitle) && (
          <div className="text-center mb-8">
            {title && (
              <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${titleColor}`}>
                {title}
              </h2>
            )}
            {subtitle && (
              <p className={`text-lg ${textColor}`}>
                {subtitle}
              </p>
            )}
          </div>
        )}

        {/* Form */}
        <form 
          name={formName} 
          onSubmit={handleSubmit} 
          className="space-y-6"
          data-netlify="true"
          data-netlify-honeypot="bot-field"
        >
          {/* Hidden fields for Netlify */}
          <input type="hidden" name="form-name" value={formName} />
          <input type="hidden" name="bot-field" />
          
          {/* Form Fields */}
          {fields.map(renderField)}
          
          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={getButtonClasses()}
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
          
          {/* Status Messages */}
          {submitStatus === 'success' && (
            <div className="p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
              Thank you! Your message has been sent successfully.
            </div>
          )}
          
          {submitStatus === 'error' && (
            <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              Sorry, there was an error sending your message. Please try again.
            </div>
          )}
        </form>
      </div>
    </section>
  );
};

export default NetlifyForm;
