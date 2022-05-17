async function run() {
    const { ClientBuilder } = require('@iota/client');

    // client will connect to testnet by default
    const client = new ClientBuilder().build();

    // get message data by message id
    const messageId = "38e8393cd345608b7124f7a41cd09e109244e1aaae4a665ad8eaf592cce4c75b";
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