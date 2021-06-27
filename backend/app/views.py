from datetime import datetime, timedelta
from typing import List

from fastapi import APIRouter, Depends, HTTPException, status

from .db import Book, Copy, User
from .schemas import BookIssueSchema, UserLoginSchema, UserRegisterSchema
from .utils import current_user, encode_jwt

router = APIRouter()


@router.get("/books/", response_model=List[Book], response_model_exclude={"copies"})
async def all_books():
    return await Book.objects.all()


@router.get("/books/{book_id}", response_model=Book, response_model_exclude={"copies"})
async def get_book(book_id: int):
    book = await Book.objects.get_or_none(id=book_id)
    if not book:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Book not found with id {book_id}",
        )
    return book


@router.post(
    "/books/issue/",
    response_model=List[Copy],
    response_model_exclude={"issuer", "book__copies"},
)
async def issue_books(form: BookIssueSchema, user: User = Depends(current_user)):
    issued_books: List[Copy] = []
    for book_id in form.books:
        book = await Book.objects.get(id=book_id)
        copy = await Copy.objects.filter(book=book, issued=False).first()
        if not copy:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST, detail="Book is not available"
            )
        copy.issuer = user
        copy.issued = True
        current_time = datetime.now()
        copy.date_issued = current_time
        copy.date_return = current_time + timedelta(days=28)
        book.available_copies -= 1
        await book.update()
        await copy.update()
        await copy.load()
        issued_books.append(copy)

    return issued_books


@router.post("/login/")
async def login_user(form: UserLoginSchema):
    email = form.email
    password = User.create_password_hash(form.password)
    user = await User.objects.get_or_none(email=email, password=password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
        )
    return {"access_token": encode_jwt(user.id)}


@router.post("/register/")
async def register_user(form: UserRegisterSchema):
    name = form.name
    email = form.email
    password = User.create_password_hash(form.password)
    if await User.objects.filter(email=email).exists():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User with email already exists",
        )
    user = await User.objects.create(name=name, email=email, password=password)
    return {"access_token": encode_jwt(user.id)}


@router.get("/me/", response_model=User, response_model_exclude={"password","issued_books__issuer"})
async def me(user=Depends(current_user)):
    return user
