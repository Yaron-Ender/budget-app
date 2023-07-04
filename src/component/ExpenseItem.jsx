import { Link,useFetcher } from "react-router-dom";
import { useHelper } from "../hooks/useHelper";
import { UseLocalStorage } from "../hooks/useLocalStorage";
import { TrashIcon } from "@heroicons/react/24/solid";
const ExpenseItem = ({expense, showBudget}) => {
const fetcher = useFetcher()
 const { formatCurrency, formatDateToLocaleString} = useHelper();
 const { getAllMatchingItems } = UseLocalStorage()
 const budget = getAllMatchingItems({
  category:'budgets',
  key:"id",
  value:expense.budgetId
 })[0]

  return (
<>
<td>{expense['name']}</td>
<td>{formatCurrency(expense.amount)}</td>
<td>{formatDateToLocaleString(expense.createdAt)}</td>
{showBudget&&(
<td>
<Link to={`/budget/${budget.id}`}
style={{'--accent':budget.color}}
>
{budget.name}
</Link></td>
)
}

<td>
 <fetcher.Form method="post">
  <input type="hidden" name="_action" value='deleteExpense' />
 <input type="hidden" name="expenseId" value={expense.id} />
 <button 
 type="submit"
 className="btn btn--warning"
 aria-label={`delete ${expense.name} expense`}
 >
<TrashIcon width={20}/>
 </button>
  </fetcher.Form> 
</td>
</>
);
};

export default ExpenseItem;