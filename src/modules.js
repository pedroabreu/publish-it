const { cp, cd, exec, find, ls, mkdir, rm } = require("shelljs")

const publishLibModule = (moduleName, moduleOpts, opts) => {
    const {
        libFolder,
        srcFolder,
        ignoreFiles
    } = opts

    const moduleFolder = `${libFolder}/${moduleName}`

    mkdir("-p", moduleFolder)

    if (typeof moduleOpts === "boolean") {
        const moduleFiles = find(`${srcFolder}/*.js`).filter((file) => !file.match(`\/${ignoreFiles}\/`))

        cp("-f", moduleFiles, moduleFolder)
    } else {
        exec(moduleOpts)
    }

    // Remove module folder if empty
    if (!ls(moduleFolder).stdout) {
        rm("-R", moduleFolder)
    }
}

module.exports = publishLibModule
