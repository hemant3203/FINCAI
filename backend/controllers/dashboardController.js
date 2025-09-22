const Income=require('../models/Income');
const Expense=require('../models/Expense');

const {isValidObjectId,Types}=require('mongoose');

// dashboard data
exports.getDashboardData=async(req,res)=>{
    try{
        const userId=req.user.id;
        const userObjectId=new Types.ObjectId(String(userId));

        // fetch total income and expenses
        const totalIncome=await Income.aggregate([
            {$match:{userId:userObjectId}},
            {$group:{_id:null,total:{$sum:"$amount"}}}
        ]);

        // console.log("totalIncome:",{totalIncome,userId:isValidObjectId(userId)});
        
        const totalExpense=await Expense.aggregate([
            {$match:{userId:userObjectId}},
            {$group:{_id:null,total:{$sum:"$amount"}}}
        ]);

        // Get income transaction in the last 60days
        const last60DaysIncomeTranscations=await Income.find({
            userId:userId,
            date:{$gte:new Date(Date.now()-60*24*60*60*1000)}
        }).sort({date:-1});


        // get total income for last 60 days
        const incomeLast60Days=last60DaysIncomeTranscations.reduce(
            (sum,transaction)=>sum+transaction.amount,0
        );

        // Get expense transaction in the last 30days
        const last30DaysExpenseTranscations=await Expense.find({
            userId:userId,
            date:{$gte:new Date(Date.now()-30*24*60*60*1000)}
        }).sort({date:-1});

        // get total expense for last 30 days
        const expenseLast30Days=last30DaysExpenseTranscations.reduce(
            (sum,transaction)=>sum+transaction.amount,0
        );

        // fetch last 5 income and expense transactions
        const lastTransaction=[
            ...(await Income.find({userId}).sort({date:-1}).limit(5)).map(
                (txn)=>({
                    ...txn.toObject(),
                    type:"income",
                })
            ),
            ...(await Expense.find({userId}).sort({date:-1}).limit(5)).map(
                (txn)=>({
                    ...txn.toObject(),
                    type:"expense",
                })
            ),
        ].sort((a,b)=>b.date-a.date); //lastest data first

        // final response

        res.json({
            totalBalance:
            (totalIncome[0]?.total || 0) - (totalExpense[0]?.total || 0),
            totalIncome:totalIncome[0]?.total || 0,
            totalExpense:totalExpense[0]?.total || 0,
            last30DaysExpense:{
                total:expenseLast30Days,
                transactions:last30DaysExpenseTranscations,
            },
            last60DaysIncome:{
                total:incomeLast60Days,
                transactions:last60DaysIncomeTranscations,
            },
             recentTransaction: lastTransaction,
        });
            }
            catch(error){
                res.status(500).json({message:"Server Error",error});

            }

    }