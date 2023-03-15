# DocIt - Backend APIs

This is the backend API for a Library Management System application built with Node.js, Express, and Sequelize. It allows users to view, create, and delete blog posts.

## Installation Guide

- Clone this repo using `git clone https://github.com/flexi-docit/backend.git DocItBackend`
- Move into cloned repo: `cd DocItBackend`
- Checkout to `dev` branch: `git checkout dev`
- Install dependencies: `npm i` or `yarn`
- If using windows:
  - Add `/app/node_modules` in `app` service inside `docker-compose.yml`
- Comment `username` and `password` in `utils/queues/email.queue.js` inside redis configuration
- Run: `docker-compose up`

## ENVIROMENT VARIABLES

| Key               | Value                   |
| ----------------- | ----------------------- |
| PORT              | 8000                    |
| NODE_ENV          | development/production  |
| POSTGRES_USER     | `database username`     |
| POSTGRES_PASSWORD | `database password`     |
| POSTGRES_DB_NAME  | `database name`         |
| POSTGRES_HOST     | `database host`         |
| POSTGRES_PORT     | `database port`         |
| GMAIL_EMAIL       | `Google email address`  |
| GMAIL_PASSWORD    | `Google email password` |
| FRONTEND_DOMAIN   | `Frontend Domain`       |
| JWT_SECRET        | `JWT secret key`        |
| REDIS_HOST        | `Redis Server Host`     |
| REDIS_PORT        | `Redis Server Port`     |
| REDIS_USERNAME    | `Redis Server Username` |
| REDIS_PASSWORD    | `Redis Server Password` |
