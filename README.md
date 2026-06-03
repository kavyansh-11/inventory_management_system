# 🛒 Inventory Management API (FastAPI)

A simple backend system built with **FastAPI + SQLAlchemy** for managing Products, Customers, and Orders.

---

## 🚀 Tech Stack
- FastAPI
- SQLAlchemy
- PostgreSQL / SQLite (any DB supported via SQLAlchemy)
- Python 3.10+

---

# 📦 Products API

## ➕ Create Product
**POST** `/products/create_product`

### Form Data:
- `name` (str)
- `sku` (str)
- `price` (int)
- `quantity_in_stock` (int)

---

## 📄 Get All Products
**GET** `/products/product_list`

Returns all active (non-deleted) products.

---

## 🔍 Get Product by ID
**GET** `/products/product_list/{product_id}`

---

## ✏️ Update Product
**PUT** `/products/update_product/{product_id}`

### Optional Form Data:
- `name`
- `sku`
- `price`
- `quantity_in_stock`

---

## ❌ Delete Product (Soft Delete)
**DELETE** `/products/delete_product/{product_id}`

Marks product as deleted (`is_deleted = True`)

---

# 👤 Customers API

## ➕ Create Customer
**POST** `/customers/create_customer`

### Params:
- `full_name`
- `email`
- `phone_number`

---

## 📄 Get All Customers
**GET** `/customers/customer_list`

---

## 🔍 Get Customer by ID
**GET** `/customers/customer_list/{customer_id}`

---

## ❌ Delete Customer
**DELETE** `/customers/delete_customer/{customer_id}`

---

# 🛒 Orders API

## ➕ Create Order
**POST** `/orders/create_order`

### Form Data:
- `customer_id` (int)
- `items` (JSON string)

### Example Items JSON:
```json
[
  {
    "product_id": 1,
    "quantity": 2
  }
]



# 🛒 Orders API Documentation

## 📄 Get All Orders (Detailed View)
**GET** `/orders/order_list/`

### Description:
Returns all orders with full details including:
- Order info
- Order items
- Product details for each item

### Response Structure:
```json
[
  {
    "id": 1,
    "customer_id": 2,
    "total_amount": 500,
    "items": [
      {
        "id": 1,
        "product_id": 3,
        "quantity": 2,
        "product": {
          "id": 3,
          "name": "Product Name",
          "price": 250
        }
      }
    ]
  }
]
