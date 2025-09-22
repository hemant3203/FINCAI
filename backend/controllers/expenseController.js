const xlsx=require('xlsx');
const Expense=require('../models/Expense');


// Add Expense for item
exports.addExpense = async (req, res) => {
    const userId=req.user.id;

    try{
        const {icon,category,amount,date}=req.body;

        // Validate input
        if(!category || !amount || !date){
            return res.status(400).json({message:"Please fill the data"});
        }

        const newExpense=new Expense({
            userId,
            icon,
            category,
            amount,
            date:new Date(date)
        });
        await newExpense.save();
        res.status(201).json({message:"Expense source added successfully",expense:newExpense});
    }
    catch(error){
        console.error("Error adding Expense source:",error);
        res.status(500).json({message:"Server Error"});
    }
}

// Get all Expense sources for a user
exports.getAllExpense = async (req, res) => {
    const userId=req.user.id;
    try{
        const expense=await Expense.find({userId}).sort({date:-1});
        res.status(200).json({expense});
    } catch(error){
        console.error("Error fetching income sources:",error);
        res.status(500).json({message:"Server Error"});
    }
}

// Delete an expense source by ID
exports.deleteExpense = async (req, res) => {
    // const userId=req.user.id;

    try{
        await Expense.findByIdAndDelete(req.params.id);
        res.json({message:"Expense source deleted successfully"});

    }
    catch(error){
        console.error("Error deleting income source:",error);
        res.status(500).json({message:"Server Error"});
    }
}

// Download income data as an Excel file
exports.downloadExpenseExcel = async (req, res) => {
    const userId=req.user.id;
    try{
        const expense=await Expense.find({userId}).sort({date:-1});

        // Convert income data to a format suitable for Excel
        const data=expense.map((item)=>({
            category:item.category,
            Amount:item.amount,
            Date:item.date
        }));

        // Create a new workbook and add the data
        const workbook=xlsx.utils.book_new();
        const worksheet=xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(workbook,worksheet,"Expense");
        xlsx.writeFile(workbook,"Expense_Details.xlsx");
        res.download("Expense_Details.xlsx");
    }
    catch(error){
        console.error("Error downloading income data:",error);
        res.status(500).json({message:"Server Error"});
    }
}