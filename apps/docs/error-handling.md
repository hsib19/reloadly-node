# Error Handling

When working with APIs, errors can occur due to invalid requests, expired tokens, or server issues.

The Reloadly Node SDK provides a custom `ReloadlyAPIError` class to make error handling easier and more consistent.

For more details, check the official Reloadly API error documentation:  
[Reloadly API Docs – Error Handling](https://developers.reloadly.com)

## How It Works

- **ReloadlyAPIError**  
  All API-related errors are wrapped in this class. It contains:
  - `message`: a human-readable error message
  - `data`: the full error payload returned by Reloadly API

- **Unexpected Errors**  
  Any other runtime or system errors (e.g., network issues, coding mistakes) are caught separately.

## Example

```ts
import { ReloadlyAPIError } from 'reloadly-node';

try {
  const balance = await reloadlySDK.airtime.getBalance();
  console.log(balance);
} catch (error) {
  if (error instanceof ReloadlyAPIError) {
    // Handle Reloadly API errors
    console.error('Reloadly API Error:', error.message);
    console.error('Error details:', error.data);
  } else {
    // Handle unexpected errors
    console.error('Unexpected error:', error);
  }
}
```
