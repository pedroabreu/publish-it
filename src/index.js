const { exec, find, cp, cd, mkdir } = require("shelljs")

const publishLibModule = require("./modules")

const validModules = ["es", "umd"]

const publishLib = (args) => {
    const {
        copyFormats,
        extraFilesCopy,
        ignoreFiles,
        libFolder,
        publishOnFinish
        srcFolder,
    } = args

    if (!libFolder) {
        throw Error("Missing lib folder")
    }

    mkdir("-p", libFolder)

    validModules.forEach((module) => {
        if (args.hasOwnProperty(module)) {
            publishLibModule(module, args[module], { libFolder, srcFolder, ignoreFiles })
        }
    })

    cp("package.json", libFolder)
    cp("-R", extraFilesCopy, libFolder)

    const hasPrepare = exec("npm run | grep 'prepare' | wc -l")

    if (!parseInt(hasPrepare)) {
        cp("-R", `${srcFolder}/*.${copyFormats}`, libFolder)
    }

    if (publishOnFinish) {
        cd(libFolder)
        exec("npm publish")
    }
}

module.exports = publishLib
