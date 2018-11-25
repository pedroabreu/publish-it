const publishLib = require("../src")

publishLib({
    libFolder: "dist",
    srcFolder: "src",
    copyFormats: ["js"],
    extraFilesCopy: ["README.md"],
    ignoreFiles: "*.spec.js",
    publishOnFinish: false,
    rootModule: "cjs",
    modules: {
        es: true
        umd: "npm run something",
        cjs: "npm run anything"
    }
})
