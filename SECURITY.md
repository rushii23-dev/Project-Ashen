# Security Policy

The Ashen team takes the security of this project seriously. This document
describes the security posture of the application and how to report issues.

## Supported Versions

The latest release on the `main` branch is actively maintained and receives
security fixes.

## Reporting a Vulnerability

If you discover a security vulnerability, please **do not** open a public issue.
Instead, report it privately:

1. Use GitHub's [private vulnerability reporting](https://docs.github.com/en/code-security/security-advisories/guidance-on-reporting-and-writing-information-about-vulnerabilities/privately-reporting-a-security-vulnerability)
   ("Report a vulnerability" under the repository's **Security** tab), or
2. Email the maintainers directly.

Please include reproduction steps and impact. We aim to acknowledge reports
within 72 hours and to ship a fix or mitigation as quickly as is practical.

## Security Measures in Place

This is a fully static single-page application with **no backend, no database,
no authentication, and no user data persistence** — the carbon calculation runs
entirely in the browser. This dramatically reduces the attack surface.

Defense-in-depth measures shipped with the app:

### Transport & headers (see `nginx.conf`)

- **Content-Security-Policy** with `default-src 'self'`, no `'unsafe-inline'`
  for scripts, `object-src 'none'`, `frame-ancestors 'none'`, and
  `upgrade-insecure-requests`.
- **Strict-Transport-Security** (HSTS) with a 2-year max-age and `preload`.
- `X-Content-Type-Options: nosniff`, `X-Frame-Options: SAMEORIGIN`,
  `Referrer-Policy: strict-origin-when-cross-origin`.
- **Cross-Origin-Opener-Policy** and **Cross-Origin-Resource-Policy** set to
  `same-origin`.
- A restrictive **Permissions-Policy** disabling geolocation, camera,
  microphone, payment, and USB.
- `server_tokens off` so the server never advertises its version.
- Hidden/dotfiles are denied.

### Container (see `Dockerfile`)

- Multi-stage build: the final image contains only static assets and nginx —
  no source, no `node_modules`, no build toolchain.
- Runs as a **non-root** user (uid 101) via `nginxinc/nginx-unprivileged`.
- Dependencies installed with `npm ci --ignore-scripts` (no lifecycle scripts).
- A `HEALTHCHECK` verifies the container is serving traffic.

### Supply chain

- Exact, reproducible installs via `package-lock.json` + `npm ci`.
- `npm audit --audit-level=high` runs in CI and fails the build on high/critical
  advisories.
- A pinned `overrides` entry keeps transitive dependencies on patched versions.

## Verifying Locally

```bash
npm run audit:ci   # fail on high/critical advisories
npm run verify     # typecheck, lint, format, tests + coverage, audit, build
```
