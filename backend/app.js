const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth.routes');
const morgan = require('morgan');

dotenv.config();

const app = express();

app.use(express.json());
app.use(morgan('dev'));

app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('Auth Service is running 🚀');
});

module.exports = app;
