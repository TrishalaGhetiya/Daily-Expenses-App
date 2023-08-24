const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sequelize = require('./util/database');

const User = require('./models/user');
const Expense = require('./models/expense');
const Order = require('./models/order');
const FPR = require('./models/forgotPasswordRequests');

const app = express();

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

Expense.belongsTo(User, {constraints: true, onDelete: 'CASCADE'});
User.hasMany(Expense);

User.hasMany(Order);
Order.belongsTo(User);

FPR.belongsTo(User);
User.hasMany(FPR);


sequelize
    .sync()
    .then(result => {
        app.listen(3000);
    })
    .catch(err => console.log(err));