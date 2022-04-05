const express = require("express");
const { processImageAsImage, processImageAsString } = require('./service/imageService.js');

const app = express();

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


app.listen(9000);
