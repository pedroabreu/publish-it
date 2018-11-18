const unnamedBuild = require("./src/build")


unnamedBuild({
    libFolder: "dist",
    srcFolder: "src",
    extraFilesCopy: ["README.md"],
    publishOnFinish: true
})
