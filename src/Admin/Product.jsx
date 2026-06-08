import { useState, useEffect } from "react";
import productData from "../data/Product";

const Products = () => {
  const [products, setProducts] = useState(() => {
    const savedProducts = localStorage.getItem("products");
    return savedProducts
      ? JSON.parse(savedProducts)
      : productData;
  });

  const [editingId, setEditingId] = useState(null);

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [image, setImage] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    localStorage.setItem(
      "products",
      JSON.stringify(products)
    );
  }, [products]);

  const clearForm = () => {
    setEditingId(null);
    setName("");
    setCategory("");
    setPrice("");
    setStock("");
    setImage("");
  };

  const handleAddProduct = () => {
    if (
      !name ||
      !category ||
      !price ||
      !stock ||
      !image
    ) {
      alert("Please fill all fields");
      return;
    }

    const newProduct = {
      id: Date.now(),
      name,
      category,
      price: Number(price),
      stock: Number(stock),
      image,
    };

    setProducts([...products, newProduct]);
    clearForm();
  };

  const handleEdit = (product) => {
    setEditingId(product.id);

    setName(product.name);
    setCategory(product.category);
    setPrice(product.price);
    setStock(product.stock);
    setImage(product.image);
  };

  const handleUpdateProduct = () => {
    const updatedProducts = products.map(
      (product) =>
        product.id === editingId
          ? {
              ...product,
              name,
              category,
              price: Number(price),
              stock: Number(stock),
              image,
            }
          : product
    );

    setProducts(updatedProducts);
    clearForm();
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    setProducts(
      products.filter(
        (product) => product.id !== id
      )
    );
  };

  const resetProducts = () => {
    localStorage.removeItem("products");
    window.location.reload();
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">
        Product Management
      </h1>
      <input
  type="text"
  placeholder="Search Product..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  className="w-full border p-3 rounded-lg mb-6"
/>

      <div className="bg-white p-5 rounded-xl shadow mb-6">
        <h2 className="text-xl font-semibold mb-4">
          {editingId
            ? "Edit Product"
            : "Add Product"}
        </h2>

        <div className="grid grid-cols-2 gap-3">
          <input
            type="text"
            placeholder="Product Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            className="border p-2 rounded"
          />

          <select
            value={category}
            onChange={(e) =>
              setCategory(e.target.value)
            }
            className="border p-2 rounded"
          >
            <option value="">
              Select Category
            </option>

            <option value="Electronics">
              Electronics
            </option>

            <option value="Fashion">
              Fashion
            </option>

            <option value="Shoes">
              Shoes
            </option>

            <option value="Books">
              Books
            </option>
          </select>

          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) =>
              setPrice(e.target.value)
            }
            className="border p-2 rounded"
          />

          <input
            type="number"
            placeholder="Stock"
            value={stock}
            onChange={(e) =>
              setStock(e.target.value)
            }
            className="border p-2 rounded"
          />

          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];

              if (file) {
                setImage(
                  URL.createObjectURL(file)
                );
              }
            }}
            className="border p-2 rounded col-span-2"
          />
        </div>

        {image && (
          <img
            src={image}
            alt="preview"
            className="w-32 h-32 object-cover rounded mt-4"
          />
        )}

        <div className="flex gap-3 mt-4">
          {editingId ? (
            <>
              <button
                onClick={handleUpdateProduct}
                className="bg-yellow-500 text-white px-4 py-2 rounded-lg"
              >
                Update Product
              </button>

              <button
                onClick={clearForm}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={handleAddProduct}
              className="bg-green-600 text-white px-4 py-2 rounded-lg"
            >
              Add Product
            </button>
          )}

          <button
            onClick={resetProducts}
            className="bg-red-600 text-white px-4 py-2 rounded-lg"
          >
            Reset Products
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">
                Image
              </th>
              <th className="p-4 text-left">
                Name
              </th>
              <th className="p-4 text-left">
                Category
              </th>
              <th className="p-4 text-left">
                Price
              </th>
              <th className="p-4 text-left">
                Stock
              </th>
              <th className="p-4 text-left">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
           {products
  .filter((product) =>
    product.name
      .toLowerCase()
      .includes(search.toLowerCase())
  )
  .map((product) => (
              <tr
                key={product.id}
                className="border-b hover:bg-gray-50"
              >
                <td className="p-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                </td>

                <td className="p-4 font-medium">
                  {product.name}
                </td>

                <td className="p-4">
                  {product.category}
                </td>

                <td className="p-4">
                  ETB{" "}
                  {product.price.toLocaleString()}
                </td>

                <td className="p-4">
                  {product.stock}
                </td>

                <td className="p-4 space-x-2">
                  <button
                    onClick={() =>
                      handleEdit(product)
                    }
                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      handleDelete(product.id)
                    }
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Products;