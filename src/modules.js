const { cp, exec, find, ls, mkdir, rm } = require("shelljs")

const generateModules = (moduleName, moduleOpts, opts) => {
    const { libFolder, srcFolder, ignoreFiles, root } = opts

    const isRoot = root === moduleName

    const moduleFolder = isRoot ? libFolder : `${libFolder}/${moduleName}`

    if (!isRoot) {
        mkdir("-p", moduleFolder)
    }

    if (typeof moduleOpts === "boolean") {
        const moduleFiles = find(`${srcFolder}/**/*.js`).filter(
            file => file.match(ignoreFiles)
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
