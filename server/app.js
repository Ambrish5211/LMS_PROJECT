import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import connectToDb from './config/db.js';
import {config} from 'dotenv';
config();
import userRoutes from './routes/user.routes.js'
import errorMiddleware from './middlewares/error.middlewares.js'
import morgan from 'morgan';

const app = express();
app.use(morgan('dev'));

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

export default app;