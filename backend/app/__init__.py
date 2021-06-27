from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .db import Book, User, database, engine, metadata
from .views import router


async def create_dummy():
    await User.objects.get_or_create(
        name="Hello World",
        email="test@test.com",
        password=User.create_password_hash("testinguser"),
    )
    await Book.objects.get_or_create(
        name="Hello World", author="hello", description="hellooooo"
    )
    await Book.objects.get_or_create(
        name="Hello World1", author="hello1", description="hellooooooo"
    )
    await Book.objects.get_or_create(
        name="Hello ", author="hello", description="hellooooo"
    )
    await Book.objects.get_or_create(
        name="Hello heljhkj", author="hello1", description="hellooooooo"
    )


app = FastAPI(
    on_startup=[database.connect,lambda: metadata.drop_all(engine) ,lambda: metadata.create_all(engine), create_dummy],
    on_shutdown=[lambda: metadata.drop_all(engine)],
)
app.add_middleware(
    CORSMiddleware,
    allow_origins="*",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router, prefix="/api")
