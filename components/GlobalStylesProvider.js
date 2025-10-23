import { useEffect, useState } from 'react';

export default function GlobalStylesProvider({ children }) {
  const [styles, setStyles] = useState(null);

  useEffect(() => {
    // Load global styles from the content file
    const loadGlobalStyles = async () => {
      try {
        const response = await fetch('/content/data/style.json');
        const styleData = await response.json();
        setStyles(styleData);
        
        // Apply CSS variables to the document
        const root = document.documentElement;
        root.style.setProperty('--global-primary', styleData.primaryColor);
        root.style.setProperty('--global-secondary', styleData.secondaryColor);
        root.style.setProperty('--global-accent', styleData.accentColor);
        root.style.setProperty('--global-background', styleData.backgroundColor);
        root.style.setProperty('--global-text', styleData.textColor);
        root.style.setProperty('--global-font-family', styleData.fontFamily);
        root.style.setProperty('--global-border-radius', `${styleData.borderRadius}px`);
        
        // Apply theme mode
        if (styleData.mode === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      } catch (error) {
        console.warn('Could not load global styles:', error);
      }
    };

    loadGlobalStyles();
  }, []);

  return children;
}
