const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

// midleware
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('mobile service server is running');
})

app.listen(port, () => {
    console.log(`server running on: ${port}`)
})