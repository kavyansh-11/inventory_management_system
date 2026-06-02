import { useEffect, useState } from "react";
import api from "../services/api";

function Dashboard() {
  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const p = await api.get("/products/product_list");
      const c = await api.get("/customers/customer_list");
      const o = await api.get("/orders/order_list/");

      setProducts(Array.isArray(p.data) ? p.data : []);
      setCustomers(Array.isArray(c.data) ? c.data : []);
      setOrders(Array.isArray(o.data) ? o.data : []);
    } catch (err) {
      console.log("Dashboard Error:", err);
    }
  };

  const lowStockProducts = products.filter(
    (item) => item.quantity_in_stock < 5
  );

  return (
    <div style={{ padding: "20px" }}>
      <h2>Dashboard</h2>

      <div
        style={{
          display: "flex",
          gap: "20px",
          marginBottom: "20px",
        }}
      >
        <div>
          <h3>Total Products</h3>
          <p>{products.length}</p>
        </div>

        <div>
          <h3>Total Customers</h3>
          <p>{customers.length}</p>
        </div>

        <div>
          <h3>Total Orders</h3>
          <p>{orders.length}</p>
        </div>
      </div>

      <h3>Low Stock Products</h3>

      {lowStockProducts.length === 0 ? (
        <p>No low stock products found.</p>
      ) : (
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>SKU</th>
              <th>Stock</th>
            </tr>
          </thead>

          <tbody>
            {lowStockProducts.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.sku}</td>
                <td>{item.quantity_in_stock}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Dashboard;