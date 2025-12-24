# Get Gift Card Categories

The Reloadly Node SDK allows you to fetch all available gift card categories.

Authentication and token refresh are handled automatically by the SDK.

## Example with Error Handling

```ts
import { Reloadly, ReloadlyAPIError } from 'reloadly-node';

const reloadlySDK = new Reloadly({
  clientId: process.env.RELOADLY_CLIENT_ID!,
  clientSecret: process.env.RELOADLY_CLIENT_SECRET!,
  environment: 'sandbox', // or "production"
});

async function main() {
  try {
    const categories = await reloadlySDK.giftcards.getCategories();

    console.log('Gift card categories:', categories);
  } catch (error) {
    if (error instanceof ReloadlyAPIError) {
      console.error('Reloadly API Error:', error.message);
      console.error('Error details:', error.data);
    } else {
      console.error('Unexpected error:', error);
    }
  }
}
```

## Response Example

```json
[
  {
    "id": 1,
    "name": "Finance"
  },
  {
    "id": 2,
    "name": "Software"
  },
  {},
  {}
]
```

## Notes

- Works for both **sandbox** and **production** environments.
- No path or query parameters are required; the request retrieves all available categories.
- The response includes category ID, name, and description.
- Token creation, storage, and automatic refresh are handled by the SDK.
- The SDK automatically applies the correct `Accept` headers required for Gift Card requests.
- Error handling with `ReloadlyAPIError` ensures you can capture API-specific issues and unexpected runtime errors.
- Useful for discovering available categories before filtering or searching for specific gift cards.
