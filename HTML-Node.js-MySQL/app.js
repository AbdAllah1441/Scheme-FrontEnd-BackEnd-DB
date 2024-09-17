const express = require('express');
const path = require('path');
const mysql = require('mysql2/promise');

const app = express();

app.use(express.json())
app.use("/", express.static(path.join(__dirname, 'public')));

const pool = mysql.createPool({
    host: "127.0.0.1",
    user: "root",
    password: "Amostafa!257259",
    database: "football"
});

app.get('/getData', async (req, res) => {
    try {
        const [result] = await pool.query("SELECT * FROM players");
        res.json({ message: result }); // Send the query result as JSON
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/postData', async (req, res) => {
    try {
        const data = req.body;
        // Process the data as needed
        console.log('Received POST data:', data);

        // For demonstration, just echoing back the received data
        res.json({ receivedData: data });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(3000, () => {
    console.log("Listening on port 3000");
});
