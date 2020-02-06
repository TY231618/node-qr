const qr = require('qr-image');  
const express = require('express');
const printerTest = require('printer');
// const qrCode = require('qrcode');

qrCode.toDataURL('I am a pony!', function (err, url) {
  console.log(url)
})

const app = express();

app.get('/', async function(req, res) {  
  var code = qr.image(new Date().toString(), { type: 'pdf' });
  res.type('pdf');

  const chunks = [];
  for await (let chunk of code) {
    chunks.push(chunk);
  }

  const data = Buffer.concat(chunks);

  function sendPrint() {
    const printerOptions = printerTest.getPrinterDriverOptions();

    printerTest.printDirect({
      data: data,
      type: 'PDF',
      options: {
        media: 'X50D8MMY50MM',
        'fit-to-page': true
      },
      success: function (jobID) {
        console.log("ID: " + jobID);
      },
      error: function (err) {
        console.log('printer module error: ' + err);
        throw err;
      }
    });
  }

  sendPrint();
});

app.listen(3000);