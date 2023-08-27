const User = require('../models/user');

exports.getLeaderBoard = async (req, res, next) => {
    try{
        const leaderBoardDetails = await User.findAll({
            attributes: ['firstName', 'total_Expense'],
            order: [['total_Expense', 'DESC']]
        })
        res.status(200).json(leaderBoardDetails);
    }
    catch(err){
        console.log(err);
        res.status(500).json({message: 'Something went wrong', success: false});
    }
}