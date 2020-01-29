const SerialPort = require("serialport");
const SerialPortParser = require("@serialport/parser-readline");
const GPS = require("gps");
const Request = require("request-promise");

const port = new SerialPort("/dev/ttyAMA0", { baudRate: 9600 });
const gps = new GPS();

//const APP_ID = "HERE_APP_ID";
//const APP_CODE = "HERE_APP_CODE";

const parser = port.pipe(new SerialPortParser());

function getAddressInformation(latitude, longitude) {
    let address ={};
    return Request({
        "uri": "https://reverse.geocoder.api.here.com/6.2/reversegeocode.json",
        "qs": {
            "app_id": "4GqSZVAsHbtzpGMsSjcp",
            "app_code": "JF5Cc3uvR-Aabh5-RBKD8VtSkKLhwlwQF4SLFQ43n0A",
            "mode": "retrieveAddress",
            "prox": latitude + "," + longitude
        },
        "json": true
    }).then(result => {
        if(result-Response.View.length > 0 && result.Response.View[0].Result.length > 0) {
            address = result.Response.View[0].Result[0].Location.Address;
        }
        return address;
    });
}

//gps.on("data", async data => {});

gps.on("data", async data => {
    if(data.type == "GGA") {
        if(data.quality != null){
            try{
                let address = await getAddress(data.lat.toFixed(2), data.lon.toFixed(2));
                console.log(address.Label);
            } catch (e) {
                console.log(e);
            }
        }
    }
});

parser.on("data", data => {
    console.log(data);
}); 
