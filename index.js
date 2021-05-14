require('dotenv').config({path: __dirname + '/.env'})
const express = require('express')
const app = express()
const port = process.env.WEBPORT

const transactions = require('./database.js')

app.use(express.json())
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'https://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
    next();
});

app.get('/', (req, res) => {
    let query = "SELECT * FROM individual_contributions WHERE cmte_id = 'C00401224' AND state = 'AK' AND memo_text LIKE '%C00703975%';"
    transactions.getTransactions(`${query}`)
    .then(response => {
    res.status(200).send(response);
    })
    .catch(error => {
    res.status(500).send(error);
    })
})

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})