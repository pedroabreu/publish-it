const { exec, find, cp, cd, mkdir } = require("shelljs")

const generateModules = require("./modules")

const validModules = ["cjs", "es", "umd"]

const publishLib = (args) => {
    const {
        copyFormats,
        extraFilesCopy,
        ignoreFiles,
        libFolder,
        modules,
        publishOnFinish,
        rootModule,
        srcFolder
    } = args

    if (!libFolder) {
        throw Error("Missing lib folder")
    }

    mkdir("-p", libFolder)

    validModules.forEach((module) => {
        if (modules.hasOwnProperty(module)) {
            generateModules(module, modules[module], { libFolder, srcFolder, ignoreFiles, rootModule })
        }
    })

    cp("package.json", libFolder)
    cp("-R", extraFilesCopy, libFolder)

    if (publishOnFinish) {
        cd(libFolder)
        exec("npm publish")
    }
}

module.exports = publishLib
