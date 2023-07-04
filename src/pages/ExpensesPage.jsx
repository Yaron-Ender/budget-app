import Table from "../component/Table";
import { UseLocalStorage } from "../hooks/useLocalStorage";
import { useLoaderData } from "react-router-dom";
const ExpensesPage = () => {
const {expenses}=useLoaderData()
    return (
        <div className="grid-lg">
        <h1>All Expenses</h1>
    {expenses&&expenses.length>0?
    (<div className="grid-md">
    <h2>Recent Expenses <small>({expenses.length} total)</small></h2>
    <Table expenses={expenses.sort((a,b)=>a.createdAt-b.createdAt)} />
    </div>
    )
    :
    <p>no expenses to show</p>
     }
        </div>
    );
};

export default ExpensesPage;

export const expensesLoader = ()=>{
const { FetchData } = UseLocalStorage();
const expenses = FetchData("expenses");
return { expenses };
}