const xlsx=require('xlsx');
const Income=require('../models/Income');


// Add income  source
exports.addIncome = async (req, res) => {
    const userId=req.user.id;

    try{
        const {icon,source,amount,date}=req.body;

        // Validate input
        if(!source || !amount || !date){
            return res.status(400).json({message:"Please fill the data"});
        }

        const newIncome=new Income({
            userId,
            icon,
            source,
            amount,
            date:new Date(date)
        });
        await newIncome.save();
        res.status(201).json({message:"Income source added successfully",income:newIncome});
    }
    catch(error){
        console.error("Error adding income source:",error);
        res.status(500).json({message:"Server Error"});
    }
}

// Get all income sources for a user
exports.getAllIncome = async (req, res) => {
    const userId=req.user.id;
    try{
        const incomes=await Income.find({userId}).sort({date:-1});
        res.status(200).json({incomes});
    } catch(error){
        console.error("Error fetching income sources:",error);
        res.status(500).json({message:"Server Error"});
    }
}

// Delete an income source by ID
exports.deleteIncome = async (req, res) => {
    // const userId=req.user.id;

    try{
        await Income.findByIdAndDelete(req.params.id);
        res.json({message:"Income source deleted successfully"});

    }
    catch(error){
        console.error("Error deleting income source:",error);
        res.status(500).json({message:"Server Error"});
    }
}

// Download income data as an Excel file
exports.downloadIncomeExcel = async (req, res) => {
    const userId=req.user.id;
    try{
        const income=await Income.find({userId}).sort({date:-1});

        // Convert income data to a format suitable for Excel
        const data=income.map((item)=>({
            Source:item.source,
            Amount:item.amount,
            Date:item.date
        }));

        // Create a new workbook and add the data
        const workbook=xlsx.utils.book_new();
        const worksheet=xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(workbook,worksheet,"Income");
        xlsx.writeFile(workbook,"Income_Details.xlsx");
        res.download("Income_Details.xlsx");
    }
    catch(error){
        console.error("Error downloading income data:",error);
        res.status(500).json({message:"Server Error"});
    }
}