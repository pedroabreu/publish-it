#!/usr/bin/env node
const { cp, mkdir } = require("shelljs")

const generateModules = require("./modules")
const publishPackage = require("./publish")

const { getConfig, setConfig } = require("./config")

const publishLib = args => {
    setConfig(args)

    const { extraFilesCopy, libFolder, output } = getConfig()

    mkdir("-p", libFolder)

    Object.keys(output).forEach(module => {
        generateModules(module)
    })

    cp("package.json", libFolder)
    cp("-R", extraFilesCopy, libFolder)

    publishPackage()
}

module.exports = publishLib
