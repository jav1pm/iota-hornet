async function run() {
    const { ClientBuilder } = require('@iota/client');

    // client will connect to testnet by default
    const client = new ClientBuilder().build();

    const message = await client.message()
        .index('PracticasUA')
        .data('¡Hola Mundo!')
        .submit();
    
    console.log(message);
}

run()
    .then(() => console.log("Done"))
    .catch((err) => console.error(err));