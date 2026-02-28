from fastapi import APIRouter
from database import SessionLocal
from models import User
from utils.auth import hash_password, verify_password, create_access_token

router = APIRouter()


@router.post("/signup")
def signup(data: dict):

    db = SessionLocal()

    existing = db.query(User).filter(User.email == data["email"]).first()

    if existing:
        return {"error": "Email already registered"}

    hashed = hash_password(data["password"])

    user = User(
        name=data["name"],
        email=data["email"],
        password=hashed
    )

    db.add(user)
    db.commit()

    return {"message": "Account created successfully"}


@router.post("/login")
def login(data: dict):

    db = SessionLocal()

    user = db.query(User).filter(User.email == data["email"]).first()

    if not user:
        return {"error": "Invalid credentials"}

    if not verify_password(data["password"], user.password):
        return {"error": "Invalid credentials"}

    token = create_access_token({"user_id": user.id})

    return {
        "access_token": token,
        "token_type": "bearer"
    }