Inventory Management API (FastAPI)

A simple REST API for managing Products, Customers, and Orders using FastAPI + SQLAlchemy.

🚀 Base Setup
Framework: FastAPI
DB: SQLAlchemy (SessionLocal)
Models: Product, Customer, Order, OrderItem
📦 Products API
➕ Create Product

POST /products/create_product

Form Data:

name (str)
sku (str)
price (int)
quantity_in_stock (int)
📄 Get All Products

GET /products/product_list

Returns all non-deleted products.

🔍 Get Product by ID

GET /products/product_list/{product_id}

✏️ Update Product

PUT /products/update_product/{product_id}

Optional Form Data:

name
sku
price
quantity_in_stock
❌ Delete Product (Soft Delete)

DELETE /products/delete_product/{product_id}

👤 Customers API
➕ Create Customer

POST /customers/create_customer

Query/Form:

full_name
email
phone_number
📄 Get All Customers

GET /customers/customer_list

🔍 Get Customer by ID

GET /customers/customer_list/{customer_id}

❌ Delete Customer

DELETE /customers/delete_customer/{customer_id}

🛒 Orders API
➕ Create Order

POST /orders/create_order

Form Data:

customer_id (int)

items (JSON string)

[
  {"product_id": 1, "quantity": 2}
]
📄 Get All Orders

GET /orders/order_list/

Returns orders with items + product details.

🔍 Get Order by ID

GET /orders/order_list/{order_id}

❌ Delete Order

DELETE /orders/delete_order/{order_id}

⚙️ Features
SKU uniqueness check
Email uniqueness check
Stock validation during order creation
Automatic stock deduction
Soft delete for products
Order item tracking
