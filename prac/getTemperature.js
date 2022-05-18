//npm i crypto-js
//nmp i @iota/client

async function getFromIORA() {
    const { ClientBuilder } = require('@iota/client');

    // client will connect to testnet by default
    const client = new ClientBuilder().build();

    // get message data by message id
    const messageId = "d959aea8cd067206ffc3546e1d54d79a125448bbe5c81fcee17ba1f4586cc128";
    const message_data = await client.getMessage().data(messageId);
    console.log(message_data);
    return Buffer.from(message_data.message.payload.data, 'hex').toString('utf8');

}

async function run() {
    const CryptoJS = require('crypto-js');
    var data=await getFromIORA();
    //decrypt
    var key='PruebaPracticasUA';
    var data = CryptoJS.AES.decrypt(data,key).toString(CryptoJS.enc.Utf8);
    //string to json
    var data = JSON.parse(data);
    console.log(data);
}

run();