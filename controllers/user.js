const User = require('../models/user');

exports.postSignUpUser = (req, res, next) => {
    const userName = req.body.userName;
    const email = req.body.email;
    const password = req.body.password;

    User.create({
        userName: userName,
        email: email,
        password: password
    })
    .then(result => {
        console.log('user signed up');
        res.json(result);
    })
    .catch(err => console.log(err));
}

