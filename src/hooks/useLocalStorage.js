export const UseLocalStorage = ()=>{
// pending simulation
const waait = ()=>new Promise(res=>setTimeout(res,Math.random()*2000))

  const FetchData = (key) => {
    return JSON.parse(localStorage.getItem(key));
  }
  //random color
  const generateRandomColot =()=>{
  const existingBudgetLength = FetchData('budgets')?.length??0
  return `${existingBudgetLength *34} 65% 50%`
  }
const deleteItem =({key, id})=>{
const existingData = FetchData(key)
if(id){
const newData = existingData.filter((item)=>item.id!==id)
return localStorage.setItem(key,JSON.stringify(newData)) 
}
return localStorage.removeItem(key)
}
//get all items from local storage
const getAllMatchingItems = ({category,key,value})=>{
const data = FetchData(category)??[];   
return data.filter(item=>item[key]===value)
}
//create budget
const createBudget = ({name,amount})=>{
const newItem = {
  name: name,
  amount: +amount,
  // amount: amount.valueAsNumber,
  id: window.crypto.randomUUID(),
  createdAt: Date.now(),
  color: generateRandomColot(),
};
const existingBudget = FetchData('budgets')??[]
return localStorage.setItem('budgets',JSON.stringify([...existingBudget,newItem]))
}
//create Expense
const createExpense = ({ name, amount, budgetId }) => {
  const newItem = {
    name: name,
    amount: +amount,
    id: window.crypto.randomUUID(),
    createdAt: Date.now(),
    budgetId: budgetId,
  };
  const existingExpenses = FetchData("expenses") ?? [];
  //the array of expenses that will be creates includes ALL the expenses
  return localStorage.setItem(
    "expenses",
    JSON.stringify([...existingExpenses, newItem])
  );
};
return { FetchData,deleteItem,createBudget,waait,createExpense,getAllMatchingItems }

}