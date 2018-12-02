const { cp, exec, find, ls, mkdir, rm } = require("shelljs")

const { getConfig } = require("./config")

const generateModules = moduleName => {
    const {
        libFolder,
        srcFolder,
        ignoreFiles,
        root,
        fileFormat,
        output
    } = getConfig()
    const moduleOpts = output[moduleName]
    const isRoot = root === moduleName

    const moduleFolder = isRoot ? libFolder : `${libFolder}/${moduleName}`

    if (!isRoot) {
        mkdir("-p", moduleFolder)
    }

    if (typeof moduleOpts === "boolean") {
        const filesToFind = fileFormat.map(
            value => `${srcFolder}/**/*.${value}`
        )
        const moduleFiles = find(filesToFind).filter(
            file => !file.match(ignoreFiles)
        )

        // Maintain the sub dir tree structure
        moduleFiles.forEach(module => {
            const path = module.split("/")
            path.shift()
            path.pop()

            if (path.length) {
                mkdir("-p", `${moduleFolder}/${path.join("/")}`)
            }

            cp("-R", module, `${moduleFolder}/${path.join("/")}`)
        })
    } else {
        exec(moduleOpts)
    }

    // Remove module folder if empty
    if (!ls(moduleFolder).stdout) {
        rm("-R", moduleFolder)
    }
}

module.exports = generateModules
