const { exec, find, cp, cd, mkdir } = require("shelljs")

const generateModules = require("./modules")

const validModules = ["cjs", "es", "es5", "umd"]

const publishLib = (args) => {
    const {
        copyFormats = ["js"],
        extraFilesCopy,
        ignoreFiles,
        libFolder = "dist",
        modules = ["cjs"],
        publishOnFinish = true,
        packageAccess = "public",
        rootModule = "es",
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
        exec(`npm publish --access ${packageAccess}`)
    }
}

module.exports = publishLib
