from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.database import SessionLocal
from app.models.customer import Customer

router = APIRouter(
    prefix="/customers",
    tags=["Customers"]
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/create_customer")
def create_customer(
    full_name: str,
    email: str,
    phone_number: str,
    db: Session = Depends(get_db)
):
    customer = db.query(Customer).filter(
        Customer.email == email
    ).first()

    if customer:
        raise HTTPException(
            status_code=400,
            detail="Email already exists"
        )

    new_customer = Customer(
        full_name=full_name,
        email=email,
        phone_number=phone_number
    )

    db.add(new_customer)
    db.commit()
    db.refresh(new_customer)

    return new_customer


@router.get("/customer_list")
def get_customers(db: Session = Depends(get_db)):
    return db.query(Customer).all()


@router.get("/customer_list/{customer_id}")
def get_customer(customer_id: int, db: Session = Depends(get_db)):
    customer = db.query(Customer).filter(
        Customer.id == customer_id
    ).first()

    if not customer:
        raise HTTPException(status_code=404, detail="Customer not found")

    return customer


@router.delete("/delete_customer/{customer_id}")
def delete_customer(customer_id: int, db: Session = Depends(get_db)):
    customer = db.query(Customer).filter(
        Customer.id == customer_id
    ).first()

    if not customer:
        raise HTTPException(status_code=404, detail="Customer not found")

    db.delete(customer)
    db.commit()

    return {
        "message": "Customer deleted successfully"
    }