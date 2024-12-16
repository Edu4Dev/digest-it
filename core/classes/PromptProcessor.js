const promptsToPostProcessor = require("../lib/prompts-to-post");
const executeStep = require("../utils/execute-step");

class PromptProcessor {
  async processPrompts(config, context) {
    const {
      contentPath,
      draftsFolder,
      ai,
      autoPostData,
      authorsData,
      general,
      gptKey,
      cloudinaryConfig,
      autoPost,
      debug,
    } = context;

    if (!config) return;

    await executeStep("📝 - Generate: A.I. Posts", promptsToPostProcessor, [
      contentPath,
      draftsFolder,
      ai,
      autoPostData,
      authorsData,
      general,
      gptKey,
      cloudinaryConfig.folderName,
      cloudinaryConfig.cloudName,
      cloudinaryConfig.cloudApiKey,
      cloudinaryConfig.apiSecret,
      autoPost,
      debug,
    ]);
  }
}

module.exports = PromptProcessor;
