import { UseLocalStorage } from "./useLocalStorage";
export const useHelper = () => {
  const { FetchData } = UseLocalStorage();
  //Format epoch
 const formatDateToLocaleString = epoch => new Date(epoch).toLocaleDateString();
  //Format Currency
  const formatCurrency = (amount) => {
    return amount.toLocaleString(undefined, {
      style: "currency",
      currency: "ILS",
    });
  };
  // Formating percentages
  const formatPercentage = (amt) => {
    return amt.toLocaleString(undefined, {
      style: "percent",
      minimumFractionDigits: 0,
    });
  };

  //total spent by budget
  const calculateSpentByBudget = (budgetId) => {
const expenses = FetchData("expenses") ?? [];
const budgetSpent = expenses.reduce((acc, expense) => {
// check if expense.id === budgetId I passed in
if (expense.budgetId !== budgetId) return acc;
// add the current amount to my total
return (acc += expense.amount);
}, 0);
return budgetSpent;
  };
  return { formatCurrency, calculateSpentByBudget, formatPercentage ,formatDateToLocaleString};
};
