const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
require('dotenv').config();
const morgan = require('morgan');

const sequelize = require('./utils/database');
const User = require('./models/user');
const Expense = require('./models/expense');
const Order = require('./models/order');
const FPR = require('./models/forgot-password-requests');

const app = express();

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'});

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

Expense.belongsTo(User);
User.hasMany(Expense);

User.hasMany(Order);
Order.belongsTo(User);

FPR.belongsTo(User);
User.hasMany(FPR);


sequelize
    .sync()
    .then(result => {
        app.listen(process.env.PORT || 3000);
    })
    .catch(err => console.log(err));