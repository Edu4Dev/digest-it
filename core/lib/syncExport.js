const fs = require("fs-extra");
var rootFolder = require("app-root-path");
const path = require("path");

async function syncExportFiles(devMode) {
  console.log("devMode2:", devMode);

  const nodeFolder = devMode ? `` : `node_modules/digest-it/`;
  const publicSourceFolder = path.join(
    `${rootFolder}`,
    `${nodeFolder}nextjs-ai-times/out`
  );
  const destinationSourceFolder = path.join(`${rootFolder}`, `output`);

  try {
    fs.copySync(publicSourceFolder, destinationSourceFolder, {
      recursive: true,
    });
    return console.log("✔️ [Sync Export Output]: copy successfully.");
  } catch (error) {
    console.log("publicSourceFolder:", publicSourceFolder);
    console.log("destinationSourceFolder:", destinationSourceFolder);

    console.log("❌ [Sync Export Output]: copy ERROR.");
    return console.log(error);
  }
}

module.exports = {
  syncExportFiles,
};
