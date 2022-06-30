require('dotenv').config();

async function run() {
    const { ClientBuilder } = require('@iota/client');
    const hornet_node = process.env.CUSTOM_NODE;

    // client will connect to custom node
    const client = new ClientBuilder()
        .node(hornet_node) // custom node
        .localPow(true) // pow is done locally
        .build();

    const message = await client.message()
        .index('PracticasUA')
        .data('¡Hola Mundo!')
        .submit();
    
    console.log(message);
}

run()
    .then(() => console.log("Done"))
    .catch((err) => console.error(err));