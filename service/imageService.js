const sharp = require("sharp");
const fetch = require("node-fetch");

function processImageAsImage(req, res, next) {
  const url = req.params[0];
  const size = Number(req.params.size);

  return fetch(url)
    .then(data => data.buffer())
    .then((data) => {
      return sharp(data, {
        failOnError: false,
      })
      .clone()
      .resize({ width: size })
      .webp({ quality: 80 })
      .toBuffer();
    })
    .then((data) => {
      const b64Image = data.toString('base64');

      res.status(200);
      res.type('webp');
      res.send(Buffer.from(b64Image, 'base64'));
    })
    .catch(next);
}

function processImageAsString(req, res, next) {
  const url = req.params[0];
  const size = Number(req.params.size);

  return fetch(url)
    .then(data => data.buffer())
    .then((data) => {
      return sharp(data, {
        failOnError: false,
      })
      .clone()
      .resize({ width: size })
      .webp({ quality: 80 })
      .toBuffer();
    })
    .then((data) => {
      const b64Image = data.toString('base64');

      res.status(200);
      res.send(`data:image/webp;base64,${b64Image}`);
    })
    .catch(next);
}

module.exports = {
  processImageAsImage,
  processImageAsString
};
