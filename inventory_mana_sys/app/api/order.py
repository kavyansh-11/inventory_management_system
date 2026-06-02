from fastapi import APIRouter, Depends, HTTPException, Form
from sqlalchemy.orm import Session

from app.db.database import SessionLocal
from app.models.customer import Customer
from app.models.product import Product
from app.models.order import Order
from app.models.order_item import OrderItem
import json
from uuid import uuid4

router = APIRouter(prefix="/orders", tags=["Orders"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/create_order")
def create_order(customer_id: int = Form(...), items: str = Form(...), db: Session = Depends(get_db)):
    customer = db.query(Customer).filter(Customer.id == customer_id).first()
    if not customer:
        raise HTTPException(status_code=404, detail="Customer not found")

    items = json.loads(items)

    total_amount = 0

    for item in items:
        product = db.query(Product).filter(Product.id == item["product_id"]).first()

        if not product:
            raise HTTPException(status_code=404, detail="Product not found")

        if product.quantity_in_stock < item["quantity"]:
            raise HTTPException(status_code=400, detail="Insufficient stock")

        total_amount += product.price * item["quantity"]

    order = Order(
        order_id=f"ORD-{uuid4().hex[:6].upper()}",
        customer_id=customer_id,
        total_amount=total_amount
    )

    db.add(order)
    db.commit()
    db.refresh(order)

    for item in items:
        product = db.query(Product).filter(Product.id == item["product_id"]).first()

        order_item = OrderItem(
            order_id=order.id,
            product_id=item["product_id"],
            quantity=item["quantity"]
        )

        db.add(order_item)
        product.quantity_in_stock -= item["quantity"]

    db.commit()

    return {"order_id": order.order_id, "total_amount": total_amount}

@router.get("/order_list/")
def get_orders(db: Session = Depends(get_db)):
    orders = db.query(Order).all()

    result = []

    for order in orders:
        items = db.query(OrderItem).filter(OrderItem.order_id == order.id).all()

        item_list = []

        for item in items:
            product = db.query(Product).filter(Product.id == item.product_id).first()

            item_list.append({
                "id": item.id,
                "product_id": item.product_id,
                "quantity": item.quantity,
                "product": {
                    "id": product.id,
                    "name": product.name,
                    "price": product.price
                } if product else None
            })

        result.append({
            "id": order.id,
            "customer_id": order.customer_id,
            "total_amount": order.total_amount,
            "items": item_list
        })

    return result


@router.get("/order_list/{order_id}")
def get_order(order_id: int, db: Session = Depends(get_db)):
    order = db.query(Order).filter(
        Order.id == order_id
    ).first()

    if not order:
        raise HTTPException( status_code=404, detail="Order not found")

    return order


@router.delete("/delete_order/{order_id}")
def delete_order(order_id: int, db: Session = Depends(get_db)):
    order = db.query(Order).filter(
        Order.id == order_id
    ).first()

    if not order:
        raise HTTPException(status_code=404, detail="Order not found")

    db.delete(order)
    db.commit()

    return {
        "message": "Order deleted successfully"
    }