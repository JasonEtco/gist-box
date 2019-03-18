<h3 align="center">gist-box</h3>
<p align="center">A helper class for updating a single-file Gist<p>
<p align="center"><a href="https://npmjs.com/package/gist-box"><img src="https://badgen.net/npm/v/gist-box" alt="NPM"></a> <a href="https://action-badges.now.sh"><img src="https://action-badges.now.sh/JasonEtco/gist-box" alt="Build Status"></a> <a href="https://codecov.io/gh/JasonEtco/gist-box/"><img src="https://badgen.now.sh/codecov/c/github/JasonEtco/gist-box" alt="Codecov"></a></p>

## Usage

### Installation

```sh
$ npm install gist-box
```

```js
const { GistBox } = require('gist-box')
```

## How it works

```js
const box = new GistBox(gist_id, token)
await box.update({
  filename: 'example.md',
  description: 'A new description',
  content: 'The new content'
})
```