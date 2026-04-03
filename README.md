# BayaniHub Web (End-User Login)

Next.js web app for BayaniHub end-users with a NestJS + Supabase backend.

## Tech Stack

- **Frontend:** Next.js 15 (App Router) + TypeScript
- **Backend:** NestJS 10 + Supabase (Auth, Database, Storage)
- **Validation:** class-validator DTOs with global ValidationPipe
- **File Upload:** Multer + magic-byte verification

## Project Structure

```text
Web End-User (Login)/
├── app/                        # Next.js App Router pages
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Home page
│   ├── login/
│   │   └── page.tsx            # Login page
│   ├── signup/
│   │   ├── page.tsx            # Registration page
│   │   └── review/
│   │       └── page.tsx        # Signup review screen
│   ├── forgot-password/
│   │   └── page.tsx            # Password reset page
│   ├── dashboard/              # Post-login dashboard
│   └── accountmngmt/
│       └── page.tsx            # Account management page
├── components/
│   ├── auth/                   # Login form, signup form, etc.
│   ├── dashboard/              # Dashboard components
│   └── marketing/              # Marketing / landing page components
├── lib/
│   └── auth-context.tsx        # AuthContext — login/signup/logout + localStorage persistence
├── backend/                    # NestJS API (port 3001)
│   └── src/
│       ├── main.ts             # Bootstrap, CORS, global prefix /api/v1
│       ├── app.module.ts       # Root module (Supabase + Auth modules)
│       ├── auth/
│       │   ├── auth.controller.ts   # /register, /login, /profile endpoints
│       │   ├── auth.service.ts      # 3-step saga registration with rollback
│       │   ├── dto/
│       │   │   ├── create-user.dto.ts  # Registration validation
│       │   │   └── login-user.dto.ts   # Login validation
│       │   └── guards/
│       │       └── supabase-auth.guard.ts  # JWT verification guard
│       ├── supabase/
│       │   ├── supabase.module.ts   # Global Supabase provider
│       │   └── supabase.service.ts  # getClient(), getAnonKey(), getUrl()
│       └── common/
│           └── pipes/
│               └── file-validation.pipe.ts  # MIME + magic-byte file validation
├── public/                     # Static assets
├── scripts/                    # Build/dev utility scripts
├── package.json                # Frontend dependencies
└── tsconfig.json
```

## Prerequisites

- Node.js
- A Supabase project with:
  - `user_profiles` table
  - `identity-documents` storage bucket
  - Email auth enabled

## Install

```bash
# Frontend
cd "Web End-User (Login)"
npm install

# Backend
cd backend
npm install
```

## Environment Variables

Create `backend/.env`:

```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
SUPABASE_ANON_KEY=your-anon-key
FRONTEND_URL=http://localhost:3000
PORT=3001
```

## Run

```bash
# Backend (port 3001)
cd backend
npm run start:dev

# Frontend (port 3000) — in separate terminal
cd "Web End-User (Login)"
npm run dev
```

## Auth API Endpoints

All endpoints are under `/api/v1/auth`.

| Endpoint | Method | Auth | Description |
|---|---|---|---|
| `/api/v1/auth/register` | POST (multipart) | None | Creates Supabase auth user → uploads ID document to storage → inserts `user_profiles` row. Automatic rollback on failure. |
| `/api/v1/auth/login` | POST | None | `{ email, password }` → Supabase `signInWithPassword` → returns `{ access_token, refresh_token, expires_at, user }` with profile. |
| `/api/v1/auth/profile` | GET | Bearer JWT | Validates Supabase JWT → returns the user's `user_profiles` row. |

### Registration Fields (CreateUserDto)

| Field | Type | Required | Notes |
|---|---|---|---|
| `email` | string | Yes | Valid email |
| `password` | string | Yes | 6–72 characters |
| `first_name` | string | Yes | Max 100 chars |
| `last_name` | string | Yes | Max 100 chars |
| `phone` | string | Yes | PH format, auto-normalized to E.164 |
| `dob` | string | Yes | ISO date (YYYY-MM-DD) |
| `address` | string | No | Max 255 chars |
| `barangay` | string | No | Max 100 chars |
| `municipality` | string | No | Max 100 chars |
| `province` | string | No | Max 100 chars |
| `id_document` | file | Yes | JPG/PNG/PDF, max 10MB, magic-byte verified |

### Login Response Shape

```json
{
  "access_token": "eyJ...",
  "refresh_token": "abc...",
  "expires_at": 1234567890,
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "profile": {
      "auth_user_id": "uuid",
      "first_name": "John",
      "last_name": "Doe",
      "phone": "+639171234567",
      "is_verified": false,
      "role": "end_user"
    }
  }
}
```

## Pages

| Route | Description |
|---|---|
| `/` | Home / landing page |
| `/login` | Email + password login |
| `/signup` | Multi-field registration with ID upload |
| `/signup/review` | Review details before submitting |
| `/forgot-password` | Password reset (email-based) |
| `/dashboard` | Protected — main user dashboard |
| `/accountmngmt` | Account management (profile editing) |

## Shared Backend

The Mobile End-User app (`Mobile End-User (Login)/`) uses the **same backend**. Both apps call the same `/api/v1/auth/*` endpoints. Only this project contains the backend code — the mobile app points to it via `src/lib/api.ts`.
