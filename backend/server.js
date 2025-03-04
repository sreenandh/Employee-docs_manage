const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();


connectDB(); //MongoDB connection

const app = express();


app.use(cors());

app.use(express.json()); // converts incoming data to json


app.use('/api/auth', require('./routes/auth'));

app.use('/api/documents', require('./routes/documents'));


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
