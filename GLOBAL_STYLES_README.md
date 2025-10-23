# Global Styles Implementation

This project now includes Netlify Visual Editor global styles functionality, allowing content editors to control site-wide styling options from a centralized configuration.

## What's Been Added

### 1. GlobalStyles Model (`.stackbit/models/GlobalStyles.js`)
- Defines the content model for global styles
- Includes fields for theme mode, colors, font family, and border radius
- Configured as a data type (non-page content)

### 2. Style Content File (`content/data/style.json`)
- Contains the actual style values
- Can be edited through the Visual Editor
- Automatically loaded by the application

### 3. Stackbit Configuration Updates (`stackbit.config.ts`)
- Added GlobalStyles model to the content sources
- Added sidebar button for quick access to global styles
- Updated content directories to include the `content` folder

### 4. Dynamic Style Loading
- `GlobalStylesProvider` component loads styles from the JSON file
- Applies CSS variables to the document root
- Handles theme mode switching (light/dark)

### 5. CSS Integration
- Updated `styles/globals.css` with global CSS variables
- Created `tailwind.config.js` to integrate with Tailwind CSS
- Utility functions in `utils/global-styles.js`

## How to Use

### For Content Editors
1. Open the Visual Editor
2. Click the "Global styles" button in the sidebar
3. Modify colors, fonts, and other style properties
4. Changes are applied immediately in the editor

### For Developers
The global styles are available as CSS variables:
- `--global-primary`: Primary color
- `--global-secondary`: Secondary color  
- `--global-accent`: Accent color
- `--global-background`: Background color
- `--global-text`: Text color
- `--global-font-family`: Font family
- `--global-border-radius`: Border radius in pixels

### Example Usage in Components
```jsx
// Using CSS variables directly
<div style={{ 
  backgroundColor: 'var(--global-primary)',
  borderRadius: 'var(--global-border-radius)'
}}>
  Content
</div>

// Using Tailwind classes (if configured)
<div className="bg-primary text-white rounded-custom">
  Content
</div>
```

## Available Style Options

- **Theme Mode**: Light or Dark
- **Primary Color**: Main brand color
- **Secondary Color**: Secondary brand color
- **Accent Color**: Accent/highlight color
- **Background Color**: Page background
- **Text Color**: Main text color
- **Font Family**: Site-wide font family
- **Border Radius**: Default border radius for components

## Development Notes

- The `GlobalStylesProvider` component should wrap your main layout
- Styles are loaded asynchronously to prevent blocking
- Fallback values are provided if the style file cannot be loaded
- The system respects both global styles and user theme preferences

## File Structure
```
├── .stackbit/
│   └── models/
│       └── GlobalStyles.js
├── content/
│   └── data/
│       └── style.json
├── components/
│   ├── GlobalStylesProvider.js
│   └── StyleExample.js
├── utils/
│   └── global-styles.js
├── styles/
│   └── globals.css (updated)
├── tailwind.config.js (new)
└── stackbit.config.ts (updated)
```
