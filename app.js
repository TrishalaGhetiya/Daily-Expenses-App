const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sequelize = require('./util/database');

const app = express();

app.use(cors());

app.use(bodyParser.json());

const errorController = require('./controllers/error');
const userRoutes = require('./routes/user');
const expenseRoutes = require('./routes/expense');

app.use(expenseRoutes);
app.use(userRoutes);
app.use(errorController.get404);

sequelize
    .sync()
    .then(result => {
        app.listen(3000);
    })
    .catch(err => console.log(err));