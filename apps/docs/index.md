---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: 'Reloadly Node SDK'
  tagline: 'Documentation for the unofficial Node.js SDK to integrate Reloadly APIs for airtime, top-ups, and gift cards.'
  actions:
    - theme: brand
      text: Get Started
      link: /get-started

features:
  - title: Per-Service Token Management
    details: Automatically handles OAuth tokens for each service.
  - title: Multi-Service Access via Single Instance
    details: Access all services from one instance
  - title: Automatic Token Refresh
    details: Tokens are automatically refreshed if expired.
  - title: Environment-Aware Base URLs
    details: Sandbox / Production environment is automatically configured for all services.
  - title: Reusable HTTP Client with Auto Headers
    details: Every request automatically includes the correct Bearer token and Accept headers.
  - title: Type-Safe Requests & Responses
    details: Full TypeScript support with typed request and response objects.
---
