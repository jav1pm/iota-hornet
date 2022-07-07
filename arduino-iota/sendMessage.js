/**
 * Muestra información sobre el nodo conectado
 * y envia los datos encriptados proceedentes 
 * del código del arduino al Tangle dado un índice determinado.
 * 
 * $ npm run send
**/

const { ClientBuilder } = require('@iota/client');
const { SerialPort, ReadlineParser } = require('serialport');
const CryptoJS = require("crypto-js");
const moment = require('moment');

// importar variables de entorno
const {CUSTOM_NODE, IOTA_SEED_SECRET, SERIAL_PORT_ARDUINO, INDEX_MESSAGE} = process.env;

const client = new ClientBuilder().node(CUSTOM_NODE).build();

// info del nodo
client.getInfo().then(console.log).catch(console.error);

// serial port conexion arduino
const serial = new SerialPort({
    baudRate: 9600,
    autoOpen: true,
    path: SERIAL_PORT_ARDUINO
});

// parsear para leer los datos del arduino
const parser = serial.pipe(new ReadlineParser({ delimiter: '\r\n' }));

// Publicar al Tangle
const publish = async (message) => {
    const stringPayload = JSON.stringify(message);

    // Encriptar mensaje segun la longitud de la clave
    const encryptData = CryptoJS.AES.encrypt(
        stringPayload,
        IOTA_SEED_SECRET
    ).toString();

    const messageSender = client.message();

    const messageId = await messageSender.index(INDEX_MESSAGE)
                            .data(encryptData)
                            .submit();
    console.log('Message ID: ', messageId);
};

// Eventos serial port
serial.on('open', showPortOpen);
parser.on('data', readSerialData);
serial.on('close', showPortClosed);
serial.on('error', showError);

// callback functions
function showPortOpen() {
    console.log('port open. Data rate: ' + serial.baudRate + '\n');
}

async function readSerialData(data) {
    console.log('reading serial data...');

    let json = {};

    const time = moment().locale('es').format('DD/MM/YYYY HH:mm:ss');
    json['fechaHora'] = time;
    json['temperatura'] = data.split(',')[0].split(':')[1].trim();
    json['humedad'] = data.split(',')[1].split(':')[1].trim();

    publish(json);
    console.log('published message: ', json);
}

function showPortClosed() {
    console.log('port closed.');
}

function showError(error) {
    console.log('Serial port error: ', error + '\n');
}