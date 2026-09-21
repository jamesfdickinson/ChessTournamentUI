# ChessUI Agent Guide

## Purpose
- Vue 2 frontend for TournamentJD / Chess Tournament.
- Mobile-first web UI used for tournament administration, pairings, score entry, reports, notifications, and live tournament views.
- Backend dependency is the ChessAPI project.

## Stack
- Vue 2.7 with Vue Router 3.
- Axios-based service layer in `src/services/`.
- SignalR / socket-style realtime updates through notification-related services.
- Build scripts use `vue-cli-service` with `NODE_OPTIONS=--openssl-legacy-provider`.

## Important Entry Points
- `src/main.js`: app bootstrap, analytics, authentication, notification wiring, router guards, realtime reconnect behavior.
- `src/router.js`: route table and high-level page structure.
- `src/services/`: API, auth, notification, socket, and utility services.
- `src/views/`: route-backed screens.
- `src/components/`: reusable UI pieces and layouts.
- `public/` and `www/`: static assets and built web artifacts.

## Working Style
- Prefer small, local fixes over broad refactors.
- Preserve existing route names, URL shapes, and API contracts unless the task explicitly requires changing them.
- Search for existing service or component patterns before introducing new abstractions.
- When changing a view, check the related service and route behavior.
- When changing realtime or notification behavior, inspect both socket services and the event flow in `main.js`.

## UI Conventions
- Follow the existing Vue 2 Options API style used in the repo.
- Reuse existing services in `src/services/` instead of duplicating HTTP or auth logic.
- Keep changes compatible with mobile layouts and existing static hosting/Cordova usage.
- Avoid introducing new frontend frameworks, state libraries, or major dependencies without clear need.

## Validation
- For frontend changes, prefer verifying with `npm run build`.
- Treat build output and runtime errors as part of the task context when debugging.

## Avoid
- Do not edit generated/build output in `www/` unless the task is specifically about built artifacts.
- Do not move large groups of routes, views, or assets without a clear requirement.
- Do not replace existing service patterns with a new architecture as part of a small fix.