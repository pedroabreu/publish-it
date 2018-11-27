const { exec, cp, cd, mkdir } = require("shelljs")

const generateModules = require("./modules")
const { getConfig, setConfig } = require("./config")

const validModules = ["cjs", "es", "es5", "umd"]

const publishLib = args => {
    setConfig(args)

    const {
        dryRun,
        extraFilesCopy,
        libFolder,
        output,
        packageAccess
    } = getConfig()

    if (!libFolder) {
        throw Error("Missing lib folder")
    }

    mkdir("-p", libFolder)

    validModules.forEach(module => {
        if (output.hasOwnProperty(module)) {
            generateModules(module, output[module])
        }
    })

    cp("package.json", libFolder)
    cp("-R", extraFilesCopy, libFolder)

    if (!dryRun) {
        cd(libFolder)
        exec(`npm publish --access ${packageAccess}`)
    }
}

module.exports = publishLib
