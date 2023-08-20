const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.authenticate = async (req, res, next) => {
    try{
        const token = req.header('authorization');
        //console.log(token);
        const authUser = jwt.verify(token, 'Trishala');
        const user = await User.findByPk(authUser.userId);
        //console.log(user.id);
        req.user = user;
        next();
    }
    catch(err){
        console.log(err);
    }
}