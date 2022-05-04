#!/usr/bin/env node

const express = require("express");
var cors = require('cors');
const helmet = require("helmet");

const { processImageAsImage, processImageAsString } = require('./service/imageService.js');

const app = express();

app.use(cors());
app.use(helmet());

app.get('/image/:size/*', (req, res, next) => {
  const size = Number(req.params.size);
  if (!req.params[0] || !size) {
    res.status(404);
    return res.send();
  }
  next();
}, processImageAsImage);

app.get("/:size/*", (req, res, next) => {
  const size = Number(req.params.size);
  if (!req.params[0] || !size) {
    res.status(404);
    return res.send();
  }
  next();
}, processImageAsString);

const { name } = require('./package.json');

require('yargs')
  .scriptName(name)
  .usage('$0 <cmd> [args]')
  .demandCommand(1, "")
  .command('serve', 'Start the server', (yargs) => {
    yargs.option('port', {
      alias: 'p',
      type: 'number',
      default: 9000,
      describe: 'This port to be used by the server'
    })
  }, function (argv) {
    console.log("Start shper server on port", argv.port);
    app.listen(argv.port);
  })
  .help()
  .argv;
