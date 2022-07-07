/**
 * Muestra información sobre el nodo conectado
 * y desencripta los datos procedentes del nodo parseando
 * todos los mensajes correspondientes al índice indicado.
 * 
 * $ npm run get
**/

const { ClientBuilder } = require("@iota/client");
const CryptoJS = require("crypto-js");

// importar variables de entorno
const {CUSTOM_NODE, IOTA_SEED_SECRET, INDEX_MESSAGE} = process.env;

const client = new ClientBuilder().node(CUSTOM_NODE).build();

// info del nodo
client.getInfo().then(console.log).catch(console.error);

async function getMessageByIndex(index) {
    // obtener todos los mensajes segun el indice dado
    const messages = await client.getMessage().index(index);

    // procesar cada mensaje individualmente
    for (let message of messages) {
        const res = await client.getMessage().data(message);
        const data = Buffer.from(res.message.payload.data, 'hex').toString('utf8');

        // si ha podido desencriptar
        try {
            const bytes = CryptoJS.AES.decrypt(data, IOTA_SEED_SECRET);
            const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
            console.log('Decrypted data: ', decryptedData);
        } catch (err) {
            try {
                // si el formato del mensaje ya está en JSON --> mostrarlo directamente
                console.log('JSON data: ', JSON.parse(data));
            } catch (err) {
                console.log('Error: ', data);
            }
        }
    }
}

getMessageByIndex(INDEX_MESSAGE)
        .then(() => console.log("Done"))
        .catch((err) => console.error(err));