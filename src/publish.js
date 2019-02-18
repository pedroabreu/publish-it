const { echo, exec, cd } = require("shelljs")
const packageJson = require(`${process.cwd()}/package.json`)
const { getConfig } = require("./config")

const publishPackage = () => {
    const { dryRun, libFolder, packageAccess, next } = getConfig()

    if (dryRun) {
        return
    }

    cd(libFolder)

    if (next) {
        exec(`npm publish --access ${packageAccess} --tag next`)

        echo(
            `Release successful! Run 'npm install ${
                packageJson.name
            }@next --save-dev' in your project`
        )
    } else {
        exec(`npm publish --access ${packageAccess}`)
    }
}

module.exports = publishPackage
