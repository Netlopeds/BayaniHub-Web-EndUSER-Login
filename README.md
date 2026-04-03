# BayaniHub Workspace

This repository now contains a real two-app structure you can extend:

- `apps/web`: Next.js App Router project for the browser
- `apps/mobile`: Expo Router project for Android, iOS, and Expo web

The original standalone files are still in the root for reference:

- `LoginPage.tsx`
- `LoginScreen.tsx`
- `preview.html`

## Included flows

Both apps now include:

- Login
- Sign up
- Forgot password
- Dashboard
- Account Management (New)
- Mock auth state so the flow works without a backend yet

### Demo login

- Email: `demo@bayanihub.app`
- Password: `password123`

You can also create a new account in each app and continue to the dashboard.

## Project structure

```text
.
├── apps
│   ├── mobile
│   │   ├── app
│   │   └── src
│   └── web
│       ├── app
│       ├── components
│       └── lib
├── LoginPage.tsx
├── LoginScreen.tsx
└── preview.html
```

## Install

From the repository root:

```bash
npm install
```

## Run the web app

```bash
npm run dev:web
```

Then open `http://localhost:3000`.

### Direct Access Screens
Some screens are currently only accessible via direct URL input while navigation is being developed:
- Account Management: `http://localhost:3000/accountmngmt`

## Run the mobile app

```bash
npm run dev:mobile
```

Then use Expo to open Android, iOS, or web.

## Where to add more pages

### Web

Add routes in `apps/web/app`.

Examples:

- `apps/web/app/profile/page.tsx`
- `apps/web/app/requests/page.tsx`
- `apps/web/app/settings/page.tsx`

### Mobile

Add screens in `apps/mobile/app`.

Examples:

- `apps/mobile/app/profile.tsx`
- `apps/mobile/app/requests.tsx`
- `apps/mobile/app/settings.tsx`

Shared mobile UI can live under `apps/mobile/src`.

## Replacing mock auth with a real backend

### Web

Auth state lives in `apps/web/lib/auth-context.tsx`.

### Mobile

Auth state lives in `apps/mobile/src/providers/auth-provider.tsx`.

Replace the mock `login` and `signup` functions there with your real API calls.
