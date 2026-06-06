import {Route,Routes} from "react-router-dom"
import Products from "./Admin/Product";
import Dashboard from "./Admin/Dashboard";
import Orders from "./Admin/Order";
import Login from "./Admin/Login";
import Header from "./components/Header";
import CustomerHome from "./customers/index"

function App(){
  return(
    <>
    <Header/>
    <Routes>
     <Route path="/" element={<Products/>}/>
     <Route path="/admin/dashboard" element={<Dashboard/>}/>
     <Route path="/admin/order" element={<Orders/>}/>
     <Route path="/admin/login" element={<Login/>}/>
     <Route path="/customer" element={<CustomerHome/>}/>


    </Routes>
    </>
  )
}

export default App;