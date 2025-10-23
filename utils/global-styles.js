import fs from 'fs';
import path from 'path';

let globalStyles = null;

export function getGlobalStyles() {
  if (!globalStyles) {
    try {
      const stylePath = path.join(process.cwd(), 'content/data/style.json');
      const styleData = fs.readFileSync(stylePath, 'utf8');
      globalStyles = JSON.parse(styleData);
    } catch (error) {
      console.warn('Could not load global styles, using defaults:', error.message);
      globalStyles = {
        mode: "light",
        primaryColor: "#3b82f6",
        secondaryColor: "#8b5cf6",
        accentColor: "#f59e0b",
        backgroundColor: "#ffffff",
        textColor: "#1f2937",
        fontFamily: "Inter",
        borderRadius: 8
      };
    }
  }
  return globalStyles;
}

export function getCSSVariables() {
  const styles = getGlobalStyles();
  return {
    '--color-primary': styles.primaryColor,
    '--color-secondary': styles.secondaryColor,
    '--color-accent': styles.accentColor,
    '--color-background': styles.backgroundColor,
    '--color-text': styles.textColor,
    '--font-family': styles.fontFamily,
    '--border-radius': `${styles.borderRadius}px`,
  };
}
