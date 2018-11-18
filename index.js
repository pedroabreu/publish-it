const box = require("./src/build")

box({
    libFolder: "dist",
    srcFolder: "src",
    extraFilesCopy: ["README.md"],
    publishOnFinish: true
})
