#!/usr/bin/env node
const { exec, cp, mkdir } = require("shelljs")

const generateModules = require("./modules")
const publishPackage = require("./publish")

const { getConfig, setConfig } = require("./config")

const publishLib = args => {
    setConfig(args)

    const { extraFilesCopy, libFolder, output, next } = getConfig()

    mkdir("-p", libFolder)

    Object.keys(output).forEach(module => {
        generateModules(module)
    })

    if (next) {
        // package.json version is limited to X.X.X
        const appVersion = Date.now()
            .toString()
            .match(/.{1,5}/g)
            .join(".")
            .replace("0", "")

        exec(`npm --no-git-tag-version version ${appVersion}`, { silent: true })
    }

    cp("package.json", libFolder)
    cp("-R", extraFilesCopy, libFolder)

    publishPackage()
}

module.exports = publishLib
