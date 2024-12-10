const BasePipeline = require("./classes/BasePipeline");
const FileHandler = require("./classes/FileHandler");
const PromptProcessor = require("./classes/PromptProcessor");
const StaticFileGenerator = require("./classes/StaticFileGenerator");
const FinalPipeline = require("./classes/FinalPipeline");
const mainProps = require("./config");
const debugMe = require("./utils/debugMe"); // Logs detalhados com debugMe
const initialPipe = require("./digest-pipeline").initialPipe;

class DigestPipeline extends BasePipeline {
  constructor(
    userConfigs = {},
    userPaths = {},
    userKeys = {},
    autoPost = false,
    userDebug = false
  ) {
    const mergedConfigs = { ...mainProps.configs, ...userConfigs };
    super(mergedConfigs, userPaths, userKeys, autoPost, userDebug);

    this.workflowsDir = this.paths.workflowsDir;
    this.stylesFolder = this.paths.stylesPath;
    this.contentPath = this.paths.contentPath;
    this.draftsFolder = this.paths.draftsPath;

    // Safe requires
    this.general = this.safeRequire(this.paths.generalFile);
    this.ai = this.safeRequire(this.paths.aiFile);
    this.autoPostData = this.safeRequire(this.paths.autoPostFile);
    this.authorsData = this.safeRequire(this.paths.authorsDataFile);
    this.scheduledPosts = this.safeRequire(this.paths.scheduledPostsFile);
  }

  safeRequire(path) {
    try {
      return require(path);
    } catch (error) {
      console.error(`Error loading file at ${path}:`, error);
      return null;
    }
  }

  // Retry helper
  async withRetry(label, fn, args = [], retries = 3) {
    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        const start = performance.now();
        debugMe(`⏳ Tentativa ${attempt}: ${label}`);
        await fn(...args);
        debugMe(
          `✅ Sucesso: ${label} em ${(performance.now() - start).toFixed(2)}ms`
        );
        return;
      } catch (error) {
        debugMe(
          `⚠️ Falha na tentativa ${attempt}: ${label} - ${error.message}`
        );
        if (attempt === retries) {
          throw new Error(`❌ Todas as tentativas falharam: ${label}`);
        }
      }
    }
  }

  async run() {
    try {
      const context = {
        ...this.paths,
        ...this.configs,
        apiKeys: this.apiKeys,
        publicSourceFolder: this.publicSourceFolder,
        destinationSourceFolder: this.destinationSourceFolder,
      };

      const fileHandler = new FileHandler();
      const promptProcessor = new PromptProcessor();
      const staticFileGenerator = new StaticFileGenerator();
      const finalPipeline = new FinalPipeline();

      debugMe("🚀 Iniciando a Pipeline de Digestão...");

      // Etapa inicial
      await this.withRetry("🔑 Etapa Inicial", initialPipe, [
        this.configs.initialPipe,
        this.workflowsDir,
      ]);

      await this.withRetry(
        "🔧 Configuração de Arquivos Essenciais",
        fileHandler.setupEssentialFiles,
        [this.configs.essentialFiles, context]
      );

      await this.withRetry(
        "🧠 Processamento de Prompts",
        promptProcessor.processPrompts,
        [this.configs.promptDigestion, context]
      );

      // Execução paralela no StaticFileGenerator
      debugMe("📝 Gerando arquivos estáticos em paralelo...");
      const staticTasks = [
        this.withRetry(
          "📄 Index Sitemaps",
          staticFileGenerator.generateStaticFiles.bind(staticFileGenerator),
          [this.configs.staticFiles.indexSitemap, context]
        ),
        this.withRetry(
          "📰 Posts Sitemaps",
          staticFileGenerator.generateStaticFiles.bind(staticFileGenerator),
          [this.configs.staticFiles.postSitemap, context]
        ),
        this.withRetry(
          "📑 Pages Sitemaps",
          staticFileGenerator.generateStaticFiles.bind(staticFileGenerator),
          [this.configs.staticFiles.pageSitemap, context]
        ),
        this.withRetry(
          "📡 Feeds Sitemaps",
          staticFileGenerator.generateStaticFiles.bind(staticFileGenerator),
          [this.configs.staticFiles.feedsSitemaps, context]
        ),
        this.withRetry(
          "📨 Atom Feeds",
          staticFileGenerator.generateStaticFiles.bind(staticFileGenerator),
          [this.configs.staticFiles.atom, context]
        ),
        this.withRetry(
          "📰 RSS Feeds",
          staticFileGenerator.generateStaticFiles.bind(staticFileGenerator),
          [this.configs.staticFiles.rss, context]
        ),
        this.withRetry(
          "⚡ AMP Stories",
          staticFileGenerator.generateStaticFiles.bind(staticFileGenerator),
          [this.configs.staticFiles.ampStories, context]
        ),
      ];

      await Promise.all(staticTasks);
      debugMe("✅ Arquivos estáticos gerados com sucesso!");

      await this.withRetry(
        "🏁 Etapa Final do Pipeline",
        finalPipeline.runFinalStep,
        [this.configs.finalPipe, context]
      );

      debugMe("🎉 Pipeline concluída com sucesso!");
    } catch (error) {
      console.error("❌ Erro durante a execução do pipeline:", error.message);
      throw new Error(`Pipeline falhou: ${error.message}`);
    }
  }
}

module.exports = DigestPipeline;
