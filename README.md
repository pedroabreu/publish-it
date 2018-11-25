# publish-it

Attempt to simplify publishing of a js library with different modules and keep it lean. By default it will copy the source files and package.json into the published package root.

For es and umd modules, it creates a folder for each and allows execution of npm scripts to parse and copy source files

## Usage

```js
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
        umd: "npm run something",
        cjs: "npm run anything"
    }
})
```

## Configuration

| name | type | Description | Default |
| --- | --- | --- | --- |
| `libFolder` | string | Folder that will be the root of the published package. | `dist` (Add it to your .gitignore) |
| `srcFolder` | string | Location of the source files | --- |
| `copyFormat` | string | Format of files to be copied | `["js"]` |
| `extraFilesCopy` | array | Extra files that will be copied to published package root | --- |
| `ignoreFiles` | string | Files to be ignored | --- |
| `packageAccess` | string | Publish public or restricted package | `public` |
| `publishOnFinish` | boolean | Publish package on finish. Defaults to true | `true` |
| `modules` | object | Modules to also be published. These will live in their own folder. Boolean will copy the files, string will treat it as a script and execute it | --- |
