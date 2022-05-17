require('dotenv').config();

function run() {
    const { ClientBuilder } = require('@iota/client');
    const hornet_node = process.env.CUSTOM_NODE;

    // client will connect to my custom node
    const client = new ClientBuilder()
        .node(hornet_node) // custom node
        .localPow(true) // pow is done locally
        .build();

    client.getInfo().then(console.log).catch(console.error);
}

run()