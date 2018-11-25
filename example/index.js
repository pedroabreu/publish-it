const publishLib = require("../src")

publishLib({
    libFolder: "dist",
    srcFolder: "src",
    copyFormats: ["js"],
    extraFilesCopy: ["README.md"],
    publishOnFinish: false,
    modules: {
        es: true,
        umd: "yarn something"
    }
})
