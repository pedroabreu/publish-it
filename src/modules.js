const { exec, find, cp, cd, mkdir } = require("shelljs")

const publishLibModule = (moduleName, moduleOpts, opts) => {
    const {
        libFolder,
        srcFolder,
        ignoreFiles
    } = opts

    const originalCopyFolder = `${libFolder}/${moduleName}`

    mkdir("-p", originalCopyFolder)

    if (typeof moduleOpts === "boolean") {
        const moduleFiles = find(`${srcFolder}/*.js`).filter((file) => !file.match(`\/${ignoreFiles}\/`))

        cp("-f", moduleFiles, originalCopyFolder)
    } else {
        exec(moduleOpts.exec)
    }
}

module.exports = publishLibModule
