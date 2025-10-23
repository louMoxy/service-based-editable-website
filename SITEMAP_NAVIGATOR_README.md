# Sitemap Navigator Implementation

This project now includes Netlify Visual Editor sitemap navigator functionality, allowing content editors to easily navigate between all editable pages on the website.

## What's Been Added

### 1. Model Extensions (`stackbit.config.ts`)
- Added `modelExtensions` to define page models with stable IDs
- Added `pageId` field to Post model for unique identification
- Configured URL paths for proper sitemap hierarchy

### 2. Content Creation Hook (`onContentCreate`)
- Automatically generates unique `pageId` for new pages
- Ensures stable IDs for sitemap navigation
- Uses timestamp-based IDs for uniqueness

### 3. Custom Sitemap Configuration (`siteMap`)
- Custom sitemap implementation following [Netlify documentation](https://docs.netlify.com/manage/visual-editor/sitemap-navigator/)
- Filters documents by page models
- Maps documents to sitemap entries with stable IDs
- Generates proper URL paths for navigation

### 4. Updated Blog Posts
- Added `pageId` fields to all existing blog posts
- Ensures all pages appear in the sitemap navigator
- Maintains stable references for navigation

## How It Works

### For Content Editors
1. **Sitemap Navigation**: Access the sitemap navigator in the Visual Editor
2. **Tree View**: Navigate through pages in a hierarchical structure
3. **Search**: Search for pages by title or URL path
4. **Quick Access**: Jump between different pages without losing context

### For Developers
The sitemap is automatically populated based on:
- **Page Models**: All models with `type: "page"`
- **URL Paths**: Generated from the `urlPath` configuration
- **Stable IDs**: Unique identifiers for each page
- **Document References**: Direct links to content documents

## Sitemap Features

### Tree View
- Hierarchical display of all pages
- Collapsible/expandable sections
- Organized by URL structure

### Search Functionality
- Search by page title
- Search by URL path
- Real-time filtering results

### Navigation Benefits
- **Single Point Access**: All editable pages in one place
- **Quick Navigation**: Jump between pages instantly
- **Context Preservation**: Maintain editing state across pages
- **Visual Hierarchy**: Clear page organization

## Configuration Details

### Model Extensions
```typescript
modelExtensions: [
    {
        name: "Post",
        type: "page",
        urlPath: "/posts/{slug}",
        fields: [{ name: "pageId", type: "string", hidden: true }]
    }
]
```

### Content Creation Hook
```typescript
async onContentCreate({ object, model }) {
    if (model.type !== "page") {
        return object;
    }
    
    const hasPageIdField = !!model.fields?.find(
        field => field.name === "pageId"
    );
    
    if (hasPageIdField && !object.pageId) {
        object.pageId = Date.now().toString();
    }
    
    return object;
}
```

### Custom Sitemap
```typescript
siteMap: ({ documents, models }) => {
    const pageModels = models.filter(m => m.type === "page").map(m => m.name);
    
    return documents
        .filter(d => pageModels.includes(d.modelName))
        .map(document => {
            // Generate sitemap entries with stable IDs
            return {
                stableId: pageId.value,
                urlPath,
                document,
                isHomePage: urlPath === "/"
            };
        })
        .filter(Boolean) as SiteMapEntry[];
}
```

## Available Pages in Sitemap

The sitemap will include:
- **Blog Posts**: All posts in `/posts/` directory
- **Home Page**: Main index page
- **Blog Index**: Blog listing page
- **Any Future Pages**: Automatically included when created

## Benefits

1. **Improved Navigation**: Content editors can easily find and switch between pages
2. **Better Organization**: Hierarchical view of site structure
3. **Efficient Workflow**: Quick access to any editable page
4. **Search Capability**: Find pages by name or path
5. **Stable References**: Pages maintain consistent IDs for reliable navigation

## File Structure
```
├── stackbit.config.ts (updated with sitemap configuration)
├── posts/
│   ├── example-post-1.mdx (updated with pageId)
│   ├── example-post-2.mdx (updated with pageId)
│   ├── example-post-3.mdx (updated with pageId)
│   ├── example-post-4.mdx (updated with pageId)
│   └── example-post-5.mdx (updated with pageId)
└── SITEMAP_NAVIGATOR_README.md (this file)
```

## Usage in Visual Editor

1. **Access Sitemap**: Look for the sitemap navigator in the Visual Editor interface
2. **Navigate Pages**: Click on any page to edit it
3. **Search Pages**: Use the search functionality to find specific pages
4. **Tree Navigation**: Expand/collapse sections to organize your view

The sitemap navigator provides a comprehensive overview of all editable content, making it easier for content editors to manage and navigate the website structure.
