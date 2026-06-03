# 🛒 Inventory Management API (FastAPI)

A simple backend system built with **FastAPI + SQLAlchemy** for managing Products, Customers, and Orders.

---

## 🚀 Tech Stack

- FastAPI
- SQLAlchemy
- Pydantic
- Uvicorn

---

## 📌 Features

### 👤 Customers
- Create customer
- Get customer list
- Delete customer

### 📦 Products
- Create product
- Update product
- Get product list
- Delete product

### 🧾 Orders
- Create order with multiple products
- Get order list with customer + product details

---

## 📂 API Endpoints

---

### 👤 Customers

**Create Customer**
POST /customers/create_customer

Params:
- full_name  
- email  
- phone_number  

---

**Get Customers**
GET /customers/customer_list  

---

**Delete Customer**
DELETE /customers/delete_customer/{id}  

---

### 📦 Products

**Create Product**
POST /products/create_product  

Form Data:
- name  
- sku  
- price  
- quantity_in_stock  

---

**Update Product**
PUT /products/update_product/{id}  

---

**Get Products**
GET /products/product_list  

---

**Delete Product**
DELETE /products/delete_product/{id}  

---

### 🧾 Orders

**Create Order**
POST /orders/create_order  

Body:
- customer_id  
- product_items (product_id + quantity)

---

**Get Orders**
GET /orders/order_list  

Returns:
- Customer details  
- Product details  
- Quantity & price  

---

## ⚙️ Run Project

```bash
pip install fastapi uvicorn sqlalchemy
uvicorn main:app --reload
