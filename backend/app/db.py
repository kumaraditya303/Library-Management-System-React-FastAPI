import hashlib
from datetime import datetime
from typing import Optional, Type

import databases
import ormar
import sqlalchemy

from .config import DATABASE_URL, SALT

database = databases.Database(DATABASE_URL)
metadata = sqlalchemy.MetaData()
engine = sqlalchemy.create_engine(DATABASE_URL)


class BaseMeta(ormar.ModelMeta):
    metadata = metadata
    database = database


class User(ormar.Model):
    class Meta(BaseMeta):
        tablename = "user"

    id: int = ormar.Integer(primary_key=True)
    name: str = ormar.String(max_length=100)
    email: str = ormar.String(max_length=100, unique=True)
    password: str = ormar.String(max_length=100)
    admin: bool = ormar.Boolean(default=False)

    @staticmethod
    def create_password_hash(raw_password: str, /) -> str:
        password = hashlib.sha256(raw_password.encode("utf-8") + SALT).hexdigest()
        return password


class Book(ormar.Model):
    class Meta(BaseMeta):
        tablename = "book"

    id: int = ormar.Integer(primary_key=True)
    name: str = ormar.String(max_length=100)
    author: str = ormar.String(max_length=100)
    description: str = ormar.Text()
    total_copies: int = ormar.Integer(default=10)
    available_copies: int = ormar.Integer(default=0)


class Copy(ormar.Model):
    class Meta(BaseMeta):
        tablename = "copy"

    id: int = ormar.Integer(primary_key=True)
    timestamp: datetime = ormar.DateTime(default=datetime.now)
    issuer: Optional[User] = ormar.ForeignKey(
        User, related_name="issued_books", nullable=True
    )
    issued: bool = ormar.Boolean(default=False)
    book: Book = ormar.ForeignKey(Book, related_name="copies")
    date_issued: Optional[datetime] = ormar.DateTime(nullable=True)
    date_return: Optional[datetime] = ormar.DateTime(nullable=True)


@ormar.post_save(Book)
async def create_copies(sender: Type[Book], instance: Book, **kwargs) -> None:
    while await Copy.objects.filter(book=instance).count() < instance.total_copies:
        await Copy.objects.create(book=instance)
    await instance.update(
        available_copies=await Copy.objects.filter(book=instance, issued=False).count()
    )
