const ThermalPrinter = require("node-thermal-printer").printer;
const PrinterTypes = require("node-thermal-printer").types;
const printerTest = require('printer');

let printer = new ThermalPrinter({
  type: PrinterTypes.STAR,
  interface: 'printer:Star_TSP143__STR_T_001____Thanosb_9s_MacBook_Pro__2_',
  driver: printerTest
});

printer.printQR('HELLO');
const buffer = printer.getBuffer();

function sendPrint() {
  printerTest.printDirect({
    data: buffer.toString(),
    type: 'RAW',
    success: function (jobID) {
      console.log("ID: " + jobID);
    },
    error: function (err) {
      console.log('printer module error: '+err);
      throw err;
    }
  });
}

sendPrint();

