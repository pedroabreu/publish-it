const cosmiconfig = require("cosmiconfig")

const explorer = cosmiconfig("publishit")

let config = {
    dryRun: false,
    fileFormat: ["js"],
    libFolder: "dist",
    next: false,
    output: {
        es: true
    },
    packageAccess: "public",
    root: "es"
}

const getConfig = () => config

const setConfig = args => {
    const configFile = explorer.searchSync()

    const tempConfig = {
        ...getConfig(),
        ...args,
        ...(configFile && configFile.config)
    }

    if (!tempConfig.libFolder) {
        throw Error("Missing destination folder")
    }

    if (!tempConfig.srcFolder) {
        throw Error("Missing source folder")
    }

    config = {
        ...tempConfig,
        output: getValidOutput(tempConfig.output)
    }
}

function getValidOutput(output = {}) {
    const validModules = ["cjs", "es", "es5", "umd"]
    const validOutput = {}

    validModules.forEach(module => {
        if (output.hasOwnProperty(module)) {
            validOutput[module] = output[module]
        }
    })

    return validOutput
}

module.exports = {
    getConfig,
    setConfig
}
