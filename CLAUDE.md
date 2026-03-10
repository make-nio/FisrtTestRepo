# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This is a minimal experimental/sandbox repository ("Proyecto de Prueba") intended for exploring development tools, version control workflows, and technology experimentation. It currently contains no source code or build configuration.

## Repository Purpose

- Testing version control workflows
- Experimenting with different technologies and libraries
- Validating development environment configurations

## Current State

This is a monorepo with two packages:

- [backend/](backend/) — Node.js + TypeScript + Express API with Prisma ORM and SQL Server. Runs on port 3000.
- [frontend/](frontend/) — Next.js 14 + Tailwind CSS app. Runs on port 3001. Consumes the backend API.

### Backend
- Entry: [backend/src/index.ts](backend/src/index.ts)
- Routes: [backend/src/routes/menu.ts](backend/src/routes/menu.ts)
- Schema: [backend/prisma/schema.prisma](backend/prisma/schema.prisma)
- Use `prisma db push` instead of `prisma migrate dev` (user lacks shadow DB permissions on SQL Server)

### Frontend
- Entry: [frontend/src/app/page.tsx](frontend/src/app/page.tsx)
- API client: [frontend/src/lib/api.ts](frontend/src/lib/api.ts)
- Types: [frontend/src/lib/types.ts](frontend/src/lib/types.ts)
- API URL configured in `frontend/.env.local` via `NEXT_PUBLIC_API_URL`

## Git Workflow

For every task:

1. Create a new branch named after the feature/task (e.g. `add-auth`, `fix-price-validation`)
2. Commit changes with a descriptive message
3. Open a PR to `master`
4. Merge to `master` automatically — no confirmation needed

**Notes:**
- `master` is protected; all changes go through PRs
- gh CLI is available at `/c/Program Files/GitHub CLI/gh.exe` — always add it to PATH: `export PATH="$PATH:/c/Program Files/GitHub CLI"`
- Use `prisma db push` instead of `prisma migrate dev` (user lacks shadow DB permissions on SQL Server)
