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

const setConfig = (args) => {
    const configFile = explorer.searchSync()

    config = {
        ...getConfig(),
        ...args,
        ...(configFile && configFile.config)
    }
}

module.exports = {
    getConfig,
    setConfig
}
