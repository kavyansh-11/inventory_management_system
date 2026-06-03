import { useEffect, useState } from "react";
import api from "../services/api";

function Products() {
  const [products, setProducts] = useState([]);

  const [form, setForm] = useState({
    name: "",
    sku: "",
    price: "",
    quantity_in_stock: "",
  });

  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await api.get("/products/product_list");

      console.log("Products Response:", res.data);

      // Handle both array and object responses
      if (Array.isArray(res.data)) {
        setProducts(res.data);
      } else if (res.data.data) {
        setProducts(res.data.data);
      } else {
        setProducts([]);
      }
    } catch (err) {
      console.error("Fetch Products Error:", err);
    }
  };

  const handleSubmit = async () => {
    try {
      const data = new FormData();

      data.append("name", form.name);
      data.append("sku", form.sku);
      data.append("price", form.price);
      data.append("quantity_in_stock", form.quantity_in_stock);

      if (editId) {
        await api.put(
          `/products/update_product/${editId}`,
          data
        );
        alert("Product Updated Successfully");
      } else {
        await api.post(
          "/products/create_product",
          data
        );
        alert("Product Created Successfully");
      }

      setForm({
        name: "",
        sku: "",
        price: "",
        quantity_in_stock: "",
      });

      setEditId(null);

      fetchProducts();
    } catch (err) {
      console.error(err);

      if (err.response) {
        console.log(err.response.data);
      }

      alert("Error Saving Product");
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(
        `/products/delete_product/${id}`
      );

      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (product) => {
    setEditId(product.id);

    setForm({
      name: product.name || "",
      sku: product.sku || "",
      price: product.price || "",
      quantity_in_stock:
        product.quantity_in_stock || "",
    });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Products</h2>

      <div
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "20px",
        }}
      >
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) =>
            setForm({
              ...form,
              name: e.target.value,
            })
          }
        />

        <input
          placeholder="SKU"
          value={form.sku}
          onChange={(e) =>
            setForm({
              ...form,
              sku: e.target.value,
            })
          }
        />

        <input
          placeholder="Price"
          value={form.price}
          onChange={(e) =>
            setForm({
              ...form,
              price: e.target.value,
            })
          }
        />

        <input
          placeholder="Quantity"
          value={form.quantity_in_stock}
          onChange={(e) =>
            setForm({
              ...form,
              quantity_in_stock: e.target.value,
            })
          }
        />

        <button onClick={handleSubmit}>
          {editId
            ? "Update Product"
            : "Add Product"}
        </button>
      </div>

      <table
        border="1"
        cellPadding="10"
        width="100%"
      >
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>SKU</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
  {products.map((product, index) => (
    <tr key={product.id}>
      <td>{index + 1}</td>
      <td>{product.name}</td>
      <td>{product.sku}</td>
      <td>{product.price}</td>
      <td>{product.quantity_in_stock}</td>

      <td>
        <button onClick={() => handleEdit(product)}>
          Edit
        </button>

        <button onClick={() => handleDelete(product.id)}>
          Delete
        </button>
      </td>
    </tr>
  ))}
</tbody>
      </table>
    </div>
  );
}

export default Products;