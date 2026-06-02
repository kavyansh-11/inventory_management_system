// src/pages/Orders.jsx

import { useEffect, useState } from "react";
import api from "../services/api";

function Orders() {
  const [orders, setOrders] = useState([]);

  const [customerId, setCustomerId] = useState("");
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState("");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await api.get("/orders/order_list/");
      setOrders(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const createOrder = async () => {
    try {
      const data = new FormData();

      data.append("customer_id", customerId);

      data.append(
        "items",
        JSON.stringify([
          {
            product_id: Number(productId),
            quantity: Number(quantity),
          },
        ])
      );

      await api.post("/orders/create_order", data);

      setCustomerId("");
      setProductId("");
      setQuantity("");

      fetchOrders();
    } catch (err) {
      console.log(err);
      alert("Unable to create order");
    }
  };

  const deleteOrder = async (id) => {
    try {
      await api.delete(`/orders/delete_order/${id}`);
      fetchOrders();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h2>Orders</h2>

      {/* CREATE ORDER */}
      <div style={{ marginBottom: "20px" }}>
        <input
          placeholder="Customer ID"
          value={customerId}
          onChange={(e) => setCustomerId(e.target.value)}
        />

        <input
          placeholder="Product ID"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
        />

        <input
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />

        <button onClick={createOrder}>Create Order</button>
      </div>

      <hr />

      {/* ORDERS TABLE */}
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer ID</th>
            <th>Total Amount</th>
            <th>Items</th>
            {/* <th>Action</th> */}
          </tr>
        </thead>

        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.customer_id}</td>
              <td>{order.total_amount}</td>

              {/* ITEMS */}
              <td>
                {order.items && order.items.length > 0 ? (
                  <ul>
                    {order.items.map((item) => (
                      <li key={item.id}>
                        Product: {item.product?.name} | Price:{" "}
                        {item.product?.price} | Qty: {item.quantity}
                      </li>
                    ))}
                  </ul>
                ) : (
                  "No items"
                )}
              </td>

              {/* <td>
                <button onClick={() => deleteOrder(order.id)}>
                  Delete
                </button>
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Orders;