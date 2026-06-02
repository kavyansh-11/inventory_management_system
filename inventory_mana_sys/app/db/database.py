import time
from os import getenv
from urllib.parse import quote_plus

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from sqlalchemy.exc import OperationalError

DATABASE_URL = "postgresql+psycopg2://postgres:Kavyansh%40123@localhost:5432/inventory_db"


engine = create_engine(DATABASE_URL, pool_pre_ping=True)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def wait_for_db():
    for i in range(10):
        try:
            conn = engine.connect()
            conn.close()
            print("✅ DB Connected")
            return
        except Exception as e:
            print("DB ERROR:", str(e))
            print(f"⏳ Waiting DB... {i+1}/10")
            time.sleep(3)

    raise Exception("❌ DB not available")


wait_for_db()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
