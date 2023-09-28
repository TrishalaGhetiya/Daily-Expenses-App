const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

//Generate encrypted token to send to frontend
function generateToken(id, isPremium){
    return jwt.sign({userId: id, isPremium: isPremium}, process.env.JWT_SECRET_KEY);
}

//Sign up user
exports.postSignUpUser = async (req, res, next) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;
    try{
        bcrypt.hash(password, 5, async (err, hash) => {
            if(err){
                throw new Error(err);
            }
            else{
                const user = new User({
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    password: hash,
                    isPremium: false,
                    total_Expense: 0
                })
                user.save();
                console.log('User added');
                return res.status(200).json({message: 'successfully created new user'});
                
            }
        }) 
    }
    catch(err){
        console.log(err);
        return res.status(403).json({message: 'Something went wrong'});
    }
}

//Login User
exports.postLoginUser = async (req, res, next) => {
    try{
        const user = await User.findOne({ email: req.body.email });
        if(user!=null){
            bcrypt.compare(req.body.pass, user.password, async (err, result) => {
                if(err){
                    throw new err;
                }
                if(result === true){
                   res.json({message: 'User logged in successfully', token: generateToken(user.id, user.isPremium)});
                }
                else{
                    res.status(401).json({ error: "password doesn't match" });
                }
            })
        }
        else{
            res.status(400).json({ error: "User doesn't exist" });
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json(err);
    }
}

