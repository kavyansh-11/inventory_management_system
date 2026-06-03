import { useEffect, useState } from "react";
import api from "../services/api";

function Customers() {
  const [customers, setCustomers] = useState([]);

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone_number: "",
  });

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const res = await api.get("/customers/customer_list");
      setCustomers(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const addCustomer = async () => {
    try {
      await api.post("/customers/create_customer", null, {
        params: {
          full_name: form.full_name,
          email: form.email,
          phone_number: form.phone_number,
        },
      });

      setForm({
        full_name: "",
        email: "",
        phone_number: "",
      });

      fetchCustomers();
    } catch (err) {
      console.log(err);
      alert("Error creating customer");
    }
  };

  const deleteCustomer = async (id) => {
    if (!window.confirm("Delete Customer?")) return;

    try {
      await api.delete(`/customers/delete_customer/${id}`);
      fetchCustomers();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Customers</h2>

      <input
        placeholder="Full Name"
        value={form.full_name}
        onChange={(e) =>
          setForm({
            ...form,
            full_name: e.target.value,
          })
        }
      />

      <input
        placeholder="Email"
        value={form.email}
        onChange={(e) =>
          setForm({
            ...form,
            email: e.target.value,
          })
        }
      />

      <input
        placeholder="Phone Number"
        value={form.phone_number}
        onChange={(e) =>
          setForm({
            ...form,
            phone_number: e.target.value,
          })
        }
      />

      <button onClick={addCustomer}>
        Add Customer
      </button>

      <hr />

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>Customer ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
  {customers.map((customer, index) => (
    <tr key={customer.id}>
      <td>{index + 1}</td>
      <td>{customer.id}</td>
      <td>{customer.full_name}</td>
      <td>{customer.email}</td>
      <td>{customer.phone_number}</td>

      <td>
        <button onClick={() => deleteCustomer(customer.id)}>
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

export default Customers;