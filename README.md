# publish-it

Attempt to simplify publishing of a js library with different types of source files.

### Why should I use this ?

I've started developing a private util library and realized there was no obvious, straight-forward way of publishing a package with different source files. I investigated what other utils packages are doing and got some inspiration from lodash, that has on it's root, the es5 files and a folder for the es files, so this way the consumer could decide which one to go for.

So this is the main use case of this package, to be able to publish your library simply be defining what type of files are you publishing. It runs under the hood `npm publish` so it should be able to work together with post publish scripts.

## Usage

```js
npm install publish-it --save-dev
```

There are several options for config. Either pass an object to `publishLib`, or define a `.publishitrc`, `publishit` in package.json or CommonJS `publishit.config.js`.

```js
const publishLib = require("publish-it")

publishLib({
    libFolder: "dist",
    srcFolder: "src",
    extraFilesCopy: ["README.md"],
    ignoreFiles: /spec./,
    dryRun: false,
    output: {
        es: true,
        umd: "npm run something",
        cjs: "npm run anything"
    }
})
```
or

```json
{
	"libFolder": "dist",
	"srcFolder": "src",
	"extraFilesCopy": ["README.md"],
	"ignoreFiles": "/spec./",
	"dryRun": false,
	"output": {
		"es": true,
		"umd": "npm run something",
		"cjs": "npm run anything"
	}
}
```

Add a script to your package.json file

```json
"scripts": {
    "...": "",
    "publish-it": "node ./path/to/publish.js"
}
```

### publish-it cli

You can use `npx` to use the cli.

```
npx publish-it
```

Config can still be specified on a rc file (or other options as stated before), or trough the cli. See `npx publish-it --help` for options.

## Configuration

| name | type | Description | Default |
| --- | --- | --- | --- |
| `libFolder` | string | Folder that will be the root of the published package. | `dist` (Add it to your .gitignore) |
| `srcFolder` | string | Location of the source files | --- |
| `dryRun` | boolean | Skip publishing the package | `false` |
| `fileFormat` | array | File format to copy | `["js"]` |
| `extraFilesCopy` | array | Extra files that will be copied to published package root | --- |
| `ignoreFiles` | regex | Files to be ignored | --- |
| `packageAccess` | string | Publish public or restricted package | `public` |
| `root` | string | One of `es`, `es5`, `cjs` or `umd` | `es` |
| `output` | object | Type of files to output | --- |
| `next` | boolean | Publish package as a next | `false` |
