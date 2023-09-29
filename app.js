const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
require('dotenv').config();
const morgan = require('morgan');
const mongoose = require('mongoose');

const app = express();

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'});

app.use(express.static(path.join(__dirname, 'public')));
app.use(helmet());
app.use(morgan('combined', {stream: accessLogStream}));
app.use(cors());

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const errorController = require('./controllers/error');
const userRoutes = require('./routes/user');
const expenseRoutes = require('./routes/expense');
const purchaseRoutes = require('./routes/purchase');
const premiumRoutes = require('./routes/premium');
const passwordRoutes = require('./routes/password');

app.use(premiumRoutes);
app.use(expenseRoutes);
app.use(userRoutes);
app.use(purchaseRoutes);
app.use(passwordRoutes);
app.use(errorController.get404);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log('database connected');
    app.listen(3000);
  })
