import { Link } from "react-router-dom";

function Navbar({ cartCount }) {
  return (
    <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold">Gulit Store</h1>

      <div className="space-x-6">
        <Link to="/" className="hover:text-gray-200">
          Home
        </Link>

        <Link to="/cart" className="hover:text-gray-200">
          Cart ({cartCount})
        </Link>

        <Link to="/track-order" className="hover:text-gray-200">
          Track Order
        </Link>

        <Link to="/admin" className="hover:text-gray-200">
          Admin
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;