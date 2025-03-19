const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth.routes');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);

app.get('/', (req, res) => {
    res.send('Ai Resume Backend is Running ');
});

module.exports =  app;

