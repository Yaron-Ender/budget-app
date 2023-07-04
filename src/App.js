
import { createBrowserRouter, RouterProvider } from "react-router-dom";
//Laibrary
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
//loaders and actions
import Dashboard, { dashboardAction, dashboardLoader } from "./pages/Dashboard";
import { mainLoader } from "./layouts/Main";
import { logoutAction } from "./action/logout";
import {deleteBudget} from './action/deleteBudget'
//layout
import Main from "./layouts/Main";
// Routes
import Error from "./pages/Error";
import ExpensesPage, { expensesLoader } from "./pages/ExpensesPage";
import BudgetPage,{budgetAction, budgetLoader} from "./pages/BudgetPage";
function App() {
const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    loader: mainLoader,
    errorElement: <Error />,
    children: [
      {
        index: true,
        //  path:'/',
        element: <Dashboard />,
        loader: dashboardLoader,
        action: dashboardAction,
        errorElement: <Error />,
      },
      {
        path: "expenses",
        element: <ExpensesPage />,
        loader: expensesLoader,
        action: dashboardAction,
        errorElement: <Error />,
      },
      {
        path: "budget/:id",
        element: <BudgetPage />,
        loader: budgetLoader,
        action:budgetAction,
        errorElement: <Error />,
        children:[
        {
        path:'delete',
        action:deleteBudget,
        }
        ]
      },
      {
        path: "logout",
        action: logoutAction,
      },
    ],
  },
]);
  return (
    <div className="App">
    <RouterProvider router={router} />
    <ToastContainer />
    </div>
  );
}

export default App;
