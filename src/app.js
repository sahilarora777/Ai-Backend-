const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth.routes');
const jobRoutes = require('./routes/job.routes');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);

app.get('/', (req, res) => {
    res.send('Ai Resume Backend is Running ');
});

module.exports =  app;

