const publishLib = require("../src")

publishLib({
    libFolder: "dist",
    srcFolder: "src",
    copyFormats: ["js"],
    extraFilesCopy: ["README.md"],
    modules: {
        es: true
    },
    rootModule: "es"
})
