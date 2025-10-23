// stackbit.config.ts
import { defineStackbitConfig, getLocalizedFieldForLocale, SiteMapEntry } from '@stackbit/types';
import { GitContentSource } from '@stackbit/cms-git';
import { GlobalStyles } from './.stackbit/models/GlobalStyles';

export default defineStackbitConfig({
    stackbitVersion: '~0.6.0',
    ssgName: 'nextjs',
    nodeVersion: '18',
    contentSources: [
        new GitContentSource({
            rootPath: __dirname,
            contentDirs: ['posts', 'content'],
            models: [
                {
                    name: "Post",
                    type: "page",
                    urlPath: "/posts/{slug}",
                    filePath: "posts/{slug}.mdx",
                    fields: [
                        { name: "title", type: "string", required: true, default: 'Post Title' }, 
                        { name: "description", type: "string", default: 'Post description goes here' },
                        { name: "date", type: "date", required: true },
                        { name: "pageId", type: "string", hidden: true }
                    ]
                  },
                {
                    name: "GlobalStyles",
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
                            type: "enum",
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
                }
            ],
            assetsConfig: {
                referenceType: 'static',
                staticDir: 'public',
                uploadDir: 'images',
                publicPath: '/'
            }
        })
    ],
    modelExtensions: [
        {
            name: "Post",
            type: "page",
            urlPath: "/posts/{slug}",
            fields: [{ name: "pageId", type: "string", hidden: true }]
        }
    ],
    async onContentCreate({ object, model }) {
        if (model.type !== "page") {
            return object;
        }
        
        // For pages that already have a pageId field, use that value; if not, generate one
        const hasPageIdField = !!model.fields?.find(
            field => field.name === "pageId"
        );
        
        if (hasPageIdField && !object.pageId) {
            object.pageId = Date.now().toString();
        }
        
        return object;
    },
    siteMap: ({ documents, models }) => {
        const pageModels = models.filter(m => m.type === "page").map(m => m.name);
        
        return documents
            .filter(d => pageModels.includes(d.modelName))
            .map(document => {
                // Extract slug from the file path for posts
                const filePath = (document as any).filePath || '';
                const slug = filePath.replace('posts/', '').replace('.mdx', '');
                const pageId = (document as any).fields?.pageId?.value || document.id;
                
                if (!slug || !pageId) return null;
                
                const urlPath = "/posts/" + slug;
                
                return {
                    stableId: pageId,
                    urlPath,
                    document,
                    isHomePage: urlPath === "/"
                };
            })
            .filter(Boolean) as SiteMapEntry[];
    },
    sidebarButtons: [
        {
            type: "model",
            label: "Global styles",
            icon: "style",
            modelName: "GlobalStyles",
            srcType: "git",
            srcProjectId: "main"
        }
    ]
});