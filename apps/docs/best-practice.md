# Best Practices – Reloadly SDK Integration

This guide outlines recommended practices for integrating the Reloadly SDK in a Node.js + TypeScript project. It’s based on the folder structure and code patterns used in this repository.

## 1. Recommended Folder Structure

```bash
src/
├── api/
│   ├── airtime/
│   ├── giftcards/
│   └── utility-payment/
├── config/
│   └── env.ts
├── reloadly-sdk/
│   └── reloadly-sdk.ts
```

- `api/`: Contains logic for each Reloadly service (airtime, gift cards, utility payments).
- `config/`: Stores environment configuration and helper functions.
- `reloadly-sdk/`: Centralized SDK initialization.

## 2. Environment Variable Management

Use a helper function to enforce required environment variables:

```ts
import 'dotenv/config';

type ReloadlyEnv = 'sandbox' | 'production';

function requireEnv(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing environment variable: ${key}`);
  }
  return value;
}

export const env = {
  reloadly: {
    clientId: requireEnv('RELOADLY_CLIENT_ID'),
    clientSecret: requireEnv('RELOADLY_CLIENT_SECRET'),
    environment: (process.env.RELOADLY_ENV as ReloadlyEnv) ?? 'sandbox',
  },
} as const;
```

This prevents runtime errors due to missing credentials.

## 3. Centralized SDK Initialization

Create a single SDK instance and reuse it across your app:

```ts
import { Reloadly } from 'reloadly-node';
import { env } from '../config/env';

export const reloadlySDK = new Reloadly({
  clientId: env.reloadly.clientId,
  clientSecret: env.reloadly.clientSecret,
  environment: env.reloadly.environment,
});
```

## 4. Consistent Error Handling

Use `ReloadlyAPIError` to distinguish SDK errors from unexpected ones:

```ts
try {
  const balance = await reloadlySDK.airtime.getBalance();
  console.log(balance);
} catch (error) {
  if (error instanceof ReloadlyAPIError) {
    console.error(error.message);
    console.error(error.data);
  } else {
    console.error('Unexpected error:', error);
  }
}
```

## 5. Load .env Automatically

Add this line at the top of your entry file to load environment variables:

```ts
import 'dotenv/config';
```

No need to manually configure dotenv elsewhere.

## 6. Avoid Hardcoded Values

Always use environment variables for sensitive data like `clientId`, `clientSecret`, and `environment`.

Example `.env` file:

```env
RELOADLY_CLIENT_ID=your-client-id
RELOADLY_CLIENT_SECRET=your-client-secret
RELOADLY_ENV=sandbox
```

## 7. Use Reference IDs for Traceability

When placing transactions, include a referenceId to make it easier to track and query later.

## 8. Validate Payloads Before Sending

Ensure all required fields are present and valid before making API calls. This reduces failed requests and improves reliability.

## 9. Use TypeScript for Safer Code

Define strict types like:

```ts
type ReloadlyEnv = 'sandbox' | 'production';
```

This helps prevent typos and improves developer experience.

## 10. Log Key Events

Log important actions like balance checks, gift card orders, and bill payments. This helps with debugging and auditing.

---

By following these practices, your Reloadly integration will be more secure, maintainable, and developer-friendly.
