import {Route,Routes} from "react-router-dom"
import Product from "./Admin/Product";
import Dashboard from "./Admin/Dashboard";
import Orders from "./Admin/Order";
import Login from "./Admin/Login";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CustomerHome from "./customers/index";
import logo from "./assets/logo.jpg";



function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/order" element={<Orders />} />
        <Route path="/admin/login" element={<Login />} />
        <Route path="/customer" element={<CustomerHome />} />

     
     

      </Routes>
    </>
  )
}

export default App;