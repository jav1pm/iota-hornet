require('dotenv').config();

async function run() {
    const {
        ClientBuilder
    } = require('@iota/client');

    // Get the seed from environment variable
    const IOTA_SEED_SECRET = process.env.IOTA_SEED_SECRET;

    // client will connect to testnet by default
    const client = new ClientBuilder().build();

    const message = await client.message()
        .seed(IOTA_SEED_SECRET)
        // get tokens --> https://faucet.chrysalis-devnet.iota.cafe/
        // if dust is not allowed --> min 1Mi
        .output('atoi1qzrsnzh6nj28824u9kslxcu0jjtr8nndx3wz0cvhhpqtkyp5qjwestg36r3', 1000000)
        .submit();

    console.log(message);
}

run()
    .then(() => console.log("Done"))
    .catch((err) => console.error(err));