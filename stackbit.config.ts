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
                // Use the pageId value for the stableId
                const slugField = document.fields.slug?.type === "slug"
                    ? document.fields.slug
                    : undefined;
                const pageIdField = document.fields.pageId?.type === "string"
                    ? document.fields.pageId
                    : undefined;
                
                const slug = getLocalizedFieldForLocale(slugField);
                const pageId = getLocalizedFieldForLocale(pageIdField);
                
                if (!slug?.value || !pageId?.value) return null;
                
                const urlPath = "/posts/" + slug.value.replace(/^\/+/, "");
                
                return {
                    stableId: pageId.value,
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
            srcType: "global-styles",
            srcProjectId: "5e264862-277e-4641-8f53-56833839985e"
        }
    ]
});