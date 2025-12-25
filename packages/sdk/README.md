# Reloadly Node SDK

![npm version](https://img.shields.io/npm/v/reloadly-node)
![npm downloads](https://img.shields.io/npm/dm/reloadly-node)
![license](https://img.shields.io/npm/l/reloadly-node)
![CI](https://github.com/hsib19/reloadly-node/actions/workflows/ci.yml/badge.svg)
![codecov](https://codecov.io/gh/hsib19/reloadly-node/branch/main/graph/badge.svg)
![typescript](https://img.shields.io/badge/types-TypeScript-blue)

A Node.js SDK for the [Reloadly API](https://www.reloadly.com/), providing type-safe access to **Airtime**, **Gift Cards**, and **Utility Payments** with automatic OAuth token management.

---

## Features

- **Per-Service Token Management**
  Each Reloadly service (Airtime, Gift Cards, Utilities) uses its own OAuth audience, preventing token conflicts and `INVALID_TOKEN` errors.

- **Single Entry Point for All Services**
  Access all Reloadly services from a single client instance.

- **Automatic Token Refresh**
  OAuth tokens are refreshed automatically when expired.

- **Environment-Aware Configuration**
  Seamlessly switch between `sandbox` and `production` environments.

- **Reusable HTTP Client**
  All requests automatically include:
  - `Authorization: Bearer <token>`
  - Correct `Accept` headers per service
  - JSON content handling

- **Full TypeScript Support**
  Strongly typed request and response models.

- **Broad API Coverage**
  - **Airtime**: Balance, Top-ups, Operators, FX Rates, Promotions, Transactions, MNP Lookup
  - **Gift Cards**: Balance, Categories, Products, Discounts, Orders, Transactions
  - **Utility Payments**: Billers, Payments, Balance, Transactions

- **Extensible Architecture**
  New services or endpoints can be added without modifying the core client.

---

## Requirements

- Node.js >= 18

---

## Installation

```bash
npm install reloadly-node
```

or

```bash
pnpm install reloadly-node
```

---

## Configuration

You need Reloadly API credentials:

- `RELOADLY_CLIENT_ID`
- `RELOADLY_CLIENT_SECRET`

These can be obtained from the Reloadly dashboard.

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

// Gift Cards
const products = await reloadly.giftcards.getProducts();
console.log('Gift Card Products:', products);

// Utility Payments
const billers = await reloadly.utilityPayments.getBillers();
console.log('Utility Billers:', billers);
```

---

## Error Handling

The SDK exposes typed error classes for consistent error handling.

```ts
import { ReloadlyAPIError, ReloadlyNetworkError } from 'reloadly-node';

try {
  await reloadly.airtime.getBalance();
} catch (error) {
  if (error instanceof ReloadlyAPIError) {
    console.error('API Error:', error.status, error.data);
  } else if (error instanceof ReloadlyNetworkError) {
    console.error('Network Error:', error.originalError);
  } else {
    console.error('Unexpected Error:', error);
  }
}
```

---

## Documentation

- Reloadly API Reference: [https://www.reloadly.com/developers](https://www.reloadly.com/developers)

---

## License

MIT
