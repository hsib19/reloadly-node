# Reloadly Node SDK

![npm version](https://img.shields.io/npm/v/reloadly-node)
![npm downloads](https://img.shields.io/npm/dm/reloadly-node)
![license](https://img.shields.io/npm/l/reloadly-node)
![CI](https://github.com/hsib19/reloadly-node/actions/workflows/ci.yml/badge.svg)
![codecov](https://codecov.io/gh/hsib19/reloadly-node/branch/main/graph/badge.svg)
![typescript](https://img.shields.io/badge/types-TypeScript-blue)

A custom Node.js SDK for [Reloadly API](https://www.reloadly.com/), supporting **Airtime**, **GiftCards**, and **Utility Payments** with TypeScript type-safety and per-service token management.

---

## Features

- **Per-Service Token Management**
  Automatically handles OAuth tokens for each service. No more `INVALID_TOKEN` errors.

- **Multi-Service Access via Single Instance**
  Access all services from one instance:

  ```ts
  const reloadly = new Reloadly({ clientId, clientSecret, environment: 'sandbox' });

  const airtimeBalance = await reloadly.airtime.getBalance();
  const giftcardsProducts = await reloadly.giftcards.getProducts();
  const billers = await reloadly.utilityPayments.getBillers();
  ```

- **Automatic Token Refresh**
  Tokens are automatically refreshed if expired.

- **Environment-Aware Base URLs**
  Sandbox / Production environment is automatically configured for all services.

- **Reusable HTTP Client with Auto Headers**
  Every request automatically includes the correct Bearer token and Accept headers.

- **Type-Safe Requests & Responses**
  Full TypeScript support with typed request and response objects.

- **Complete Coverage of Core Reloadly APIs**
  All important endpoints available in their respective service:
  - Airtime: Top-ups, Balance, Operators, FX Rates, Promotions, Transactions, MNP Lookup
  - GiftCards: Balance, Categories, Products, Discounts, Orders, Transactions
  - Utility Payments: Billers, Pay Bill, Balance, Transactions

- **Easy Extensibility**
  Add new services or custom endpoints without changing the core SDK.

---

## Installation

```bash
npm add reloadly-node
```

or

```bash
pnpm install reloadly-node
```

---

## Usage Example

```ts
import { Reloadly } from 'reloadly-node';

const reloadly = new Reloadly({
  clientId: process.env.RELOADLY_CLIENT_ID!,
  clientSecret: process.env.RELOADLY_CLIENT_SECRET!,
  environment: 'sandbox', // or 'production'
});

// Airtime
const airtimeBalance = await reloadly.airtime.getBalance();
console.log('Airtime Balance:', airtimeBalance);

// GiftCards
const giftcardsProducts = await reloadly.giftcards.getProducts();
console.log('GiftCards Products:', giftcardsProducts);

// Utility Payments
const billers = await reloadly.utilityPayments.getBillers();
console.log('Utility Billers:', billers);
```

---

## Development

```bash
# Build SDK
pnpm build:sdk

# Lint & Fix
pnpm lint
pnpm lint:fix

# Format Code
pnpm format
pnpm format:check
```
