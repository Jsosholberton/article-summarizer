import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from "./config/db";

import articles from "./routes/articles";
import user from "./routes/user";

dotenv.config();

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use('/articles', articles);
app.use('/user', user);

app.listen(process.env.PORT, () => {
  console.log(`Server running on: ${process.env.PORT}`);
});