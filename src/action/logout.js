import { redirect } from 'react-router-dom';
import { UseLocalStorage } from '../hooks/useLocalStorage';
//laibary
import { toast } from 'react-toastify';

export async function logoutAction () {
const {deletItem} = UseLocalStorage()
//deleteUser
deletItem({key:'userName'})
deletItem({key:'budgets'})
deletItem({key:'expenses'})
toast.success("you've deleted your acount!")
//redirect
  return redirect('/')
};

export default logoutAction;