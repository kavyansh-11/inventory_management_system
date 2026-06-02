from sqlalchemy import Column, Integer, String, Boolean
from app.db.database import Base

class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    sku = Column(String(100), unique=True, nullable=False)
    price = Column(Integer, nullable=False)
    quantity_in_stock = Column(Integer, default=0, nullable=False)
    is_deleted = Column(Boolean, default=False)