const Expense = require('../models/expense');
const User = require('../models/user');
const sequelize = require('../util/database');
const AWS = require('aws-sdk');
require('dotenv').config();

//Get expenses when page is loaded
exports.getAddExpenses = async (req, res, next) => {
    try{
        // const leaderBoardDetails = await User.findAll({
        //     attributes: ['id', 'firstName', [sequelize.fn('sum', sequelize.col('expenses.amount')), 'total_amount']],
        //     include: [{
        //         model: Expense,
        //         attributes: []
        //     }],
        //     group: ['user.id'],
        //     order: [['total_amount', 'DESC']]
        // })
        // const expenses = await Expense.findAll({ 
        //     where: {userId: req.user.id }
        // });
        // console.log('expenses send');
        // res.json(expenses);
        const expenses = await Expense.findAll({ 
            where: {userId: req.user.id },
            attributes: ['id', 'amount', 'description', 'category'],
            include: [{
                model: User,
                attributes: ['total_Expense']
            }]
        });
        console.log('expenses send');
        res.json(expenses);
    }
    catch(err){
        console.log(err);
    }
}

//Add expenses to the database
exports.postAddExpenses = async (req, res, next) => {
    const t = await sequelize.transaction();
    try{
        const amount = req.body.amount;
        const description = req.body.description;
        const category = req.body.category;
        const userId = req.user.id;
        const updatedAmount = req.user.total_Expense + +amount;

        const expense = await Expense.create({
            amount: amount,
            description: description,
            category: category,
            userId: userId
        }, { transaction: t })

        const result = await req.user.update({
            total_Expense: updatedAmount
        }, { transaction: t })

        await t.commit();
        console.log('expense added');
        res.json(result);
    }
    catch(err){
        await t.rollback();
        console.log(err);
    }
}

//delete expense
exports.deleteExpense = async (req, res, next) => {
    const t = await sequelize.transaction();
    try{
        const expenseId = req.params.id;
        const updatedAmount = req.user.total_Expense - req.body.amount;

        const expense = await Expense.findByPk(expenseId);
       
        const updatedUser = await User.update({total_Expense: updatedAmount}, { where: {id: expense.userId}}, {transaction: t})

        const deletedExpense = await expense.destroy({ transaction: t });

        await t.commit();

        console.log('expense deleted');
        res.status(200).json({message: 'expense deleted successfully'});
    }
    catch(err){
        await t.rollback();
        console.log(err);
    }
}

exports.downloadExpenses = async (req, res, next) => {
    try{
        const expenses = await req.user.getExpenses();
        const stringifiedExpenses = JSON.stringify(expenses);
        const filename = `Expense${req.user.id}/${new Date()}.txt`;
        const fileURL = await uploadToS3(stringifiedExpenses, filename);
        console.log(fileURL);
        res.status(200).json({fileURL, success: true});
    }
    catch(err){
        console.log(err);
    }
}

async function uploadToS3(data, filename){
    try{
        let s3bucket = new AWS.S3({
            accessKeyId: process.env.IAM_USER_KEY,
            secretAccessKey: process.env.IAM_USER_SECRET
        })

        var params = {
            Bucket: process.env.BUCKET_NAME,
            Key: filename,
            Body: data,
            ACL: 'public-read'
        }

        return new Promise((resolve, reject) => {
            s3bucket.upload(params, (err, resdata) => {
                if(err){
                    console.log(err);
                    reject(err);
                }
                else{
                    console.log('success');
                    resolve(resdata.Location);
                }
            });
        })
        
        
    }
    catch(err){
        console.log(err);
    }
}