const express = require('express')
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

const userRoute = require('./routes/user');

dotenv.config();

mongoose.connect(process.env.DB_CONNECT, {useNewUrlParser: true, useUnifiedTopology: true }, () => console.log('Connected to DB'))

app.use(express.json());
app.use(cors());

app.use('/api/user', userRoute);

app.listen(5000, () => console.log('Server running'));