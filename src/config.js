const cosmiconfig = require("cosmiconfig")

const explorer = cosmiconfig("publishit")

let config = {
    dryRun: false,
    fileFormat: ["js"],
    libFolder: "dist",
    output: {
        es: true
    },
    packageAccess: "public",
    root: "es"
}

const getConfig = () => config

const setConfig = args => {
    const configFile = explorer.searchSync()

    config = {
        ...getConfig(),
        ...args,
        ...(configFile && configFile.config)
    }

    if (!config.libFolder) {
        throw Error("Missing destination folder")
    }

    if (!config.srcFolder) {
        throw Error("Missing source folder")
    }
}

module.exports = {
    getConfig,
    setConfig
}
