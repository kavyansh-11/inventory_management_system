from fastapi import APIRouter, Depends, HTTPException, Form
from sqlalchemy.orm import Session

from app.db.database import SessionLocal
from app.models.product import Product
from typing import Optional

router = APIRouter(prefix="/products", tags=["Products"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/create_product")
def create_product(name: str = Form(...), sku: str = Form(...), price: int = Form(...),
    quantity_in_stock: int = Form(...), db: Session = Depends(get_db)):
    product = db.query(Product).filter(Product.sku == sku).first()

    if product:
        raise HTTPException(status_code=400, detail="SKU already exists")

    new_product = Product(
        name=name,
        sku=sku,
        price=price,
        quantity_in_stock=quantity_in_stock
    )

    db.add(new_product)
    db.commit()
    db.refresh(new_product)

    return new_product


@router.get("/product_list")
def get_products(db: Session = Depends(get_db)):
    products = db.query(Product).filter(Product.is_deleted == False).all()
    return products


@router.get("/product_list/{product_id}")
def get_product(product_id: int, db: Session = Depends(get_db)):
    product = db.query(Product).filter(Product.id == product_id, Product.is_deleted == False).first()

    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    return product


@router.put("/update_product/{product_id}")
def update_product(product_id: int, name: Optional[str] = Form(None), sku: Optional[str] = Form(None),
    price: Optional[int] = Form(None), quantity_in_stock: Optional[int] = Form(None), db: Session = Depends(get_db)):
    product = db.query(Product).filter(
        Product.id == product_id
    ).first()

    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    if name is not None:
        product.name = name
    
    if sku is not None:
        product.sku = sku

    if price is not None:
        product.price = price
    
    if quantity_in_stock is not None:
        product.quantity_in_stock = quantity_in_stock

    db.commit()
    db.refresh(product)

    return product


@router.delete("/delete_product/{product_id}")
def delete_product(product_id: int, db: Session = Depends(get_db)):
    product = db.query(Product).filter(
        Product.id == product_id
    ).first()

    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    product.is_deleted = True
    db.commit()

    return {"message": "Product deleted successfully"}