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
        res.json({message: 'successfully created new user'});
        console.log('User added');
    })
    .catch(err => {
        res.status(403).json(err);
    });
}

