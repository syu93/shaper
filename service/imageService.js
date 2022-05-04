const sharp = require("sharp");
const fetch = require("node-fetch");

function processImageAsImage(req, res, next) {
  const url = req.params[0];
  const size = Number(req.params.size);
  const format = req.query.format;

  const availableFormats = [
    'jpeg',
    'jp2',
    'png',
    'webp',
    'gif',
    'avif',
    'heif',
    'tiff',
    'raw',
  ];

  let currentFormat = format || 'webp';

  if (!availableFormats.includes(currentFormat)) {
    throw new Error(`${currentFormat} is not a supported format`);
  }

  return fetch(url)
    .then(data => data.buffer())
    .then((data) => {
      const instance = sharp(data, {
        failOnError: false,
      })
      .clone()
      .resize({ width: size });

      return instance[currentFormat]({ quality: 80 })
        .toBuffer();
    })
    .then((data) => {
      const b64Image = data.toString('base64');

      res.status(200);
      res.type(currentFormat);
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
      res.send(`data:image/${currentFormat};base64,${b64Image}`);
    })
    .catch(next);
}

module.exports = {
  processImageAsImage,
  processImageAsString
};
