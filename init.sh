#!/bin/bash

# check if git is installed
if ! [ -x "$(command -v git)" ]; then
  echo 'Error: git is not installed.' >&2
  exit 1
fi

# check if docker is installed
if ! [ -x "$(command -v docker)" ]; then
  echo 'Error: docker is not installed.' >&2
  exit 1
fi

# check if docker-compose is installed
if ! [ -x "$(command -v docker-compose)" ]; then
  echo 'Error: docker-compose is not installed.' >&2
  exit 1
fi

# check if docker-compose.yml exists
if ! [ -f docker-compose.yml ]; then
  echo 'Error: docker-compose.yml does not exist.' >&2
  exit 1
fi

detached=false
# check if -d flag is passed
if [ "$1" = "-d" ]; then
    detached=true
    fi

if $detached; then
    sudo docker-compose up --build -d
else
    sudo docker-compose up --build
fi
