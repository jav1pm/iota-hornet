async function run() {
    const { ClientBuilder } = require('@iota/client');

    // client will connect to testnet by default
    const client = new ClientBuilder().build();

    // get message data by message id
    const messageId = "d959aea8cd067206ffc3546e1d54d79a125448bbe5c81fcee17ba1f4586cc128";
    const message_data = await client.getMessage().data(messageId);
    const message_metadata = await client.getMessage().metadata(messageId);
    console.log(message_metadata);
    console.log(message_data);

    // get indexation data by index
    const message_ids = await client.getMessage().index("PruebaPracticasUA");
    for (message_id of message_ids) {
        const message_wrapper = await client.getMessage().data(message_id)
        console.log(Buffer.from(message_wrapper.message.payload.data, 'hex').toString('utf8'));
    }
}

run()
    .then(() => console.log("Done"))
    .catch((err) => console.error(err));