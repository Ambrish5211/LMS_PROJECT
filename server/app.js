const express = require('express');
const cookieParser = require('cookie-parser')
const cors = require('cors');
const connectToDb = require('./config/db');
require("dotenv").config();
const userRoutes = require('./routes/user.routes')
const errorMiddleware = require('./middlewares/error.middlewares')

const app = express();

connectToDb()

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use('/ping', (req, res) => {
  res.send('Pong');
})

// 3 route config
app.use('/api/v1/user', userRoutes);

app.all('*',(req, res)=>{
  res.status(404).send('OOPS!! 404 page not found');
})

app.use(errorMiddleware);

module.exports = app;