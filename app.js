const SerialPort = require("serialport");
const SerialPortParser = require("@serialport/parser-readline");
const GPS = require("gps");
const Request = require("request-promise");

const port = new SerialPort("/dev/ttyS0", { baudRate: 9600 });
const gps = new GPS();

//const APP_ID = "HERE_APP_ID";
//const APP_CODE = "HERE_APP_CODE";

const parser = port.pipe(new SerialPortParser());

//function getAddressInformation(latitude, longitude) {}

//gps.on("data", async data => {});
parser.on("data", data => {
    console.log(data);
});