# Get Started

Welcome to the **Reloadly Node SDK** documentation.

This guide will help you quickly set up and start using the SDK to interact with Reloadly’s APIs for **Airtime**, **GiftCards**, and **Utility Payments**.

## Prerequisites

Before you begin, make sure you have:

- A Reloadly account with API credentials (`clientId` and `clientSecret`)
- Node.js (v16 or higher recommended)
- Package manager (npm, yarn, or pnpm)

## Installation

Install the SDK using your preferred package manager:

```bash
npm install reloadly-node
```

**_or_**

```bash
yarn add reloadly-node
```

**_or_**

```bash
pnpm install reloadly-node
```

## Initialization

Create a new instance of the SDK by providing your credentials and environment:

```ts
import { Reloadly } from 'reloadly-node';

const reloadly = new Reloadly({
  clientId: process.env.RELOADLY_CLIENT_ID!,
  clientSecret: process.env.RELOADLY_CLIENT_SECRET!,
  environment: 'sandbox', // or 'production'
});
```

## Basic Usage

### Airtime

```ts
const airtimeBalance = await reloadly.airtime.getBalance();
console.log('Airtime Balance:', airtimeBalance);
```

### GiftCards

```ts
const products = await reloadly.giftcards.getProducts();
console.log('GiftCards Products:', products);
```

### Utility Payments

```ts
const billers = await reloadly.utilityPayments.getBillers();
console.log('Utility Billers:', billers);
```

## Next Steps

Now that you have the SDK installed and initialized, here are some suggested paths to continue:

- **Airtime**
  - Explore endpoints for balance, operators, FX rates, promotions, and top-ups.
  - Example: [View Account Balance](/airtime/account-balance/view-account-balance)

- **GiftCards**
  - Learn how to fetch categories, products, discounts, and place orders.
  - Example: [Get Products](/giftcards/products/get-products)

- **Utility Payments**
  - Discover billers, pay bills, and track transactions.
  - Example: [Get Billers](/utility-payment/utility-billers/get-billers)

- **Authentication & Tokens**
  - Review how per-service token management works and how tokens are refreshed automatically.

- **Sandbox vs Production**
  - Test safely in the sandbox environment before switching to production.

Continue by browsing the sidebar for detailed API references and code samples for each service.
