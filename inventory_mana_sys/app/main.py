from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.product import router as product_router
from app.api.customer import router as customer_router
from app.api.order import router as order_router
from app.db.database import engine, Base, wait_for_db

import app.models

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5174",
        "http://127.0.0.1:5174",
        "https://inventory-management-system-553a.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def startup():
    wait_for_db()
    Base.metadata.create_all(bind=engine)

app.include_router(product_router)
app.include_router(customer_router)
app.include_router(order_router)