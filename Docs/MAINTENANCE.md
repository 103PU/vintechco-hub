# Maintenance & Operations

## 1. 👨‍💻 Development Guide

### Setup
Ensure `.env` is configured (see `.env.example`).
```bash
npm install
npx prisma generate
npm run dev
```

### Contributing
- **Branching**: `feat/feature-name` or `fix/bug-name`.
- **Commits**: Conventional Commits (`feat: ...`, `fix: ...`).
- **PRs**: Must pass CI guidelines (No lint errors, Tests passed).

### Scripts
- `npm run db:seed`: Reset and seed initial Department/Category data.
- `npm run db:cleanup`: Remove orphaned tags or temp data.
- `npm run import:data`: Legacy import tool (use with caution).

## 2. 🧪 Testing Strategy
See `TEST_VERIFICATION_PLAN.md` (if available) for detailed matrix.

### Commands
- **Unit/Integration**: `npm test` (Jest).
- **E2E**: `npm run test:e2e` (Playwright).
- **Manual**: Verify RBAC by logging in as Technician vs Admin.

### Core Test Cases
1.  **Auth**: Try to access Admin pages as Guest/Student -> Must redirect.
2.  **CRUD**: Create Document -> Verify DB -> Verify UI List.
3.  **Validation**: Submit empty form -> Verify Error Message (in Vietnamese).

## 3. 🚀 Deployment

### Production Checklist
- [ ] **Env Vars**: Set `NEXTAUTH_SECRET`, `DATABASE_URL` (Prod), `GOOGLE_CLIENT_*`.
- [ ] **Build**: Run `npm run build` locally to ensure no errors.
- [ ] **Middleware**: Uncomment auth checks in `src/middleware.ts`.
- [ ] **Database**: Run `npx prisma migrate deploy`.

### Troubleshooting
- **Build Fails**: Check TypeScript errors (`npm run typecheck` if configured, or just build).
- **Login Fails**: Check Google Console redirect URIs and `NEXTAUTH_URL`.
- **Database Error**: Check connection string and allow-listed IPs.
