require('dotenv').config();

async function run() {
    const { ClientBuilder } = require('@iota/client');

    // Get the seed from environment variable
    const IOTA_SEED_SECRET = process.env.IOTA_SEED_SECRET;

    // client will connect to testnet by default
    const client = new ClientBuilder().build();

    // Get the balance of a single known address
    console.log(
        await client.getAddressBalance('atoi1qzedp377537deqv27sgy8r02ac8k9d2kqmzj6vt6aql2p8wrzkuxgxprt4d')
    );

    // Get the balance of addresses from an account
    const balance = await client.getBalance(IOTA_SEED_SECRET)
        .accountIndex(0)
        .initialAddressIndex(0)
        .get();

    console.log("Account balance: " + balance);
}

run()
    .then(() => console.log("Done"))
    .catch((err) => console.error(err));