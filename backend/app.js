import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';


import authRoutes from './routes/authRoutes.js';
import blogRoutes from './routes/blogRoutes.js';
import commentRoutes from './routes/commentRoutes.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// i want to add cors


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/auth', authRoutes);
app.use('/api', blogRoutes);
app.use('/api', commentRoutes);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
      message: err.message,
      statusCode
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
