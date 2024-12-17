const { syncExportFiles } = require("../lib/syncExport");
const executeStep = require("../utils/execute-step");

class ExportOutput {
  async runExportOutput(configs, devMode) {
    if (configs.exportOutput?.enabled) {
      console.log("Iniciando exportação de saída...");
      console.log("devMode:", devMode);
      await executeStep("🔄 - Export: Output Folder", syncExportFiles, [
        devMode,
      ]);
      console.log("Exportação de saída concluída com sucesso.");
    }
  }
}

module.exports = ExportOutput;
