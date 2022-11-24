const express = require('express');
const fs = require('fs');
const router = express.Router();

router.use('/qr', (req, res) => {
  res.writeHead(200, { 'content-type': 'image/svg+xml' });
  fs.createReadStream(`./mediaSend/qr-code.svg`).pipe(res);
});

module.exports = router;
