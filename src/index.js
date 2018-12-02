#!/usr/bin/env node

const { cp, mkdir } = require("shelljs")

const generateModules = require("./modules")
const publishPackage = require("./publish")

const { getConfig, setConfig } = require("./config")

const validModules = ["cjs", "es", "es5", "umd"]

const publishLib = args => {
    setConfig(args)

    const { extraFilesCopy, libFolder, output } = getConfig()

    mkdir("-p", libFolder)

    validModules.forEach(module => {
        if (output.hasOwnProperty(module)) {
            generateModules(module, output[module])
        }
    })

    cp("package.json", libFolder)
    cp("-R", extraFilesCopy, libFolder)

    publishPackage()
}

module.exports = publishLib
