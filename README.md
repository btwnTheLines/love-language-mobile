# Love Language Mobile

Backend service for the Love Language mobile app (React Native + Expo, planned).

## Status

Early development. The API is unstable, undeployed, and undocumented on purpose — docs will be written once the mobile-first API settles.

## Local development

Requires Node.js and a local PostgreSQL database.

```bash
npm install
```

Configure a local `.env` (gitignored — never commit it; see `src/` for the variables used), then:

```bash
npm run dev   # nodemon, auto-restart
npm start     # plain node
```

## Roadmap

- Mobile-first API rework
- Database migrations and seed scripts
- Tests and CI
- React Native (Expo) client
