const fs = require('fs');
const qr = require('qr-image');
//save image
const generateImage = (base64, cb = () => {}) => {
  let qr_svg = qr.image(base64, { type: 'svg', margin: 4 });
  qr_svg.pipe(require('fs').createWriteStream('./mediaSend/qr-code.svg'));
  console.log(`⚡ Recuerda que el QR se actualiza cada minuto ⚡'`);
  console.log(`⚡ Actualiza F5 el navegador para mantener el mejor QR⚡`);
  cb();
};
module.exports = { generateImage };
