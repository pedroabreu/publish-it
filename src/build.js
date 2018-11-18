const { exec, find, cp, cd, mkdir } = require("shelljs")

const box = (args) => {
    const {
        copySrc,
        extraFilesCopy,
        libFolder,
        srcFolder,
        ignoreFiles,
        publishOnFinish
    } = args

    if (!libFolder) {
        throw Error("Missing lib folder")
    }

    mkdir("-p", libFolder)

    if (copySrc) {
        const originalCopyFolder = `${libFolder}/${copySrc}`

        mkdir("-p", originalCopyFolder)

        const srcFiles = find(`${srcFolder}/*.js`).filter((file) => !file.match(`\/${ignoreFiles}\/`))

        cp("-f", srcFiles, originalCopyFolder)
    }

    cp("package.json", libFolder)
    cp("-R", extraFilesCopy, libFolder)

    if (publishOnFinish) {
        cd(libFolder)
        exec("npm publish")
    }
}

module.exports = box
