const path = require('node:path');
const {loadVersion} = require('@docusaurus/plugin-content-docs/lib/versions/loadVersion.js');
const {validateOptions} = require('@docusaurus/plugin-content-docs/lib/options.js');

async function checkSidebarsCanShare(context, options) {
  const docsOptions = validateOptions({
    validate: (schema, value) => schema.validate(value, {allowUnknown: true}).value,
    options: {
      ...options.docs,
      id: 'default',
      tags: null,
      include: ['**/*.{md,mdx}'],
      exclude: [],
    },
  });
  const docsDir = path.resolve(context.siteDir, docsOptions.path ?? 'docs');
  const versionsMetadata = [
    {
      versionName: 'current',
      label: 'Next',
      banner: null,
      badge: false,
      noIndex: false,
      className: 'docs-version-current',
      path: `${context.baseUrl}${docsOptions.routeBasePath ?? '/'}`,
      tagsPath: `${context.baseUrl}${docsOptions.routeBasePath ?? '/'}/${docsOptions.tagsBasePath ?? 'tags'}`.replace(/\/+/g, '/'),
      editUrl: undefined,
      editUrlLocalized: undefined,
      isLast: true,
      routePriority: -1,
      sidebarFilePath: path.resolve(context.siteDir, docsOptions.sidebarPath ?? './sidebars.ts'),
      contentPath: docsDir,
      contentPathLocalized: undefined,
    },
  ];
  const errors = [];

  for (const versionMetadata of versionsMetadata) {
    const loaded = await loadVersion({
      context,
      options: {
        ...docsOptions,
        tags: false,
        tagsFile: null,
      },
      versionMetadata,
      env: process.env.NODE_ENV === 'production' ? 'production' : 'development',
    });

    const sidebarDocIds = collectSidebarDocIds(loaded.sidebars);
    const docsById = new Map(loaded.docs.map((doc) => [doc.id, doc]));

    for (const docId of sidebarDocIds) {
      const doc = docsById.get(docId);
      if (!doc) {
        errors.push(`Sidebar doc not found -> ${docId} (version: ${versionMetadata.versionName})`);
        continue;
      }
      if (doc.frontMatter?.canShare !== true) {
        errors.push(`Missing canShare: true -> ${path.relative(context.siteDir, doc.source)} (docId: ${docId})`);
      }
    }
  }

  if (errors.length) {
    throw new Error(['Docs sidebar visibility check failed:', ...errors.map((e) => `- ${e}`)].join('\n'));
  }
}

function collectSidebarDocIds(sidebars) {
  const ids = [];
  const visit = (item) => {
    if (typeof item === 'string') return ids.push(item);
    if (!item || typeof item !== 'object') return;
    if (item.type === 'doc' || item.type === 'ref') ids.push(item.id);
    if (item.type === 'category' && Array.isArray(item.items)) item.items.forEach(visit);
  };
  for (const sidebar of Object.values(sidebars)) sidebar.forEach(visit);
  return ids;
}

module.exports = function checkSidebarCanSharePlugin(context, options) {
  return {
    name: 'check-sidebar-can-share',
    async loadContent() {},
    async contentLoaded() {
      await checkSidebarsCanShare(context, options);
    },
  };
};
