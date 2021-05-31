from typing import List

from pydantic import BaseModel, EmailStr, Field


class UserLoginSchema(BaseModel):
    email: EmailStr
    password: str = Field(min_length=8)


class UserRegisterSchema(UserLoginSchema):
    name: str


class BookIssueSchema(BaseModel):
    books: List[int]
