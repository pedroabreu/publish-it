const { exec, cd } = require("shelljs")

const { getConfig } = require("./config")

const publishPackage = () => {
    const { dryRun, libFolder, packageAccess } = getConfig()

    if (dryRun) {
        return
    }

    cd(libFolder)
    exec(`npm publish --access ${packageAccess}`)
}

module.exports = publishPackage
