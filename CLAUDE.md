# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This is a minimal experimental/sandbox repository ("Proyecto de Prueba") intended for exploring development tools, version control workflows, and technology experimentation. It currently contains no source code or build configuration.

## Repository Purpose

- Testing version control workflows
- Experimenting with different technologies and libraries
- Validating development environment configurations

## Current State

This repo now contains a Node.js + TypeScript + Express API with Prisma ORM and SQL Server. See [src/](src/) for the source and [prisma/schema.prisma](prisma/schema.prisma) for the data model.

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
