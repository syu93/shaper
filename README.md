# shaper
An image resize web service

## Install

```bash
$ npm i
```

Or you can run the server via **npx**

```bash
$ npx shaper-proxy serve --port 9000
```

## Usage

Call http://localhost:9000/200/https://picsum.photos/2000, To get the minifierd image

Call http://localhost:9000/200/https://picsum.photos/2000?format=png, to spécify the output format
