import binascii
import os

SALT = binascii.hexlify(os.urandom(32))
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:////tmp/test.db")
