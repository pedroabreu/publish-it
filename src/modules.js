const { cp, cd, exec, find, ls, mkdir, rm } = require("shelljs")

const generateModules = (moduleName, moduleOpts, opts) => {
    const {
        libFolder,
        srcFolder,
        ignoreFiles,
        rootModule
    } = opts

    const isRootModule = rootModule === moduleName

    const moduleFolder = isRootModule ? libFolder : `${libFolder}/${moduleName}`

    if (!isRootModule) {
        mkdir("-p", moduleFolder)
    }

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

module.exports = generateModules
