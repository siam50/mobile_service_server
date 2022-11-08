const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const { query } = require('express');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

// midleware
app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.1obyivv.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
    try {
        const serviceCollection = client.db('mobileService').collection('services');

        app.get('/services', async (req, res) => {
            const nmbr = parseInt(req.query.nmbr)
            const query = {};
            const cursor = serviceCollection.find(query);
            const services = await cursor.limit(nmbr).toArray();
            res.send(services);
        });

        app.get('/services/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const service = await serviceCollection.findOne(query);
            res.send(service);
        });
    }
    finally {

    }
}
run().catch(err => console.log(err));

app.get('/', (req, res) => {
    res.send('mobile service server is running');
})

app.listen(port, () => {
    console.log(`server running on: ${port}`);
})