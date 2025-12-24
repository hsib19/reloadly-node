# Get Promotions

The Reloadly Node SDK allows you to fetch available promotions for operators.

Authentication and token refresh are handled automatically by the SDK.

## Query Parameters

| Parameter      | Type    | Description                                                                                                                                                        | Default | Example |
| -------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------- | ------- |
| `size`         | Integer | Number of promotions to be retrieved per page.                                                                                                                     | 200     | 10      |
| `page`         | Integer | Page number of the promotions list to retrieve.                                                                                                                    | 1       | 1       |
| `languageCode` | String  | Language code (ISO 639-1) for promotion information. Choices: `EN`, `ES`, `FR`, `IT`, `PT`, `ZH`, `AR`, `HI`, `HT`, `JA`, `DE`. Default is `EN`. Case-insensitive. | EN      | EN      |

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
    const promotions = await reloadlySDK.airtime.getPromotions({
      size: 10,
      page: 1,
      languageCode: 'EN',
    });

    console.log('Promotions:', promotions);
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
  "content": [
    {
      "promotionId": 1,
      "operatorId": 129,
      "title": "Tigo El Salvador From 25 Jun 2018 00:00 To 25 July...",
      "title2": "Get 500 MB and 150 minutes for USA or Canada",
      "description": "For top ups of $10 or more, customer...",
      "startDate": "Mon, 25 Jun 2018 06:00:00 +0000",
      "endDate": "Tue, 26 Jun 2018 05:59:00 +0000",
      "denominations": "USD 10 and up",
      "localDenominations": null
    },
    {},
    {}
  ]
}
```

## Notes

- Works for both **sandbox** and **production** environments.
- Query parameters `size`, `page`, and `languageCode` are optional and allow pagination and localization of promotions.
- `languageCode` must follow ISO 639-1 format and is case-insensitive (e.g., `EN`, `ES`, `FR`).
- Token creation, storage, and automatic refresh are handled by the SDK.
- The SDK automatically applies the correct `Accept` headers required for Airtime requests.
- Error handling with `ReloadlyAPIError` ensures you can capture API-specific issues and unexpected runtime errors.
- Useful for retrieving operator promotions and displaying localized offers to end-users before performing top-ups.
