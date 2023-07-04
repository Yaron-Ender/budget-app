import { Outlet, useLoaderData } from "react-router-dom";
import { UseLocalStorage } from "../hooks/useLocalStorage"; 
//assets
import wave from '../assets/wave.svg'
import Nav from "../component/Nav";

const Main = () => {
  const { userName } = useLoaderData();
  return (
  <div className="layout">
  <Nav userName={userName} />
  <main>
  <Outlet />
  </main>
  <img src={wave} alt="wave" />
  </div>
  );
};

export default Main;

//loader
export const mainLoader = ()=>{
const { FetchData } = UseLocalStorage();
const userName = FetchData("userName");
    return { userName }
}