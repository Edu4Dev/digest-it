const BasePipeline = require("./classes/BasePipeline");
const FileHandler = require("./classes/FileHandler");
const PromptProcessor = require("./classes/PromptProcessor");
const StaticFileGenerator = require("./classes/StaticFilesGenerator");
const FinalPipeline = require("./classes/FinalPipeline");
const ExportOutput = require("./classes/ExportOutput");
const mainProps = require("./config");

class DigestPipeline extends BasePipeline {
  constructor(
    userConfigs = {},
    userPaths = {},
    userKeys = {},
    autoPost = false,
    userDebug = false,
    userDevMode = false
  ) {
    const mergedConfigs = { ...mainProps.configs, ...userConfigs };
    super(mergedConfigs, userPaths, userKeys, autoPost, userDebug, userDevMode);
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
      const staticGenerator = new StaticFileGenerator();
      const finalPipeline = new FinalPipeline();
      const exportOut = new ExportOutput();

      await fileHandler.setupEssentialFiles(
        this.configs.essentialFiles,
        context
      );
      await promptProcessor.processPrompts(
        this.configs.promptDigestion,
        context
      );
      await staticGenerator.generateStaticFiles(
        this.configs.staticFiles,
        context
      );
      await finalPipeline.runFinalStep(this.configs.finalPipe, context);
      console.log("chama exportOut.runExportOutput");

      await exportOut.runExportOutput(this.configs, this.devMode);
    } catch (error) {
      console.error("Erro durante a execução do pipeline:", error);
      throw new Error(`Pipeline falhou: ${error.message}`);
    }
  }
}

module.exports = DigestPipeline;
