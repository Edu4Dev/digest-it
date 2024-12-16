class BasePipeline {
  constructor(configs, paths, apiKeys, autoPost = false, debug = false) {
    this.configs = configs;
    this.paths = paths;
    this.apiKeys = apiKeys;
    this.autoPost = autoPost;
    this.debug = debug;
  }

  safeRequire(path) {
    try {
      return require(path);
    } catch (error) {
      console.error(`Error loading file at ${path}:`, error);
      return null;
    }
  }

  mergeWithDefault(defaultObj, userObj) {
    return { ...defaultObj, ...userObj };
  }
}

module.exports = BasePipeline;
