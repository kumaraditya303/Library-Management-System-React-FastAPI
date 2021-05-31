from typing import Any, Dict, Optional

import jwt
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from starlette.requests import Request

from .config import SALT
from .db import User


def encode_jwt(user_id: int) -> str:
    payload = {
        "user_id": user_id,
    }
    token = jwt.encode(payload, key=SALT.decode("utf-8"), algorithm="HS256")
    return token


def decode_jwt(token: str) -> Dict[str, Any]:
    try:
        decoded_token = jwt.decode(
            token, key=SALT.decode("utf-8"), algorithms=["HS256"]
        )
        return decoded_token
    except:
        return {}


class JWTBearer(HTTPBearer):
    async def __call__(
        self, request: Request
    ) -> Optional[HTTPAuthorizationCredentials]:
        credentials = await super().__call__(request)
        if credentials:
            if not credentials.scheme == "Bearer":
                raise HTTPException(
                    status_code=403, detail="Invalid authentication scheme."
                )
            if not decode_jwt(credentials.credentials):
                raise HTTPException(
                    status_code=403, detail="Invalid token or expired token."
                )
            return credentials
        return None


async def current_user(
    credentials: HTTPAuthorizationCredentials = Depends(JWTBearer()),
) -> User:
    user_id = decode_jwt(credentials.credentials)["user_id"]
    user = await User.objects.get_or_none(id=user_id)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid User",
        )
    return user


async def admin_user(user: User = Depends(current_user)) -> User:
    if not user.admin:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid admin permission",
        )
    return user
