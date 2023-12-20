import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import connectToDb from './config/db.js';
import {config} from 'dotenv';
config();
import userRoutes from './routes/user.routes.js'
import courseRoutes from './routes/course.routes.js'
import contactRoutes from './routes/contact.routes.js'
import errorMiddleware from './middlewares/error.middlewares.js'
import morgan from 'morgan';

const app = express();
app.use(cors({
   origin: ['http://localhost:5173'],
   credentials:true
}));

app.use(morgan('dev'));

connectToDb()

app.use(express.json());
app.use(cookieParser());

app.use('/ping', (req, res) => {
  res.send('Pong');
})
app.use('/api/v1/courses', courseRoutes);
// 3 route config
app.use('/api/v1/user', userRoutes);
app.use('/api/v1', contactRoutes);


app.all('*',(req, res)=>{
  res.status(404).send('OOPS!! 404 page not found');
})

app.use(errorMiddleware);

export default app;