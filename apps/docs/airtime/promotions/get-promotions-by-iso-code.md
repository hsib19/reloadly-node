# Get Promotions by ISO Code

The Reloadly Node SDK allows you to fetch available promotions for operators in a specific country using its ISO code.

Authentication and token refresh are handled automatically by the SDK.

## Path Parameters

| Parameter     | Type   | Required | Description                                                       | Example |
| ------------- | ------ | -------- | ----------------------------------------------------------------- | ------- |
| `countryCode` | String | Yes      | The ISO code of the country whose promotions are to be retrieved. | US      |

## Query Parameters

| Parameter      | Type   | Description                                                                                                                                                        | Default | Example |
| -------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------- | ------- |
| `languageCode` | String | Language code (ISO 639-1) for promotion information. Choices: `EN`, `ES`, `FR`, `IT`, `PT`, `ZH`, `AR`, `HI`, `HT`, `JA`, `DE`. Default is `EN`. Case-insensitive. | EN      | EN      |

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
    const getPromotionsByISO = await reloadlySDK.airtime.getPromotionsByISO({
      path: {
        countryCode: 'US',
      },
      query: {
        languageCode: 'EN',
      },
    });

    console.log('Promotions in US:', getPromotionsByISO);
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
- Path parameter `countryCode` is **required** to specify the country whose promotions you want to retrieve.
- Query parameter `languageCode` is optional and allows localization of promotion details in ISO 639-1 format (e.g., `EN`, `ES`, `FR`).
- Token creation, storage, and automatic refresh are handled by the SDK.
- The SDK automatically applies the correct `Accept` headers required for Airtime requests.
- Error handling with `ReloadlyAPIError` ensures you can capture API-specific issues and unexpected runtime errors.
- Useful for retrieving localized promotions available in a specific country before performing top-ups.
