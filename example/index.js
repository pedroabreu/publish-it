const publishLib = require("../src")

publishLib({
    libFolder: "dist",
    srcFolder: "src",
    copyFormats: ["js"],
    extraFilesCopy: ["README.md"],
    ignoreFiles: "*.spec.js",
    publishOnFinish: false,
    modules: {
        es: true,
        umd: "yarn something"
    }
})
