# Authentication

Reloadly provides an official Node.js package, but its authentication flow can feel complex.  
This SDK simplifies the process by automatically handling token creation, storage, and refresh — so you can focus on building features instead of managing OAuth manually.

## How It Works

- **Automatic Token Creation**  
  On initialization, the SDK requests an access token from Reloadly using your `clientId` and `clientSecret`.

- **Token Manager**  
  The token is stored in an internal manager. You don’t need to manually cache or persist tokens.

- **Auto Refresh**  
  When a token expires, the SDK automatically refreshes it behind the scenes. No more `401 Unauthorized` errors due to expired tokens.

- **Per-Service Headers**  
  Reloadly requires different `Accept` headers depending on the service (Airtime, GiftCards, Utility Payments).  
  The SDK automatically sets the correct headers for each request.

## Example

```ts
import { Reloadly } from 'reloadly-node';

const reloadly = new Reloadly({
  clientId: process.env.RELOADLY_CLIENT_ID!,
  clientSecret: process.env.RELOADLY_CLIENT_SECRET!,
  environment: 'sandbox', // or 'production'
});

// Airtime: token + headers handled automatically
const balance = await reloadly.airtime.getBalance();
console.log('Airtime Balance:', balance);

// GiftCards: correct Accept header applied automatically
const products = await reloadly.giftcards.getProducts();
console.log('GiftCards Products:', products);

// Utility Payments: token refresh handled seamlessly
const billers = await reloadly.utilityPayments.getBillers();
console.log('Utility Billers:', billers);
```

## Benefits

- No manual token management
- No need to worry about expired tokens
- Correct headers applied per service
- Focus entirely on API usage and business logic

## Behind the Scenes

- **OAuth 2.0 Client Credentials Flow**  
  The SDK uses Reloadly’s OAuth endpoint to obtain tokens.

- **Token Manager**  
  Keeps track of expiry times and refreshes automatically.

- **Service-Specific Configuration**  
  Each service (Airtime, GiftCards, Utility Payments) has its own base URL and required headers. The SDK abstracts this complexity.
