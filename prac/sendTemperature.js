//npm i crypto-js
//nmp i @iota/client


//Enviar dtos al tangle de iota 
async function send2IOTA(index,msg) {
    const { ClientBuilder } = require('@iota/client');

    // client will connect to testnet by default
    const client = new ClientBuilder().build();

    const message = await client.message()
        .index(index)
        .data(msg)
        .submit();
    
    console.log(message);
}

//temperatura random -1 a 20
function getTemoerature() {
    return Math.floor(Math.random() * 20) - 10;
}

//get date year month day hour minute second
function getDate() {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();
    return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
}

// construccion y encriptado del mensaje
function buildPayload() {
    const CryptoJS = require('crypto-js');

    //lave de encriptacion
    var key='PruebaPracticasUA';
    //mensaje
    var payload = {
        "fechaYHora": getDate(),
        "temperatura": getTemoerature(),
    };
    //json to string
    var payload = JSON.stringify(payload);
    console.log(payload);
    //string encryption
    var payload = CryptoJS.AES.encrypt(payload,key).toString();
    console.log(payload);
    return payload;
}
    
    

function run() {
    var index = 'PruebaPracticasUA';
    send2IOTA(index,buildPayload());
}

run();
//send2IOTA(index,msgString);
//await sleep(2000);

   
