import os

SALT = b"hello"  # binascii.hexlify(os.urandom(32))
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:////tmp/test.db")
