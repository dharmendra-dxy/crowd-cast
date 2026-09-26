# CrowdCast — Product Requirements Document

## 1. Overview

**CrowdCast** is a real-time, live voting and audience-engagement platform. An organizer (admin) creates an **Event**, adds **Candidates/Participants**, and runs sequential timed **Rounds** of voting on a single shared public link or QR code. Voters open the link with no login required, submit a rating (default 1–10) within the round's time window, and see live results as an admin controls the flow of the event.

The platform solves the core problem with the organizer's current approach (a Google Form): no protection against duplicate submissions, no live control over voting rounds, and no real-time results.

## 2. Problem Statement

The existing workflow shares a Google Form link for voting. This has three major weaknesses:

- **No duplicate-vote protection** — the same person can submit multiple times.
- **No sequencing** — there's no way to run voting for "Candidate 1," close it, then open voting for "Candidate 2" on the same link.
- **No live feedback** — results are only visible after manually opening the sheet; there's no real-time count, timer, or audience view.

CrowdCast replaces this with a purpose-built, real-time, abuse-resistant voting system.

## 3. Goals

- Let an admin run **live, timed voting rounds** for a sequence of candidates on one persistent public link/QR.
- Prevent duplicate voting **without requiring login**, using layered anti-abuse signals enforced at the database level.
- Provide **real-time updates** (timer, vote count, results) to voters, and a **live control dashboard** for the admin.
- Support **multiple trust levels** (anonymous, invite-only, verified) so the same platform can serve casual polls and higher-integrity elections.
- Be architected so anti-abuse, real-time delivery, and state transitions are all **server-authoritative** — never trust the client for round status, timers, or vote eligibility.

### Non-Goals (for now)

- Cryptographically provable "one human = one vote" guarantees for fully anonymous voting (not achievable without strong identity verification — see §7).
- Native mobile apps (web-only, mobile-responsive).
- Payments/monetization, multi-tenant billing (may become relevant if this becomes a SaaS product later, but out of scope for v1).

## 4. Users & Personas

| Persona | Description | Needs |
|---|---|---|
| **Organizer / Admin** | Runs the event (e.g., HR running "Employee of the Month," a teacher judging presentations, an event host running a talent show) | Create events, add candidates, control round start/stop, see live results, export data |
| **Voter (Anonymous)** | Scans a QR code / opens a link, no account | Fast, frictionless voting; clear feedback that their vote was counted |
| **Voter (Invited)** | Has a unique invitation link (e.g., a judging panel) | Same as anonymous, but with a personal, revocable credential |
| **Audience (Presentation Mode)** | Views a shared screen/projector, doesn't necessarily vote | See current candidate, timer, and (optionally) live results |

## 5. Core Domain Concepts

```
Event
 └── Round(s)          (each tied to one Candidate, has its own timer & status)
       └── Vote(s)      (one per eligible voter per round)

Candidate/Participant   (generic — a person, team, product, idea, etc.)
```

- **Event**: the overall voting activity (e.g., "Annual Employee Awards 2026"). Has one persistent public URL/QR.
- **Round**: one timed voting window for a single candidate. Rounds run sequentially. State machine: `DRAFT → READY → ACTIVE → ENDED → ARCHIVED`.
- **Vote**: one voter's score submission for one round. Enforced unique per (round, voter identity).

## 6. Functional Requirements

### 6.1 Admin / Organizer

- Create/edit/delete an **Event** (title, branding, voting mode, rating scale).
- Add/edit/remove **Candidates**.
- Create **Rounds** for candidates with configurable duration (e.g., 30s, 1 min, 5 min, custom) and rating scale (1–5, 1–10, Yes/No, multiple choice — see §6.4).
- Generate a single persistent **public voting link** and **QR code** for the Event (not per-round).
- **Control panel**: Start Round, Pause/Resume, End Round, Next Candidate — all server-authoritative.
- View **live dashboard**: connected voters, votes received, running average, live distribution, time remaining.
- View **results** per round and **final results** across all rounds at event end.
- **Export** results (CSV at minimum; Excel/PDF as stretch).
- Choose a **voting security mode** per event (see §7).
- View a basic **audit log** of admin actions (round started/stopped, candidate added, etc.).

### 6.2 Voter (Public, No Login)

- Open the public link or scan the QR — lands directly on the current active round (or a "waiting for next round" screen).
- See: candidate name/image, rating scale, countdown timer.
- Submit one score within the time window.
- Get immediate confirmation ("Vote submitted") or a clear rejection reason ("You've already voted," "Voting has closed").
- Reconnect gracefully after a dropped connection and resync to the current round state (never assume missed WebSocket events are unimportant).

### 6.3 Real-Time Behavior (WebSocket)

- Round lifecycle events broadcast to all connected clients: `ROUND_STARTED`, `ROUND_PAUSED`, `ROUND_RESUMED`, `ROUND_ENDED`, `NEXT_ROUND`, `EVENT_ENDED`.
- Live aggregate updates: `VOTE_COUNT_UPDATED` (count, average, distribution — never individual voter data).
- Timer is **not** re-broadcast every second. Server sends `startedAt`/`endsAt`; each client computes its own countdown locally, and the server alone decides when a round has actually ended.
- Admin dashboard and public voting clients both subscribe to the same event "room," so admin actions propagate instantly to all voters.

### 6.4 Voting / Rating Types

- v1: **Numeric rating** (configurable range, default 1–10).
- v2+: Yes/No, single-choice, multiple-choice, ranking.

### 6.5 Presentation Mode

- A full-screen, read-only view (for projector/TV) showing current candidate, timer, and live vote count — intended for a shared display, not for casting a vote.

## 7. Voting Security / Trust Modes

Anonymous voting can be made **abuse-resistant**, not **abuse-proof**. The product should be explicit with organizers about this trade-off and let them pick the right mode for their use case.

| Mode | Mechanism | Best for |
|---|---|---|
| **Open** | No restriction beyond basic rate limiting | Fun/casual audience polls |
| **Anonymous Protected** (default) | Anonymous signed voter-session cookie + IP hash + rate limiting + DB-level uniqueness constraint | General live events, audience voting |
| **Invite-Only** | Unique, single-use-per-round invitation token (hashed at rest), optionally bound to a device/session on first use | Judging panels, internal competitions, controlled voter lists |
| **Verified** | Email or phone OTP tied to a real identity | Elections, high-integrity judging |

Key rules:
- **Never rely on IP address alone** — shared networks (office/campus Wi-Fi) cause false positives; mobile networks/VPNs cause false negatives.
- **The database uniqueness constraint is the final authority**, not client-side "already voted" checks (which fail under concurrent requests).
- Layered signals (voter-session token, IP hash, user-agent hash, request velocity) feed an optional **risk score** used to escalate to CAPTCHA rather than blanket-blocking every voter.

## 8. Non-Functional Requirements

- **Server-authoritative state**: round status, timers, and eligibility are always validated server-side; the client is never trusted for these.
- **Consistency under concurrency**: simultaneous vote submissions and round-end must not produce duplicate votes or votes accepted after close (enforced via DB transactions/constraints).
- **Low-friction voting**: public voting page must load fast on mobile and require zero setup after scanning a QR.
- **Privacy**: public clients only ever receive aggregate data (counts, averages, distributions) — never raw voter identifiers, IPs, or session tokens.
- **Resilience**: clients must recover cleanly from disconnects/reconnects by re-fetching authoritative round state, not just resuming a WebSocket stream.
- **Horizontal scalability path**: architecture should not assume a single server process can hold all WebSocket connections forever (see Redis adapter in implementation plan).

## 9. High-Level Data Model

- `Event` — id, title, slug (public URL), status, votingMode, ratingConfig, branding, timestamps
- `Candidate` — id, eventId, name, imageUrl
- `Round` — id, eventId, candidateId, duration, startedAt, endsAt, status
- `Vote` — id, roundId, voterSessionId / invitationId, score, ipHash, createdAt — **unique on (roundId, voterIdentity)**
- `VotingInvitation` (invite-only mode) — id, eventId, tokenHash, status, expiresAt, usedAt, label
- `AuditLog` — id, eventId, actor, action, metadata, createdAt

(Full schema detail lives in the implementation plan / engineering docs, not this PRD.)

## 10. Success Metrics

- Zero duplicate votes recorded per (round, voter identity) under load testing with concurrent submissions.
- Round start/end and vote-count updates delivered to clients within ~1 second of the server-side event.
- A voter can go from "scan QR" to "vote confirmed" in under 10 seconds on mobile.
- Admin can run an event with 5+ sequential rounds without regenerating the link/QR.

## 11. Risks & Open Questions

- **Anonymous mode cannot mathematically guarantee one-vote-per-human** (cleared cookies + private browsing bypass session tokens). This must be communicated to organizers as a trust trade-off, not hidden.
- **WebSocket scaling**: a single Node/Socket.IO process holds all connections in memory; multi-instance deployment requires a shared pub/sub layer (Redis) from early on if concurrent audience size is expected to be large.
- **Timer authority under network delay**: need to decide the exact tolerance window for votes arriving right at round-end (e.g., accept votes with server-received timestamp before `endsAt`, reject otherwise).
- **Invite sharing**: an invite-only link can still be forwarded to someone else; device/session binding on first use mitigates but doesn't eliminate this.

## 12. Future / Out-of-Scope for v1

Weighted voting, live leaderboards, blind voting (hide results until round ends), scheduled auto-start rounds, multi-admin RBAC, event templates, custom branding/domains, fraud-risk dashboard, event replay/timeline, multi-room events, reactions, and analytics dashboards. These are captured as later phases in `implementation-plan.md`.