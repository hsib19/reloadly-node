import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Reloadly Node (Unofficial)",
  description: "Documentation for the unofficial Node.js SDK to integrate Reloadly APIs for airtime, top-ups, and gift cards.",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      {
        text: 'v1.0.2',
        items: [
          { text: 'Current (1.0.2)', link: '' },
        ]
      },
      {
        text: 'Official Docs',
        link: 'https://developers.reloadly.com/'
      },
      {
        text: 'More',
        items: [
          { text: 'Changelog', link: 'https://github.com/hsib19/reloadly-node/blob/main/CHANGELOG.md' },
          { text: 'Contributing', link: 'https://github.com/hsib19/reloadly-node/blob/main/CONTRIBUTING.md' },
        ]
      }
    ],

    sidebar: [
      {
        text: 'Introduction',
        items: [
          { text: 'Get Started', link: '/get-started' },
          { text: 'Authentication', link: '/authentication' },
          { text: 'Error Handling', link: '/error-handling' },
        ]
      },
      {
        text: 'Airtime',
        items: [
          {
            text: 'Account Balance',
            collapsed: true,
            items: [
              { text: 'View Account Balance', link: '/airtime/account-balance/view-account-balance' },
            ]
          },
          {
            text: 'Countries',
            collapsed: true,
            items: [
              { text: 'Get Countries', link: '/airtime/countries/get-countries' },
              { text: 'Get Country by ISO code', link: '/airtime/countries/get-country-by-iso-code' },
            ]
          },
          {
            text: 'Operators',
            collapsed: true,
            items: [
              { text: 'Get Operators', link: '/airtime/operators/get-operators' },
              { text: 'Get Operators by ID', link: '/airtime/operators/get-operator-by-id' },
              { text: 'Auto Detect Operator', link: '/airtime/operators/auto-detect-operator' },
              { text: 'Get Operator by ISO code', link: '/airtime/operators/get-operator-by-iso-code' },
            ]
          },
          {
            text: 'FX Rates',
            collapsed: true,
            items: [
              { text: 'Fetch FX Rates', link: '/airtime/fx-rates/fetch-fx-rates' },
            ]
          },
          {
            text: 'Commissions',
            collapsed: true,
            items: [
              { text: 'Get Commissions', link: '/airtime/commissions/get-commissions' },
              { text: 'Get Commission by Operator ID', link: '/airtime/commissions/get-commission-by-operator-id' },
            ]
          },
          {
            text: 'Promotions',
            collapsed: true,
            items: [
              { text: 'Get Promotions', link: '/airtime/promotions/get-promotions' },
              { text: 'Get Promotion by ID', link: '/airtime/promotions/get-promotion-by-id' },
              { text: 'Get Promotions by ISO Code', link: '/airtime/promotions/get-promotions-by-iso-code' },
              { text: 'Get Promotions by Operator ID', link: '/airtime/promotions/get-promotions-by-operator-id' },
            ]
          },
          {
            text: 'Top-ups',
            collapsed: true,
            items: [
              { text: 'Make Top-up', link: '/airtime/top-ups/make-top-up' },
              { text: 'Make Asynchronous Top-up', link: '/airtime/top-ups/make-asynchronous-top-up' },
              { text: 'Get Top-up Status', link: '/airtime/top-ups/get-top-up-status' },
            ]
          },
          {
            text: 'Transactions',
            collapsed: true,
            items: [
              { text: 'Get Transactions', link: '/airtime/transactions/get-transactions' },
              { text: 'Get Transaction by ID', link: '/airtime/transactions/get-transaction-by-id' },
            ]
          },
          {
            text: 'MNP Lookup',
            collapsed: true,
            items: [
              { text: 'MNP Lookup - GET', link: '/airtime/mnp-lookup/mnp-lookup-get' },
              { text: 'MNP Lookup - POST', link: '/airtime/mnp-lookup/mnp-lookup-post' },
            ]
          },
        ]
      },
      {
        text: 'Giftcards',
        items: [
          {
            text: 'Account Balance',
            collapsed: true,
            items: [
              { text: 'View Account Balance', link: '/giftcards/account-balance/view-account-balance' },
            ]
          },
          {
            text: 'Categories',
            collapsed: true,
            items: [
              { text: 'Get Categories', link: '/giftcards/categories/get-categories' },
            ]
          },
          {
            text: 'Countries',
            collapsed: true,
            items: [
              { text: 'Get Countries', link: '/giftcards/countries/get-countries' },
              { text: 'Get Country by ISO code', link: '/giftcards/countries/get-country-by-iso-code' },
            ]
          },
          {
            text: 'Products',
            collapsed: true,
            items: [
              { text: 'Get Products', link: '/giftcards/products/get-products' },
              { text: 'Get Product by ID', link: '/giftcards/products/get-product-by-id' },
              { text: 'Get Product by ISO Code', link: '/giftcards/products/get-product-by-iso-code' },
            ]
          },
          {
            text: 'Redeem Instructions',
            collapsed: true,
            items: [
              { text: 'Get Redeem Instructions', link: '/giftcards/redeem-instructions/get-redeem-instructions' },
              { text: 'Get Redeem Instructions by Product ID', link: '/giftcards/redeem-instructions/get-redeem-instructions-by-product-id' },
            ]
          },
          {
            text: 'FX Rates',
            collapsed: true,
            items: [
              { text: 'Fetch FX Rate', link: '/giftcards/fx-rates/fetch-fx-rate' },
            ]
          },
          {
            text: 'Discounts',
            collapsed: true,
            items: [
              { text: 'Get Discounts', link: '/giftcards/discounts/get-discounts' },
              { text: 'Get Discount by Product ID', link: '/giftcards/discounts/get-discount-by-product-id' },
            ]
          },
          {
            text: 'Transactions',
            collapsed: true,
            items: [
              { text: 'Get Transactions', link: '/giftcards/transactions/get-transactions' },
              { text: 'Get Transaction by ID', link: '/giftcards/transactions/get-transaction-by-id' },
            ]
          },
          {
            text: 'Orders',
            collapsed: true,
            items: [
              { text: 'Order Gift Card', link: '/giftcards/orders/order-gift-card' },
              { text: 'Get Redeem Code', link: '/giftcards/orders/get-redeem-code' },
            ]
          },
        ]
      },
      {
        text: 'Utility Payment',
        items: [
          {
            text: 'Account Balance',
            collapsed: true,
            items: [
              { text: 'View Account Balance', link: '/utility-payment/account-balance/view-account-balance' },
            ]
          },
          {
            text: 'Utility Billers',
            collapsed: true,
            items: [
              { text: 'Get Billers', link: '/utility-payment/utility-billers/get-billers' },
            ]
          },
          {
            text: 'Pay Bill',
            collapsed: true,
            items: [
              { text: 'Pay Bill', link: '/utility-payment/pay-bill/pay-bill' },
            ]
          },
          {
            text: 'Transactions',
            collapsed: true,
            items: [
              { text: 'Get Transactions', link: '/utility-payment/transactions/get-transactions' },
              { text: 'Get Transaction by ID', link: '/utility-payment/transactions/get-transaction-by-id' },
            ]
          },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/hsib19/reloadly-node' }
    ]
  }
})
