import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from "dotenv"

import postRoutes from './routes/posts.js';
import userRouter from "./routes/user.js";

const app = express();

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());

app.use('/posts', postRoutes);
app.use("/user", userRouter);

// app.get('/'), (req, res) => {(
//   res.send('Hello to memories API')
// )};

dotenv.config();//This is the missing pease for dotenv file use

const CONNECTION_URL =  process.env.REACT_APP_CONNECTION_URL
// //process.env.MONGODB_URI
const PORT =  process.env.PORT || 5000
//process.env.CONNECTION_URL; did not work using react-dotenv
mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: ${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));

mongoose.set('useFindAndModify', false);