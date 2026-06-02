from fastapi import FastAPI

from app.api.product import router as product_router
from app.api.customer import router as customer_router
from app.api.order import router as order_router

from app.db.database import engine, Base, wait_for_db

import app.models   # ✅ ONLY THIS (REMOVE ALL INDIVIDUAL MODEL IMPORTS)

app = FastAPI()

@app.on_event("startup")
def startup():
    wait_for_db()
    Base.metadata.create_all(bind=engine)

app.include_router(product_router)
app.include_router(customer_router)
app.include_router(order_router)