export const GlobalStyles = {
  type: "data",
  label: "Global styles",
  file: "content/data/style.json",
  fields: [
    {
      type: "enum",
      name: "mode",
      label: "Theme Mode",
      controlType: "button-group",
      options: [
        { label: "Light", value: "light" },
        { label: "Dark", value: "dark" }
      ],
      default: "light"
    },
    { 
      type: "color", 
      name: "primaryColor", 
      label: "Primary color",
      default: "#3b82f6"
    },
    { 
      type: "color", 
      name: "secondaryColor", 
      label: "Secondary color",
      default: "#8b5cf6"
    },
    { 
      type: "color", 
      name: "accentColor", 
      label: "Accent color",
      default: "#f59e0b"
    },
    { 
      type: "color", 
      name: "backgroundColor", 
      label: "Background color",
      default: "#ffffff"
    },
    { 
      type: "color", 
      name: "textColor", 
      label: "Text color",
      default: "#1f2937"
    },
    {
      type: "string",
      name: "fontFamily",
      label: "Font Family",
      options: [
        { label: "Inter", value: "Inter" },
        { label: "Roboto", value: "Roboto" },
        { label: "Open Sans", value: "Open Sans" },
        { label: "Lato", value: "Lato" }
      ],
      default: "Inter"
    },
    {
      type: "number",
      name: "borderRadius",
      label: "Border Radius (px)",
      default: 8,
      min: 0,
      max: 50
    }
  ]
};
