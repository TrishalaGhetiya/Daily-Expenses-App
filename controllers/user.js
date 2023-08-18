const User = require('../models/user');

exports.postSignUpUser = (req, res, next) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;

    User.create({
        firstName: firstName,
        lastName: lastName,
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

exports.postLoginUser = async (req, res, next) => {
    try{
        const user = await User.findOne({ where: { email: req.body.email } });
        if(user!=null){
            if(user.password === req.body.pass){
                res.json({message: 'User logged in successfully'});
            }
            else{
                res.status(401).json({ error: "password doesn't match" });
            }
        }
        else{
            res.status(400).json({ error: "User doesn't exist" });
        }
    }
    catch(err){
        console.log(err);
        res.json(err);
    }
}

