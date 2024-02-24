const { MongoClient } = require("mongodb");
                                                                                                                                   
const url = "mongodb+srv://muskan1077gupta:gupta1077@cluster0.xzrilaw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(url);

async function run() {
    try {
        await client.connect();
        console.log("Successfully connected to Atlas");

    } catch (err) {
        console.log(err.stack);
    }
    finally {
        await client.close();
    }
}

run().catch(console.dir);