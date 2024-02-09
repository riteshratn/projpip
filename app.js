const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


const userRoutes = require('./routes/userRoutes');
const projectRoutes = require('./routes/projectRoutes');
const taskRoutes = require('./routes/taskRoutes');

const dotenv = require('dotenv').config();

const { requestLogger, errorLogger } = require('./logger');
const app = express();

mongoose.connect(process.env.CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.json());

app.use('/api',userRoutes);
app.use('/api',projectRoutes);
app.use('/api',taskRoutes);

app.use((req, res, next) => {
  const logMessage = `${req.method} ${req.url}`;
  requestLogger.info(logMessage);
  next();
});


app.use((err, req, res, next) => {
  errorLogger.error(err.message);
});

app.listen(2000, () => {
  console.log('Server is running on port 2000');
});
