require('dotenv').config();

async function run() {
    const { ClientBuilder } = require('@iota/client');
    const hornet_node = process.env.CUSTOM_NODE;

    // client will connect to custom node
    const client = new ClientBuilder()
        .node(hornet_node) // custom node
        .localPow(true) // pow is done locally
        .build();

    // get message data by message id
    const messageId = "0d5d93ce9327fdf748a1b729724e4c330f0757d5e6f0178e68833cf7bb16a489";
    const message_data = await client.getMessage().data(messageId);
    const message_metadata = await client.getMessage().metadata(messageId);
    console.log(message_metadata);
    console.log(message_data);

    // get indexation data by index
    const message_ids = await client.getMessage().index("PracticasUA");
    for (message_id of message_ids) {
        const message_wrapper = await client.getMessage().data(message_id)
        console.log(Buffer.from(message_wrapper.message.payload.data, 'hex').toString('utf8'));
    }
}

run()
    .then(() => console.log("Done"))
    .catch((err) => console.error(err));