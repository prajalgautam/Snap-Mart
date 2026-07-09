# SnapMart

SnapMart is a hyperlocal e-commerce platform that connects customers with nearby local shops.

Customers can browse products from local vendors, place orders, make online payments, and receive faster deliveries. Vendors can manage products, orders, and inventory through a dedicated dashboard, while administrators manage users, vendors, and the overall platform.

## Project Structure

- `app/` - Next.js frontend application.
- `api/` - Express/MongoDB backend API.

The older root-level demo scaffold was removed so installs, scripts, and deployments target the real frontend and backend projects only.

## Run Locally

Install frontend and backend packages:

```bash
npm install
npm run setup
```

Run the full project:

```bash
npm run dev
```

This starts:

- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:8000`

Run only one side:

```bash
npm run dev:app
npm run dev:api
```

Build or start production mode:

```bash
npm run build
npm run start
```

## Environment

Local defaults are included for development. For real credentials, copy the examples and fill in the values:

- `app/.env.example` -> `app/.env`
- `api/.env.example` -> `api/.env`

The API defaults to local MongoDB at `mongodb://localhost:27017/snapmart`. Start MongoDB locally before using database-backed features.
