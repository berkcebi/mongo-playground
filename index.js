const { MongoClient: Client } = require("mongodb");

const url = "mongodb://localhost:27017";
const dbName = "playground";

async function run() {
    let client;
    try {
        client = await Client.connect(url);
    } catch (err) {
        console.error("Connecting to Mongo failed.", err);

        // eslint-disable-next-line no-process-exit, no-magic-numbers
        process.exit(1);
    }

    console.log("Connected to Mongo.");

    try {
        const db = client.db(dbName);
        const collection = db.collection("documents");

        await collection.insert({
            a: 1
        });

        const documents = await collection.find({}).toArray();

        console.log(documents);
    } catch (err) {
        console.error(err);
    }

    await client.close();
}

run();
