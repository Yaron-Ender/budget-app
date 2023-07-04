import { Link, useLoaderData } from "react-router-dom";
import { UseLocalStorage } from "../hooks/useLocalStorage";
import Intro from "../component/Intro";
import AddBudgetForm from "../component/AddBudgetForm";
import AddExpenseForm from "../component/AddExpenseForm";
import BudgetItem from "../component/BudgetItem";
import Table from "../component/Table";
//libary import
import { toast } from "react-toastify";

const Dashboard = () => {
const { userName,budgets,expenses } = useLoaderData();
return (
  <>
    {userName ? (
     <div className="dashboard">
    <h1>
      Welcome back, <span className="accent">{userName}</span>
    </h1>
    <div className="grid-sm">
    {budgets && budgets.length > 0 ? (
    <div className="grid-lg">
    <div className="flex-lg">
    <AddBudgetForm />
    <AddExpenseForm budgets={budgets} />
    </div>
      <h2>Existing Budgets</h2>
      <div className="budgets">
      {
      budgets.map((budget) => (
        <BudgetItem key={budget.id} budget={budget} />
        ))
      }
      </div>
      {expenses&&expenses.length>0&&(
      <div className="grid-md">
      <h2>Recent Expenses</h2>
      <Table expenses={expenses.sort((a,b)=>b.createdAt-a.createdAt ).slice(0,8)}/>
      {expenses.length>8&&
      <Link to='expenses' className="btn btn--dark">View all expenses</Link>
      }
      </div>
      )
      }
    </div>
      ) : 
      (
        <div className="grid-sm">
          <p>Personal budgeting is the secret to financial freedom.</p>
          <p>Create a budget to get started!</p>
          <AddBudgetForm />
        </div>
          )}
        </div>
      </div>
    ) : (
      <Intro />
    )}
  </>
);
};
export default Dashboard;
//dashboard loader
export const dashboardLoader = ()=>{
const { FetchData } = UseLocalStorage();
const userName = FetchData("userName");
const budgets = FetchData("budgets");
const expenses = FetchData("expenses")
    return { userName,budgets,expenses }
}
//dashboard actions
export async function dashboardAction({request}){
  const { createExpense,waait,createBudget,deleteItem } =UseLocalStorage();
  const data = await request.formData();
  const {_action,...values} = Object.fromEntries(data)
  // console.log(Object.fromEntries(data));
  await waait();
  // new user submission
if(_action==='newUser'){
  try{
    localStorage.setItem('userName',JSON.stringify(values.userName))
    return toast.success(`welcome,${values.userName}`)
  }
  catch(e){
    throw new Error("there was a problem creating your acount")
  }
}
if (_action === "createBudget") {
  createBudget({name:values.newBudget, amount:values.newBudgetAmount});
    try {
    return toast.success("budget was created");
  } catch (e) {
    throw new Error("There was a problem creating your budget.");
  }
}
if (_action === "createExpense") {
  try {
     createExpense({
       name: values.newExpense,
       amount: values.newExpenseAmount,
       budgetId: values.newExpenseBudget,
     });
    return toast.success(`Expense ${values.newExpense} was created`);
  } catch (e) {
    throw new Error("There was a problem creating your Expense.");
  }
}
if (_action === "deleteExpense") {

  try {
    deleteItem({
      key: "expenses",
      id: values.expenseId,
    });
    return toast.success(`Expense ${values.newExpense} was created`);
  } catch (e) {
    throw new Error("There was a problem creating your Expense.");
  }
}

}

