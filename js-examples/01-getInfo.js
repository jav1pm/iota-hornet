function run() {
    const { ClientBuilder } = require('@iota/client');

    // client will connect to testnet by default
    const client = new ClientBuilder()
        .localPow(true) // Proof-of-work is done locally and not remotely
        .build();

    client.getInfo().then(console.log).catch(console.error);
}

run()