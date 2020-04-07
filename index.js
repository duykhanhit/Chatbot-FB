'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const app = express().use(bodyParser.json());
const dotenv = require('dotenv');

const connectDB = require('./config/db');

connectDB();
app.use(bodyParser.urlencoded({ extended: true }));

const webhookRoute = require('./routes/webhook.router');
const dashboardRoute = require('./routes/dashboard.router');

dotenv.config();

app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/chinhsach', (req, res) => {
  res.send("Chính sách đang cập nhật");
});

app.use('/webhook', webhookRoute);
app.use('/dashboard', dashboardRoute);


app.listen(
  process.env.PORT || 3000,
  () => console.log(`Server running at port ${process.env.PORT}`)
);
