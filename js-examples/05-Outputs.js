async function run() {
    const { ClientBuilder } = require('@iota/client');

    // client will connect to testnet by default
    const client = new ClientBuilder().build();

    const outputs = await client.getAddressOutputs('atoi1qp9427varyc05py79ajku89xarfgkj74tpel5egr9y7xu3wpfc4lkpx0l86');
    console.log("AddressOutputs = \n", outputs);

    const output = await client.getOutput('62c2941ece85b50f03ec36c0f59622ef86f9a2f41ffb9e34f73cb684cee18e5b0100');
    console.log("Output info = \n",output);

    const findOutputs = await client.findOutputs(outputIds = [], addresses = ["atoi1qp9427varyc05py79ajku89xarfgkj74tpel5egr9y7xu3wpfc4lkpx0l86"]);
    console.log(findOutputs);
}

run()
    .then(() => console.log("Done"))
    .catch((err) => console.error(err));