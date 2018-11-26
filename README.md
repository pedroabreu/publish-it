# publish-it

Attempt to simplify publishing of a js library with different types of source files. By default it will copy the source files and package.json into the published package root.

Default usage is to copy source files and package.json to the published package folder

## Usage

```js
npm install publish-it --save-dev
```

```js
const publishLib = require("../src")

publishLib({
    libFolder: "dist",
    srcFolder: "src",
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

Add a script to your package.json file

```json
"scripts": {
    ...,
    "publish-it": "node ./path/to/publish.js"
}
```

## Configuration

| name | type | Description | Default |
| --- | --- | --- | --- |
| `libFolder` | string | Folder that will be the root of the published package. | `dist` (Add it to your .gitignore) |
| `srcFolder` | string | Location of the source files | --- |
| `dryRun` | boolean | Skip publishing the package | `false` |
| `extraFilesCopy` | array | Extra files that will be copied to published package root | --- |
| `ignoreFiles` | string | Files to be ignored | --- |
| `packageAccess` | string | Publish public or restricted package | `public` |
| `root` | string | One of `es`, `es5`, `cjs` or `umd` | `es` |
| `output` | object | Type of files to output | --- |
