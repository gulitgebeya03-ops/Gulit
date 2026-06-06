import { Link } from "react-router-dom";

function Header(){
    return(
       <div className="flex flex-row gap-4">
<Link to="/">Home</Link>
<Link to="/admin/order">Order</Link>
<Link to="/admin/dashboard">Dashboard</Link>
<Link to="/admin/login">Login</Link>
<Link to="/customer">Customer</Link>
       </div>
    )
}

export default Header;