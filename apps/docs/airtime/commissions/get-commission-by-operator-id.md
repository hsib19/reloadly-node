# Get Commission by Operator ID

The Reloadly Node SDK allows you to fetch commission (discount) details for a specific operator by its ID.

Authentication and token refresh are handled automatically by the SDK.

## Path Parameters

| Parameter    | Type    | Required | Description                           | Example |
| ------------ | ------- | -------- | ------------------------------------- | ------- |
| `operatorId` | Integer | Yes      | The operator's identification number. | 341     |

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
    const commission = await reloadlySDK.airtime.getCommissionByOperatorId({
      path: {
        operatorId: 341,
      },
    });

    console.log('Commission details:', commission);
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
{
  "operator": {
    "operatorId": 1,
    "name": "Afghan Wireless Afghanistan",
    "countryCode": "AF",
    "status": true,
    "bundle": false
  },
  "percentage": 10,
  "internationalPercentage": 10,
  "localPercentage": 0,
  "updatedAt": "2021-06-26 03:36:16"
}
```

## Notes

- Works for both **sandbox** and **production** environments.
- Path parameter `operatorId` is **required** to identify the operator.
- Token creation, storage, and automatic refresh are handled by the SDK.
- The SDK automatically applies the correct `Accept` headers required for Airtime requests.
- Error handling with `ReloadlyAPIError` ensures you can capture API-specific issues and unexpected runtime errors.
- Useful for retrieving operator-specific discount information before performing top-ups, helping you calculate potential savings.
