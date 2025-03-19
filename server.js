const app = require('./src/app');

const connectDB = require('./src/config/db');

const PORT = process.env.PORT || 5001;
require('dotenv').config();

connectDB();

app.listen(PORT, () => {
console.log(`Server is running on port ${PORT}`);
})