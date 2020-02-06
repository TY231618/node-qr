const express = require('express');
const app = express();
const PORT = process.env.PORT || 3002;
const fs = require('fs');
const printerTest = require('printer');


const QRCode = require('qrcode')

// setting up URL
const date = Date.now();
const brand = 'zizzi';
const siteId = 169;
// dummy URL with potential required params
const URL = `www.${brand}.com/${siteId}/1234/${date}`;

// setting up a template HTML file for receipt
const template = require('./template');

// a funny real URL to test QR code works
const catURL = 'http://http.cat';
// write QR to file with pulled in template
async function qRGeneratorToFile() {
  const res = await QRCode.toDataURL(catURL);

  fs.writeFileSync('./qr.html', template(brand, res));
  console.log('Wrote to ./qr.html');
}

const test = QRCode.toString(catURL, {type:'terminal'}, function (err, url) {
  console.log(url)
})

console.log(test);

qRGeneratorToFile().catch(error => console.error(error.stack));

// endpoint for qr code
app.get('/qr', (req, res) => {
  res.sendFile('/Users/tonyyoung/projects/azzurrri/node-qr/qr.html');
});

app.listen(PORT, () => {
  console.log('server up and running on port: ', PORT);
});