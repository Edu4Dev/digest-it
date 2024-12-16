const fs = require("fs-extra");
var rootFolder = require("app-root-path");
// const path = require("path");

const publicSourceFolder = rootFolder + `/content/public`;
const destinationSourceFolder = rootFolder + `/core/public`;

async function syncPublicFiles() {
  try {
    return fs.copySync(publicSourceFolder, destinationSourceFolder, {
      recursive: true,
    });
  } catch (error) {
    console.log("❌ [copySync Public files]: copy ERROR.");
    return console.log(error);
  }
}

module.exports = {
  syncPublicFiles,
};
