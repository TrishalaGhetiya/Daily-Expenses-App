const User = require('../models/user');

exports.getLeaderBoard = async (req, res, next) => {
    try{
        const leaderBoardDetails = await User.find()
        .select("firstName total_Expense")
        .sort({total_Expense: 'desc'})
        
        res.status(200).json(leaderBoardDetails);
    }
    catch(err){
        console.log(err);
        res.status(500).json({message: 'Something went wrong', success: false});
    }
}