import React,{useState,useEffect} from 'react'
import { useUserAuth } from '../../hooks/useUserAuth'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import { API_PATH } from '../../utils/apiPaths'
import axiosInstance from '../../utils/axiosInstance'
import ExpenseOverview from '../../components/Expense/ExpenseOverview'
import Modal from '../../components/Modal'
import AddExpenseForm from '../../components/Expense/AddExpenseForm'
import { toast } from 'react-hot-toast';



const Expense = () => {
  useUserAuth();

  const [expenseData,setExpenseData]=useState([]);
    const [loading,setLoading]=useState(false);
    const [openDeleteAlert,setOpenDeleteAlert]=useState({
      show:false,
      data:null,
    });
  
    const [OpenAddExpenseModal,setOpenAddExpenseModal]=useState(false)

// get all expense Detail

    const fetchExpenseDetails=async()=>{
  if(loading) return;

  setLoading(true);

  try{
   const response=await axiosInstance.get(
    `${API_PATH.EXPENSE.GET_ALL_EXPENSE}`
   );

   if(response.data){
    setExpenseData(response.data);
   }
  } catch(error){
    console.log("Something Went wrong.Please try again,",error)
  }finally{
    setLoading(false);
  }
};

// Handle Add Expense
const handleAddExpense=async(expense)=>{
  const {category,amount,date,icon}=expense;

  // Validation Checks
  if(!category.trim()){
    toast.error("category is required");
    return;
  }


  if(!amount ||isNaN(amount) ||  Number(amount)<=0){
    toast.error("Amount Should be a valid number greater than 0")
    return ;
  }

  if(!date){
    toast.error("Date is Required.");
    return;
  }

  try{
    await axiosInstance.post(API_PATH.EXPENSE.ADD_EXPENSE,{
      category,
      amount,
      date,
      icon,
    });
   
    setOpenAddExpenseModal(false);
    toast.success("Expense added Successfully ");
    fetchExpenseDetails();
  }
  catch(error){
    console.error(
      "Error adding Expense:",
      error.response?.data?.message || error.message
    );
  }
};


// delete Expense
const deleteExpense=async(id)=>{
try{
  await axiosInstance.delete(API_PATH.EXPENSE.DELETE_EXPENSE(id));

  setOpenDeleteAlert({show:false,data:null});
  toast.success("Expense details deleted Successfully");
  fetchExpenseDetails();
}
catch(error){
  console.error(
    "Error deleting Expense:",
    error.response?.data?.message|| error.message
  );
}
};

// handle to download expense details
const handleDownloadExpenseDetails=async()=>{};


useEffect(() => {
  fetchExpenseDetails()

  return () => {}
}, []);


  return (
    <DashboardLayout activeMenu="Expense">
      <div className="my-5 mx-auto">
        <div className='grid grid-cols-1 gap-6'>
          <div className=''>
          <ExpenseOverview
          transactions={expenseData}
          onExpenseIncome={()=> setOpenAddExpenseModal(true)}
          />
          </div>

          <ExpenseList
          transaction={expenseData}
          onDelete={(id)=>{
            setOpenDeleteAlert({show:true,data:id});
          }}

          onDownload={handleDownloadExpenseDetails}
          />


        </div>

      <Modal
      isOpen={OpenAddExpenseModal}
      onClose={()=>setOpenAddExpenseModal(false)}
      title="Add Expense"
      >
        <AddExpenseForm onAddExpense={handleAddExpense}/>
      </Modal>


      </div>
    </DashboardLayout>
  )
}

export default Expense