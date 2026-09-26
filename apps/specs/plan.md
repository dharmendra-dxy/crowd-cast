# CrowdCast — Implementation Plan

Stack: **Next.js** (frontend), **Express + Socket.IO** (backend/realtime), **PostgreSQL + Prisma** (data), **Redis** (introduced in Phase 3 for rate limiting, pub/sub, presence).

Guiding principle for every phase: get the **server-authoritative round state machine** and **duplicate-vote protection** right before adding anything else. Each sub-phase below is scoped so it can be built, tested, and demoed on its own before moving to the next.

---

## Phase 0 — Project Setup

### 0.1 Infrastructure & repo scaffold
- Monorepo or two-repo setup: `frontend` (Next.js), `backend` (Express + Socket.IO + Prisma).
- PostgreSQL instance (Docker for local dev).
- Prisma initialized with the core schema stubs: `Event`, `Candidate`, `Round`, `Vote` (fields can still evolve in Phase 1).
- Basic Express server with a health-check route.
- Basic Socket.IO server accepting connections, no business logic yet.
- CI basics: lint, type-check, build.

**Exit criteria:** backend and frontend boot, connect to the DB, and can talk to each other.

### 0.2 Admin auth scaffold
- Simple email/password or magic-link auth for the admin/organizer (doesn't need to be fancy for v1).
- Protected route middleware on the backend; a logged-in shell page on the frontend.

**Exit criteria:** an admin can sign up, log in, and reach an empty dashboard shell.

---

## Phase 1 — MVP (Core Voting Loop)

Split into six sub-phases so each layer (data → control → voting → realtime → public UI → admin UI) is independently testable.

### 1.1 Core data & CRUD APIs
- Finalize Prisma schema for `Event`, `Candidate`, `Round` (no `Vote` logic yet).
- REST endpoints: `POST/GET /events`, `GET/PATCH /events/:id`, `POST/GET /events/:eventId/candidates`, `POST/GET /events/:eventId/rounds`.
- Event gets a unique public `slug` on creation.
- No auth-gating nuance needed yet beyond "must be logged in as the event's admin."

**Exit criteria:** an admin can create an event, add candidates, and create rounds entirely via API/Postman — no voting, no realtime, no frontend yet.

### 1.2 Round lifecycle & control (admin-only, no public voting yet)
- Implement the round **state machine**: `DRAFT → READY → ACTIVE → ENDED → ARCHIVED`, enforced server-side.
- `POST /rounds/:id/start`, `POST /rounds/:id/stop`, `POST /rounds/:id/next`.
- `startedAt` / `endsAt` computed and stored server-side when a round starts.
- Reject invalid transitions (e.g., starting an already-`ACTIVE` round).

**Exit criteria:** an admin can drive a round through its full lifecycle via API calls, and the DB reflects correct status/timestamps at every step.

### 1.3 Anonymous voting & duplicate protection (REST only, no realtime yet)
- `GET /v/:slug` — public lookup of the event and its current active round.
- Anonymous voter identity: signed random voter-session cookie set on first visit.
- `POST /rounds/:id/vote`: validates round is `ACTIVE`, `now < endsAt`, score in range, candidate matches round.
- **Database uniqueness constraint** as the source of truth: `@@unique([roundId, voterSessionId])` on `Vote`.
- IP hashing (`SHA256(ip + serverSecret)`) stored alongside each vote for later abuse-detection use (not used to block anyone yet).
- Basic per-IP rate limiting on the vote endpoint (in-memory is fine here; replaced by Redis in Phase 3).

**Exit criteria:** a voter can hit the vote endpoint directly (e.g., via curl/Postman) and cannot submit twice for the same round, even with rapid repeated requests — verified with a basic concurrency test (e.g., firing 20 parallel requests from the same session).

### 1.4 Real-time layer (Socket.IO)
- Clients join an `event:{eventId}` room when connecting.
- Server emits `ROUND_STARTED` (with `candidate`, `startedAt`, `endsAt`), `ROUND_ENDED`, `NEXT_ROUND` on the corresponding admin actions from 1.2.
- Server emits `VOTE_COUNT_UPDATED` (aggregate count/average only — no voter identifiers) after each successful vote from 1.3.
- Client-side timer computed locally from `endsAt - now()`; **no per-second server broadcasts**.

**Exit criteria:** with two browser tabs open (one simulating admin actions via API calls, one connected as a voter), the voter tab updates live as rounds start/end and votes come in — before any real UI exists.

### 1.5 Public voting frontend
- `/v/[slug]` page: candidate name/image, rating input (1–10), countdown timer, submit button, and a clear post-vote confirmation / rejection state ("already voted," "voting closed").
- QR code generation for the event's public URL.

**Exit criteria:** a voter can scan a QR or open the link on a phone and vote through the actual UI, with the timer and vote confirmation working end-to-end.

### 1.6 Admin dashboard frontend & results
- `/dashboard/events/[id]`: create/edit candidates, create rounds, Start/Stop/Next controls.
- Live vote count and running average on the dashboard (via the sockets from 1.4).
- Results view per round and a final results summary once the event ends.

**Exit criteria:** an organizer can run an entire event — create it, add 2+ candidates, generate one link/QR, run sequential timed rounds, and see live and final results — without touching the API directly.

---

## Phase 2 — Real-Time Polish & Additional Trust Modes

### 2.1 Invite-only voting mode
- `VotingInvitation` model: `tokenHash` (never store the raw token), `status`, `expiresAt`, `usedAt`, optional `label`.
- Admin can generate N invitations or import a CSV of names/emails.
- Invitation grants access to the whole event; uniqueness enforced per `(roundId, invitationId)`.
- Optional: bind an invitation to the first device/session that uses it, flagging (not silently blocking) later use from a different device/IP.

**Exit criteria:** an admin can switch an event to invite-only mode, generate invitations, and each invitation votes independently with correct per-round uniqueness.

### 2.2 Verified voting mode (OTP)
- Email or phone OTP flow before voting.
- Ties a vote to a real identity (reuse the invitation model with an `email`/`phone` field, or a separate lightweight `VerifiedVoter` model).

**Exit criteria:** an event configured in verified mode requires OTP confirmation before the vote endpoint accepts a submission.

### 2.3 Presentation mode
- `/p/[slug]`: full-screen, read-only view for a shared display — candidate, timer, live count.

**Exit criteria:** the presentation view updates in real time in sync with the admin dashboard and public voting page.

### 2.4 Pause/Resume & reconnection handling
- Pause/Resume for a round: server holds `pausedAt` and remaining duration; timer recalculated on resume; broadcasts `ROUND_PAUSED` / `ROUND_RESUMED`.
- Reconnection handling: on socket reconnect, client re-fetches authoritative round state (via `GET /v/:slug` or a `SYNC` socket event) rather than assuming no events were missed.

**Exit criteria:** pausing/resuming works consistently across all connected clients, and a voter who briefly loses connection sees the correct current state on reconnect.

### 2.5 Blind voting & basic branding
- Admin-configurable toggle to hide running average/count from voters until the round ends.
- Event title, logo, and a couple of color options on the public voting page.

**Exit criteria:** blind mode correctly withholds aggregate data from public clients until round end; branding options are visibly reflected on `/v/[slug]`.

---

## Phase 3 — Backend Engineering Hardening

### 3.1 Redis: rate limiting & socket scaling
- Replace the in-memory rate limiter from 1.3 with a Redis-backed limiter keyed on `voter session + IP + round`.
- Add the Socket.IO Redis adapter so events emitted from one server instance reach clients connected to another.

**Exit criteria:** rate limiting persists correctly across server restarts, and events broadcast correctly across two backend instances behind a load balancer.

### 3.2 Presence tracking
- Track connected-voter count per event via Redis sets/counters.
- Surface "connected / voted / not yet voted" counts on the admin dashboard.

**Exit criteria:** connected-voter count on the dashboard accurately reflects real-time joins/disconnects.

### 3.3 Idempotent vote submission
- Client sends an `idempotencyKey` with each vote request.
- Retries (e.g., due to flaky connections) resolve to the same recorded vote rather than creating duplicates or erroring unpredictably.

**Exit criteria:** submitting the same vote request twice (simulating a retry) never produces two votes or an inconsistent error.

### 3.4 Concurrency edge cases & transactions
- Explicit, tested behavior for votes arriving at the exact moment a round ends or is manually stopped.
- Resolved via a DB transaction with the `now() < endsAt` check evaluated inside the transaction, not just at the API layer.

**Exit criteria:** a scripted burst of concurrent votes timed around round-end never over-accepts or double-counts.

### 3.5 Audit log
- Record every meaningful admin action (`ROUND_STARTED`, `ROUND_ENDED`, `CANDIDATE_ADDED`, `INVITATION_REVOKED`, etc.) with actor, timestamp, and metadata.

**Exit criteria:** a full event run produces a readable, ordered audit trail.

### 3.6 Background jobs & scheduled rounds
- Lightweight worker (or scheduled Node job) for scheduled round auto-start and cleanup tasks (e.g., expiring invitations).

**Exit criteria:** a round configured with a future start time begins automatically without manual admin action.

### 3.7 Load & concurrency testing
- Script that fires many simultaneous vote submissions for the same voter/round to confirm the unique constraint holds under real load, not just small manual tests.

**Exit criteria:** load test report showing zero duplicate votes and correct rejection behavior at scale.

---

## Phase 4 — Advanced / Differentiating Features

Pick a subset based on time/interest rather than building all of it — depth on 2–3 beats shipping all of them shallowly.

### 4.1 Fraud/risk scoring & CAPTCHA escalation
- Combine IP frequency, device/browser fingerprint signals, submission velocity, and token reuse into a simple risk score.
- Escalate medium-risk voters to a CAPTCHA instead of outright blocking.

### 4.2 Weighted voting & additional rating types
- Per-voter or per-role weight (e.g., judge vs. audience); results computed as `Σ(score × weight) / Σ(weight)`.
- Generalize the `Vote` model beyond a numeric score: Yes/No, single-choice, multiple-choice, ranking.

### 4.3 Live leaderboard & RBAC
- Live leaderboard across candidates, with an admin toggle for when it's revealed.
- Multiple admin roles (Owner / Admin / Moderator / Viewer) with scoped permissions.

### 4.4 Event templates & export
- Pre-configured voting type, duration, and security mode for common use cases (employee awards, presentation evaluation, audience poll, etc.).
- CSV export of full results and per-round vote distributions; Excel/PDF as stretch.

### 4.5 Analytics dashboard & event replay
- Participation rate per round, peak concurrent voters, votes/sec, rejected/suspicious vote counts.
- Reconstruct a round's vote-arrival timeline from stored events for post-event review.

### 4.6 Multi-room/stage support
- Sub-rooms within a single event (`event:{id}:room:{roomId}`) for large venues with parallel voting sessions.

**Exit criteria (per feature chosen):** each selected feature is fully working end-to-end and demoable on its own.

---

## Suggested Build Order Summary

| Phase | Sub-phases | Must-have before moving on |
|---|---|---|
| 0 | Infra + auth scaffold | Backend/frontend/DB connected; admin can log in |
| 1 | Data/CRUD → round control → voting+dedup → realtime → public UI → admin UI | Full MVP loop working end-to-end through real UI |
| 2 | Invite mode → OTP mode → presentation mode → pause/resume+reconnect → blind voting/branding | All three trust modes usable; state survives disconnects |
| 3 | Redis rate-limit/scaling → presence → idempotency → concurrency → audit log → jobs → load test | Correctness holds under concurrency and multi-instance load |
| 4 | Pick 2–3 of: fraud scoring, weighted/rating types, leaderboard/RBAC, templates/export, analytics/replay, multi-room | Chosen features built deep, not shallow |

This ordering keeps the riskiest part of the system — the **round state machine and duplicate-vote prevention** — fully proven out (1.1 through 1.4) before any UI work begins, so later phases build on a foundation that's already known to be correct.