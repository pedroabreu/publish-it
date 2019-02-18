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
        // package.json version is limited to X.X.X
        const appVersion = Date.now()
            .toString()
            .match(/.{1,5}/g)
            .join(".")

        exec(`npm version ${appVersion} --no-git-tag-version`, { silent: true })

        const { stdout: packageName } = exec("npm pack", {
            silent: true
        })

        exec(`npm publish ${packageName} --tag next`, { silent: true })

        echo(
            `Release successful! Run 'yarn upgrade ${
                packageJson.name
            }@next --dev' in your project`
        )
    } else {
        exec(`npm publish --access ${packageAccess}`)
    }
}

module.exports = publishPackage
