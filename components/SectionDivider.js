import React from 'react';

const SectionDivider = ({
  // Divider type
  type = "wave", // 'wave', 'curve', 'slope', 'zigzag', 'cloud', 'mountain', 'arrow', 'dots'
  
  // Direction
  direction = "down", // 'down', 'up'
  
  // Styling options
  color = "white",
  backgroundColor = "transparent",
  height = "h-16", // 'h-8', 'h-12', 'h-16', 'h-20', 'h-24', 'h-32'
  
  // Pattern options
  waveIntensity = "medium", // 'low', 'medium', 'high'
  curveRadius = "medium", // 'small', 'medium', 'large'
  slopeAngle = "medium", // 'gentle', 'medium', 'steep'
  
  // Layout options
  flip = false,
  className = ""
}) => {
  
  // Get height value
  const getHeightValue = () => {
    switch (height) {
      case 'h-8': return 32;
      case 'h-12': return 48;
      case 'h-16': return 64;
      case 'h-20': return 80;
      case 'h-24': return 96;
      case 'h-32': return 128;
      default: return 64;
    }
  };
  
  // Wave patterns
  const getWavePattern = () => {
    const h = getHeightValue();
    const intensity = waveIntensity === 'low' ? 0.3 : waveIntensity === 'high' ? 0.7 : 0.5;
    const amplitude = h * intensity;
    
    if (direction === 'up') {
      return `M0,${h} L0,${h - amplitude} Q${h/4},${h - amplitude * 1.5} ${h/2},${h - amplitude} T${h},${h - amplitude} L${h * 2},${h - amplitude} L${h * 2},${h} Z`;
    }
    
    return `M0,0 L0,${amplitude} Q${h/4},${amplitude * 1.5} ${h/2},${amplitude} T${h},${amplitude} L${h * 2},${amplitude} L${h * 2},0 Z`;
  };
  
  // Curve patterns
  const getCurvePattern = () => {
    const h = getHeightValue();
    const radius = curveRadius === 'small' ? h * 0.3 : curveRadius === 'large' ? h * 0.7 : h * 0.5;
    
    if (direction === 'up') {
      return `M0,${h} Q${h/2},${h - radius} ${h},${h} L${h * 2},${h} Z`;
    }
    
    return `M0,0 Q${h/2},${radius} ${h},0 L${h * 2},0 Z`;
  };
  
  // Slope patterns
  const getSlopePattern = () => {
    const h = getHeightValue();
    const angle = slopeAngle === 'gentle' ? h * 0.3 : slopeAngle === 'steep' ? h * 0.8 : h * 0.5;
    
    if (direction === 'up') {
      return `M0,${h} L${h},${h - angle} L${h * 2},${h} Z`;
    }
    
    return `M0,0 L${h},${angle} L${h * 2},0 Z`;
  };
  
  // Zigzag pattern
  const getZigzagPattern = () => {
    const h = getHeightValue();
    const amplitude = h * 0.4;
    
    if (direction === 'up') {
      return `M0,${h} L${h/4},${h - amplitude} L${h/2},${h} L${3*h/4},${h - amplitude} L${h},${h} L${5*h/4},${h - amplitude} L${3*h/2},${h} L${7*h/4},${h - amplitude} L${2*h},${h} Z`;
    }
    
    return `M0,0 L${h/4},${amplitude} L${h/2},0 L${3*h/4},${amplitude} L${h},0 L${5*h/4},${amplitude} L${3*h/2},0 L${7*h/4},${amplitude} L${2*h},0 Z`;
  };
  
  // Cloud pattern
  const getCloudPattern = () => {
    const h = getHeightValue();
    
    if (direction === 'up') {
      return `M0,${h} C${h/8},${h - h/4} ${h/4},${h - h/2} ${h/2},${h - h/2} C${3*h/4},${h - h/2} ${h},${h - h/4} ${h},${h} L${2*h},${h} Z`;
    }
    
    return `M0,0 C${h/8},${h/4} ${h/4},${h/2} ${h/2},${h/2} C${3*h/4},${h/2} ${h},${h/4} ${h},0 L${2*h},0 Z`;
  };
  
  // Mountain pattern
  const getMountainPattern = () => {
    const h = getHeightValue();
    
    if (direction === 'up') {
      return `M0,${h} L${h/3},${h - h/3} L${2*h/3},${h - h/6} L${h},${h - h/2} L${4*h/3},${h - h/4} L${5*h/3},${h - h/3} L${2*h},${h} Z`;
    }
    
    return `M0,0 L${h/3},${h/3} L${2*h/3},${h/6} L${h},${h/2} L${4*h/3},${h/4} L${5*h/3},${h/3} L${2*h},0 Z`;
  };
  
  // Arrow pattern
  const getArrowPattern = () => {
    const h = getHeightValue();
    
    if (direction === 'up') {
      return `M0,${h} L${h/2},${h - h/2} L${h},${h} L${2*h},${h} Z`;
    }
    
    return `M0,0 L${h/2},${h/2} L${h},0 L${2*h},0 Z`;
  };
  
  // Dots pattern
  const getDotsPattern = () => {
    const h = getHeightValue();
    const dots = [];
    const dotSize = h * 0.1;
    const spacing = h * 0.2;
    
    for (let i = 0; i < 20; i++) {
      const x = i * spacing;
      const y = direction === 'up' ? h - (Math.sin(i * 0.5) * h * 0.3 + h * 0.3) : Math.sin(i * 0.5) * h * 0.3 + h * 0.3;
      dots.push(`<circle cx="${x}" cy="${y}" r="${dotSize}" fill="${color}"/>`);
    }
    
    return dots.join('');
  };
  
  // Get SVG path based on type
  const getSVGPath = () => {
    switch (type) {
      case 'wave':
        return getWavePattern();
      case 'curve':
        return getCurvePattern();
      case 'slope':
        return getSlopePattern();
      case 'zigzag':
        return getZigzagPattern();
      case 'cloud':
        return getCloudPattern();
      case 'mountain':
        return getMountainPattern();
      case 'arrow':
        return getArrowPattern();
      case 'dots':
        return null; // Handled separately
      default:
        return getWavePattern();
    }
  };
  
  // Get SVG dimensions
  const getSVGDimensions = () => {
    const h = getHeightValue();
    return {
      width: h * 2,
      height: h,
      viewBox: `0 0 ${h * 2} ${h}`
    };
  };
  
  // Render dots pattern
  const renderDotsPattern = () => {
    if (type !== 'dots') return null;
    
    const { width, height, viewBox } = getSVGDimensions();
    
    return (
      <svg
        width="100%"
        height={height}
        viewBox={viewBox}
        preserveAspectRatio="none"
        className={`${flip ? 'transform scale-x-[-1]' : ''} ${className}`}
      >
        <defs>
          <pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="10" cy="10" r="2" fill={color} opacity="0.3"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dots)"/>
      </svg>
    );
  };
  
  // Render standard patterns
  const renderStandardPattern = () => {
    if (type === 'dots') return null;
    
    const { width, height, viewBox } = getSVGDimensions();
    const path = getSVGPath();
    
    return (
      <svg
        width="100%"
        height={height}
        viewBox={viewBox}
        preserveAspectRatio="none"
        className={`${flip ? 'transform scale-x-[-1]' : ''} ${className}`}
      >
        <path d={path} fill={color} />
      </svg>
    );
  };
  
  return (
    <div 
      className={`w-full ${height} ${backgroundColor} ${className}`}
      style={{ backgroundColor }}
    >
      {type === 'dots' ? renderDotsPattern() : renderStandardPattern()}
    </div>
  );
};

export default SectionDivider;
