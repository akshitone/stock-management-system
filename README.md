# Stock Management System

A monorepo containing the Stock Management System for textile manufacturing and trading.

## Tech Stack

- **Backend**: NestJS, TypeScript, MongoDB (Mongoose)
- **Frontend**: NextJS (App Router), TypeScript
- **Monorepo**: npm workspaces + Turborepo

## Quick Start

```bash
# Install dependencies
npm install

# Start MongoDB
docker-compose up -d

# Copy environment file
cp apps/api/.env.example apps/api/.env

# Run development servers
npm run dev
```

## Project Structure

```
├── apps/
│   ├── api/          # NestJS Backend (port 4000)
│   └── web/          # NextJS Frontend (port 3000)
├── packages/
│   └── shared/       # Shared TypeScript types
├── docker-compose.yml
└── turbo.json
```

## Scripts

- `npm run dev` - Start all apps in development mode
- `npm run build` - Build all apps
- `npm run api:dev` - Start only API
- `npm run web:dev` - Start only web app
- `npm run lint` - Run ESLint on all apps
- `npm run format` - Format code with Prettier

## API Documentation

Swagger/OpenAPI docs available at: http://localhost:4000/api/docs

## Schema Overview

- **Master Data**: Quality, Machine, Khata, Location
- **People**: Customer, Supplier, Broker, JobWorker, Worker
- **Production**: Yarn, Cartoon, Beam, GreyProduction
- **Inventory**: YarnStock, GreyStock, FabricStock, FoldingEntry, RfdConversion
- **Trading**: SalesOrder, Invoice, SalesReturn, Payment
