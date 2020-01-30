const ThermalPrinter = require("node-thermal-printer").printer;
const PrinterTypes = require("node-thermal-printer").types;

// file to using node module: node-thermal-printer
// havent tested as we dont have a network Thermal printer
// will need tinkering as have no previous experience with async await
const printerIp = "10.10.10.10";
const date = Date.now();
const brand = 'Zizzi';
const siteId = 169;
const URL = `www.${brand}.com/${siteId}/1234/${date}`; 

let printer = new ThermalPrinter({
  type: PrinterTypes.STAR,                                  
  interface: `tcp://${ printerIp }`,
  removeSpecialCharacters: false,                         
  options:{                                               
    timeout: 5000                                           
  }
});

const setupPrintJob = () => {
  printer.alignCenter();
  printer.println(`Welcome to ${ brand }`);
  printer.printQR(URL); 
  printer.cut();
}

const print = async () => {
  await printer.isPrinterConnected();
  await printer.execute()
}

setupPrintJob();
print();



