function NavBar() {
  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between">
        <h1 className="text-2xl font-bold">
          Gulit Store
        </h1>

        <ul className="flex gap-6">
          <li>Home</li>
          <li>Cart</li>
          <li>Track Order</li>
          <li>Admin</li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;