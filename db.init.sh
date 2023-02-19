# !/bin/bash

# Create the database
psql -U $POSTGRES_USER -p $POSTGRES_PASSWORD -e "CREATE DATABASE IF NOT EXISTS $POSTGRES_DB_NAME;"

yarn seed:users