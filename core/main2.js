// Core Name: Digest Pipeline
// Repo URI: https://github.com/Edu4Dev/digest-it
// Description: Build init digest core
// Author: Milton Bolonha

const BasePipeline = require("./classes/BasePipeline");
const FileHandler = require("./classes/FileHandler");
const PromptProcessor = require("./classes/PromptProcessor");
const StaticFilesGenerator = require("./classes/StaticFilesGenerator");
const FinalPipeline = require("./classes/FinalPipeline");
const mainProps = require("./config");
const debugMe = require("./utils/debugMe"); // Logs detalhados com debugMe
const initialPipe = require("./digest-pipeline").initialPipe;

/**
 * Class representing the DigestPipeline.
 * Extends the BasePipeline to provide functionalities for processing and generating static content.
 */
class DigestPipeline extends BasePipeline {
  /**
   * Creates an instance of DigestPipeline.
   * @param {Object} userConfigs - User-defined configurations to override defaults.
   * @param {Object} userPaths - User-defined paths for files and folders.
   * @param {Object} userKeys - API keys or secret credentials.
   * @param {boolean} autoPost - Whether to enable automatic posting.
   * @param {boolean} userDebug - Whether to enable debug logs.
   */
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

  /**
   * Safely requires a file and handles errors.
   * @param {string} path - The file path to require.
   * @returns {Object|null} The required module or null if failed.
   */
  safeRequire(path) {
    try {
      return require(path);
    } catch (error) {
      console.error(`Error loading file at ${path}:`, error);
      return null;
    }
  }

  /**
   * Helper function to retry a function multiple times.
   * @param {string} label - A descriptive label for the operation.
   * @param {Function} fn - The function to execute.
   * @param {Array} args - Arguments to pass to the function.
   * @param {number} retries - Number of retry attempts.
   */
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

  /**
   * Runs the entire pipeline process.
   * Executes stages such as file setup, prompt processing, static file generation, and finalization.
   * @async
   */
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
      const staticFilesGenerator = new StaticFilesGenerator();
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

      // Execução paralela no staticFilesGenerator
      debugMe("📝 Gerando arquivos estáticos em paralelo...");
      const staticTasks = [
        this.withRetry(
          "📄 Index Sitemaps",
          staticFilesGenerator.generateStaticFiles.bind(staticFilesGenerator),
          [this.configs.staticFiles.indexSitemap, context]
        ),
        this.withRetry(
          "📰 Posts Sitemaps",
          staticFilesGenerator.generateStaticFiles.bind(staticFilesGenerator),
          [this.configs.staticFiles.postSitemap, context]
        ),
        this.withRetry(
          "📑 Pages Sitemaps",
          staticFilesGenerator.generateStaticFiles.bind(staticFilesGenerator),
          [this.configs.staticFiles.pageSitemap, context]
        ),
        this.withRetry(
          "📡 Feeds Sitemaps",
          staticFilesGenerator.generateStaticFiles.bind(staticFilesGenerator),
          [this.configs.staticFiles.feedsSitemaps, context]
        ),
        this.withRetry(
          "📨 Atom Feeds",
          staticFilesGenerator.generateStaticFiles.bind(staticFilesGenerator),
          [this.configs.staticFiles.atom, context]
        ),
        this.withRetry(
          "📰 RSS Feeds",
          staticFilesGenerator.generateStaticFiles.bind(staticFilesGenerator),
          [this.configs.staticFiles.rss, context]
        ),
        this.withRetry(
          "⚡ AMP Stories",
          staticFilesGenerator.generateStaticFiles.bind(staticFilesGenerator),
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
