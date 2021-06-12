#!/bin/bash

set -e
set -x

echo "Running database migrations"

alembic upgrade head

echo "Starting server"

uvicorn --host 0.0.0.0 main:app --log-level trace
