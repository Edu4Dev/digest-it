const {
  generatePostsSitemap,
  generatePagesSitemap,
  generateIndexSitemap,
  generateFeedsSitemap,
} = require("../lib/sitemaps");
const { writeAtom } = require("../lib/file-writers/atom");
const { writeRSS } = require("../lib/file-writers/rss");
const { writeAmpStories } = require("../lib/file-writers/ampStory");
const executeStep = require("../utils/execute-step");

class StaticFileGenerator {
  async generateStaticFiles(config, context) {
    if (!config || typeof config !== "object" || Array.isArray(config)) {
      console.warn("⚠️ - Configuração inválida em generateStaticFiles");
      return;
    }

    const tasks = [
      {
        condition: config.indexSitemap,
        label: "📝 - Generate: Index Sitemaps",
        fn: generateIndexSitemap,
        args: [context.publicSourceFolder, context.siteUrl, context.scope],
        errorMessage: "Erro ao gerar o Index Sitemap",
      },
      {
        condition: config.postSitemap,
        label: "📝 - Generate: Posts Sitemaps",
        fn: generatePostsSitemap,
        args: [
          context.postsDatas,
          context.siteUrl,
          context.scope,
          context.publicSourceFolder,
        ],
        errorMessage: "Erro ao gerar o Posts Sitemap",
      },
      {
        condition: config.pageSitemap,
        label: "📝 - Generate: Pages Sitemaps",
        fn: generatePagesSitemap,
        args: [
          context.pagesDatas,
          context.siteUrl,
          context.scope,
          context.publicSourceFolder,
        ],
        errorMessage: "Erro ao gerar o Pages Sitemap",
      },
      {
        condition: config.feedsSitemaps,
        label: "📝 - Generate: Feeds Sitemaps",
        fn: generateFeedsSitemap,
        args: [
          context.cardLogo,
          context.siteUrl,
          context.scope,
          context.publicSourceFolder,
        ],
        errorMessage: "Erro ao gerar o Feeds Sitemap",
      },
      {
        condition: config.atom,
        label: "📝 - Generate: Atom",
        fn: writeAtom,
        args: [
          {
            postsDatas: context.postsDatas,
            pagesDatas: context.pagesDatas,
            siteDescription: context.siteDescription,
            siteUrl: context.siteUrl,
            i18n: context.i18n,
            brandName: context.brandName,
            brandEmail: context.brandEmail,
            logos: context.logos,
            categories: context.categories,
          },
          context.publicSourceFolder,
        ],
        errorMessage: "Erro ao gerar o Atom",
      },
      {
        condition: config.rss,
        label: "📝 - Generate: RSS",
        fn: writeRSS,
        args: [
          {
            postsDatas: context.postsDatas,
            pagesDatas: context.pagesDatas,
            siteDescription: context.siteDescription,
            siteUrl: context.siteUrl,
            i18n: context.i18n,
            brandName: context.brandName,
            brandEmail: context.brandEmail,
            logos: context.logos,
            categories: context.categories,
          },
          context.publicSourceFolder,
        ],
        errorMessage: "Erro ao gerar o RSS",
      },
      {
        condition: config.ampStories,
        label: "📝 - Generate: Amp Stories",
        fn: writeAmpStories,
        args: [
          {
            pagesDatas: context.pagesDatas,
            postsDatas: context.postsDatas,
            siteUrl: context.siteUrl,
            postAuthorLogo: context.postAuthorLogo,
            brandName: context.brandName,
            cardLogo: context.cardLogo,
            publicSourceFolder: context.publicSourceFolder,
          },
        ],
        errorMessage: "Erro ao gerar o Amp Stories",
      },
    ];

    for (const task of tasks) {
      if (task.condition) {
        try {
          await executeStep(task.label, task.fn, task.args);
        } catch (error) {
          console.error(`❌ - ${task.errorMessage}: ${error.message}`);
        }
      }
    }
  }
}

module.exports = StaticFileGenerator;
