const publishLib = require("../src")

publishLib({
    libFolder: "dist",
    srcFolder: "src",
    copyFormats: ["js"],
    dryRun: true,
    extraFilesCopy: ["README.md"],
    output: {
        es: true
    },
    root: "es"
})
