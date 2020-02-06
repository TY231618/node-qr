const ipp = require('ipp'); 
const printer = ipp.Printer("http://192.168.128.20/printers/Star_TSP143__STR_T_001_");
const msg = {
    "operation-attributes-tag": {
        "requesting-user-name": "William",
        "job-name": "My Test Job",
    },
    data: new Buffer.from('Hello World')
};
printer.execute("Print-Job", msg, function(err, res){
    console.log(res);
});
