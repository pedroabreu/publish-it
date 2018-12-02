#!/usr/bin/env node
const publishCli = require("commander")
const packageJson = require(`${__dirname}/package.json`)

const publishLib = require("./index")

publishCli
    .version(packageJson.version, "-v, --version")
    .option("-dr, --dry-run", "Dry run execution, skips publishing")
    .option(
        "-f, --file-format [types]",
        "List of extensions to compile when a directory has been input [.es6,.js,.es,.jsx,.mjs]",
        commaToArray
    )
    .option(
        "-l, --lib-folder [folder]",
        "Folder where the library will be packaged to",
        "dist"
    )
    .option(
        "-s, --src-folder [folder]",
        "Folder where the source files are located",
        "src"
    )
    .option(
        "-p, --package-access [permissions]",
        "Package access permissions",
        "public"
    )
    .option(
        "-r, --root [output]",
        "Output that will be in the root of the package",
        "es"
    )
    .option(
        "-o, --output [type,action]",
        "Output that will be in the root of the package",
        commaToObject,
        {}
    )

const parsedArgs = publishCli.parse(process.argv)

publishLib(parsedArgs)

function commaToArray(value) {
    return [].concat(value.split(","))
}

function commaToObject(value, previousValue) {
    const [type, action] = value.split(",")

    if (!action) {
        return previousValue
    }

    previousValue[type] = action

    return previousValue
}
