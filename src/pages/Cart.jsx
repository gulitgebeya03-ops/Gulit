import CartItem from "../components/CartItem";

function Cart() {
  const cartItems = [];

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-4xl font-bold mb-6">
        Shopping Cart
      </h1>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <CartItem
              key={item.id}
              item={item}
            />
          ))}

          <div className="mt-8 text-right">
            <h2 className="text-2xl font-bold">
              Total: ETB 0
            </h2>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;