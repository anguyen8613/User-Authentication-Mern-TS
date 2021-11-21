import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import config from './config/config';

const app = express();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));

//use json middleware to parse the text to json
app.use(express.json());

//use cookie-parser middleware. if there are cookies, cookie-parser will parse the cookie into the req.cookies object
app.use(cookieParser());

app.use(
  cors({
    origin: [
      'http://localhost:3000',
      'https://user-authentication-mern-ts.vercel.app',
    ],
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
    credentials: true,
  })
);

mongoose
  .connect(config.mongo.url, config.mongo.options)
  .then((result) => {
    console.log('Connected to Mongo DB');
  })
  .catch((error) => {
    console.log(error);
  });

//set up routers
app.use('/user', require('./routes/userRouter'));
app.use('/customer', require('./routes/customerRouter'));
