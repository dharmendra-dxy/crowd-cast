import {
  BarChart3Icon,
  BlocksIcon,
  CalendarClockIcon,
  DownloadIcon,
  EyeIcon,
  GaugeIcon,
  GlobeIcon,
  Link2Icon,
  LockIcon,
  MonitorPlayIcon,
  QrCodeIcon,
  ScanLineIcon,
  ShieldCheckIcon,
  SparklesIcon,
  TimerIcon,
  UsersIcon,
  VoteIcon,
  WifiIcon,
  ZapIcon,
} from "lucide-react";

import { IMAGE_DIMENSIONS, IMAGES } from "@/constants/images.constant";
import {
  buildLandingHref,
  LANDING_ANCHORS,
  ROUTES,
} from "@/constants/routes.constant";

export const BRAND = {
  NAME: "CrowdCast",
  TAGLINE: "Live voting for rooms full of people",
  DESCRIPTION:
    "CrowdCast turns any event into a live, timed voting session. Create candidates, run sequential rounds, and share one link or QR code — your audience votes from their phone in seconds, with no login and no duplicate votes.",
  KEYWORDS: [
    "live voting",
    "audience polling",
    "event voting app",
    "QR code voting",
    "real-time results",
  ],
} as const;

export const HERO = {
  EYEBROW: "Real-time voting & audience engagement",
  TITLE: "Run live voting your audience actually",
  TITLE_ACCENT: "joins.",
  DESCRIPTION:
    "Replace the Google Form. CrowdCast gives you timed voting rounds, one permanent link or QR code, live results on every screen, and duplicate-vote protection that actually holds up.",
  PRIMARY_CTA: { label: "Create your first event", href: ROUTES.SIGNUP },
  SECONDARY_CTA: {
    label: "See how it works",
    href: buildLandingHref(LANDING_ANCHORS.HOW_IT_WORKS),
  },
  HIGHLIGHTS: [
    "No voter login required",
    "Free to start",
    "Works on any phone",
  ],
} as const;

export const NAV_LINKS = [
  { label: "Features", href: buildLandingHref(LANDING_ANCHORS.FEATURES) },
  {
    label: "How it works",
    href: buildLandingHref(LANDING_ANCHORS.HOW_IT_WORKS),
  },
  {
    label: "Live experience",
    href: buildLandingHref(LANDING_ANCHORS.EXPERIENCE),
  },
  {
    label: "Security",
    href: buildLandingHref(LANDING_ANCHORS.SECURITY),
  },
  {
    label: "Use cases",
    href: buildLandingHref(LANDING_ANCHORS.USE_CASES),
  },
  { label: "FAQ", href: buildLandingHref(LANDING_ANCHORS.FAQ) },
] as const;

export const STATS = [
  { value: "10s", label: "QR scan to vote confirmed", icon: ZapIcon },
  { value: "< 1s", label: "Live updates across all screens", icon: WifiIcon },
  { value: "1 link", label: "Reused across every round", icon: Link2Icon },
  { value: "0", label: "Duplicate votes recorded", icon: ShieldCheckIcon },
] as const;

export const COMPARISON = {
  EYEBROW: "Why teams switch",
  TITLE: "A Google Form breaks down the moment an event goes live",
  DESCRIPTION:
    "Forms are great for collecting answers. They are not built for a room of people watching a timer, waiting for the next candidate.",
  old: {
    label: "Google Form",
    items: [
      "Anyone can submit as many times as they like",
      "One static list — no way to move to the next candidate",
      "Results hidden until you manually reopen the sheet",
      "No sense of urgency, no countdown, no live feedback",
      "Shared links get forwarded and screenshotted",
    ],
  },
  new: {
    label: "CrowdCast",
    items: [
      "One vote per voter per round, enforced at the database level",
      "Sequential timed rounds you control from a single dashboard",
      "Live vote count, average and distribution on every device",
      "Countdown timer computed on each device, decided by the server",
      "Optional invite-only or verified voting for high-stakes decisions",
    ],
  },
} as const;

export const FEATURES = {
  EYEBROW: "Features",
  TITLE: "Everything you need to run the room",
  DESCRIPTION:
    "One tool for the organizer, the voter on their phone, and the audience watching the big screen.",
  ITEMS: [
    {
      title: "Sequential timed rounds",
      description:
        "Set a duration per candidate — 30 seconds, 2 minutes, custom. Start, pause, resume, or skip to the next round from one control panel.",
      icon: TimerIcon,
    },
    {
      title: "One permanent link & QR",
      description:
        "Your audience scans once. The link always lands on the round that is live right now, so you never regenerate anything mid-event.",
      icon: QrCodeIcon,
    },
    {
      title: "Zero-login voting",
      description:
        "Voters open the link and score in under ten seconds. No accounts, no downloads, no friction standing between your audience and a vote.",
      icon: ScanLineIcon,
    },
    {
      title: "Live results everywhere",
      description:
        "Vote count, running average and distribution update in real time for you and the audience. The server is always the source of truth.",
      icon: BarChart3Icon,
    },
    {
      title: "Duplicate-vote protection",
      description:
        "A signed voter session, hashed IP and a database uniqueness constraint work together, so retried requests and double-taps never count twice.",
      icon: ShieldCheckIcon,
    },
    {
      title: "Presentation mode",
      description:
        "A full-screen read-only view for the projector: current candidate, countdown and live tally — without the risk of someone voting from the stage.",
      icon: MonitorPlayIcon,
    },
    {
      title: "Any rating scale",
      description:
        "Start with a 1–10 rating and switch to 1–5 or Yes/No as your event needs. Round duration and scale are configurable per round.",
      icon: GaugeIcon,
    },
    {
      title: "Results & export",
      description:
        "Per-round and final results, a running audit trail of organizer actions, and a CSV export the moment the last round closes.",
      icon: DownloadIcon,
    },
    {
      title: "Built for real venues",
      description:
        "Web-based and mobile responsive, with rate limiting and reconnect handling so hundreds of phones on flaky Wi-Fi still vote cleanly.",
      icon: GlobeIcon,
    },
  ],
} as const;

export const HOW_IT_WORKS = {
  EYEBROW: "How it works",
  TITLE: "From idea to final results in four steps",
  DESCRIPTION:
    "An organizer can run a complete event without touching a spreadsheet or asking anyone to sign up.",
  STEPS: [
    {
      title: "Create the event",
      description:
        "Name it, pick a rating scale, choose how strict voting should be, and add your candidates with photos.",
      icon: SparklesIcon,
    },
    {
      title: "Share one link or QR",
      description:
        "Post the link, project it, or print the QR code on a stand. The same destination works for every round.",
      icon: Link2Icon,
    },
    {
      title: "Run the rounds live",
      description:
        "Start a round, watch votes land in real time, then end it and move to the next candidate when you are ready.",
      icon: VoteIcon,
    },
    {
      title: "Announce & export",
      description:
        "Close the final round, review the standings on the big screen, and export the full results as CSV.",
      icon: BarChart3Icon,
    },
  ],
  IMAGE: IMAGES.PLACEHOLDERS.MOBILE_VOTE,
  TIP: {
    TITLE: "Tip for big rooms",
    DESCRIPTION:
      "Put the QR code on screen and on table cards. Voters who join late simply land on the round that is live at that moment.",
  },
} as const;

export const EXPERIENCE = {
  EYEBROW: "Live experience",
  TITLE: "Three screens, one synchronized event",
  DESCRIPTION:
    "The organizer dashboard, the voter's phone and the presentation screen all subscribe to the same event room, so every state change lands instantly everywhere.",
  /** Tab whose artwork is portrait, so it is rendered narrower. */
  VOTER_TAB: "voter",
  TABS: [
    {
      value: "organizer",
      label: "For organizers",
      title: "A control panel that runs the show",
      description:
        "See connected voters, votes received, the running average and time remaining. Start, pause, end or advance a round with a single click — the server decides what is actually valid.",
      bullets: [
        "Live count, average and score distribution",
        "Start / pause / resume / next round controls",
        "Candidate and round management in one place",
      ],
      image: IMAGES.PLACEHOLDERS.DASHBOARD_HERO,
      imageDimensions: IMAGE_DIMENSIONS.DASHBOARD_HERO,
      imageAlt: "Organizer dashboard showing live vote totals and a round timer",
      icon: BlocksIcon,
    },
    {
      value: "voter",
      label: "For voters",
      title: "A voting screen that needs no instructions",
      description:
        "Your audience scans, lands on the current round, picks a score and submits. The countdown is computed on their own device so the timer stays smooth even on a slow connection.",
      bullets: [
        "No account, no app install, no typing",
        "Clear confirmation or rejection reason",
        "Reconnects and resyncs to the live round state",
      ],
      image: IMAGES.PLACEHOLDERS.MOBILE_VOTE,
      imageDimensions: IMAGE_DIMENSIONS.MOBILE_VOTE,
      imageAlt: "Mobile voting screen with a 1 to 10 rating scale",
      icon: UsersIcon,
    },
    {
      value: "presentation",
      label: "For the room",
      title: "Presentation mode for the big screen",
      description:
        "A read-only full-screen view for projectors: current candidate, countdown and the live tally. Nobody on stage can accidentally cast a vote.",
      bullets: [
        "Huge type readable from the back row",
        "Countdown and live count, nothing else",
        "Mirror the vibe of the room, not your admin UI",
      ],
      image: IMAGES.PLACEHOLDERS.PRESENTATION_MODE,
      imageDimensions: IMAGE_DIMENSIONS.PRESENTATION_MODE,
      imageAlt: "Presentation mode view showing a candidate and countdown",
      icon: MonitorPlayIcon,
    },
  ],
} as const;

export const SECURITY = {
  EYEBROW: "Voting integrity",
  TITLE: "Pick the trust level your event deserves",
  DESCRIPTION:
    "Anonymous voting cannot be abuse-proof, and we will not pretend otherwise. Choose a mode per event and know exactly what you are getting.",
  MODES: [
    {
      name: "Open",
      badge: "Casual",
      featured: false,
      description:
        "No restriction beyond basic rate limiting. Best for fun polls and light audience interaction.",
      points: ["Fastest to start", "No verification friction", "Duplicate protection still on"],
    },
    {
      name: "Anonymous Protected",
      badge: "Default",
      featured: true,
      description:
        "A signed voter-session cookie plus hashed IP and rate limiting, with uniqueness enforced by the database.",
      points: ["No login for voters", "Layered anti-abuse signals", "Default for live events"],
    },
    {
      name: "Invite-Only",
      badge: "Controlled",
      featured: false,
      description:
        "Single-use invitation tokens, hashed at rest and optionally bound to the first device that uses them.",
      points: ["Judging panels", "Internal competitions", "Revocable per voter"],
    },
    {
      name: "Verified",
      badge: "Highest",
      featured: false,
      description:
        "Email or phone OTP tied to a real identity for elections and high-integrity decisions.",
      points: ["Ties votes to identity", "Suited to formal votes", "OTP verified per voter"],
    },
  ],
  NOTES: [
    "IP addresses are hashed and never shown to voters or stored in plain text.",
    "Public clients only ever receive aggregates — counts, averages and distributions.",
    "The database uniqueness constraint is the final authority, not a client-side check.",
  ],
  DISCLAIMER:
    "No anonymous system can guarantee one human equals one vote. We make abuse harder, rate-limited and reviewable instead of pretending it does not exist.",
} as const;

export const USE_CASES = {
  EYEBROW: "Use cases",
  TITLE: "Built for the moments where an opinion matters",
  DESCRIPTION:
    "The same control panel fits an HR award night, a classroom, a talent show or a company town hall.",
  ITEMS: [
    {
      title: "Employee & student awards",
      description:
        "Run one round per nominee on a single link, keep duplicate voting out, and announce the winner live.",
      image: IMAGES.PLACEHOLDERS.USE_CASE_AWARDS,
      imageAlt: "Awards night illustration",
    },
    {
      title: "Presentations & judging panels",
      description:
        "Invite-only scoring with a per-speaker timer, so every judge finishes before the next presenter starts.",
      image: IMAGES.PLACEHOLDERS.USE_CASE_PRESENTATIONS,
      imageAlt: "Judging panel illustration",
    },
    {
      title: "Live shows & auditions",
      description:
        "Let the whole room score each act from their phones and watch the leaderboard shift between performers.",
      image: IMAGES.PLACEHOLDERS.USE_CASE_TALENT,
      imageAlt: "Live auditions illustration",
    },
    {
      title: "Town halls & internal polls",
      description:
        "Fast, duplicate-proof feedback for all-hands questions, award votes or quick temperature checks.",
      image: IMAGES.PLACEHOLDERS.USE_CASE_TOWN_HALL,
      imageAlt: "Town hall poll illustration",
    },
  ],
} as const;

export const TESTIMONIAL = {
  quote:
    "We used to hold our breath every award category because the form could be resubmitted a dozen times. Now the QR is on the screen, the timer runs, and the result is undeniable.",
  author: {
    name: "Priya Raman",
    role: "People Ops Lead, Meridian Labs",
    avatar: IMAGES.AVATARS.ONE,
  },
  highlight: {
    value: "248",
    label: "votes counted in the first round, all on one link",
  },
} as const;

export const FAQ = {
  EYEBROW: "FAQ",
  TITLE: "Questions organizers actually ask",
  ITEMS: [
    {
      question: "Do voters need to create an account?",
      answer:
        "No. In Open and Anonymous Protected modes, voters open the link or scan the QR and vote immediately. Invite-Only and Verified modes add a token or OTP step when an event needs a higher integrity bar.",
    },
    {
      question: "What happens if someone votes twice?",
      answer:
        "The submission is rejected with a clear reason. Uniqueness is enforced by a database constraint on the round and the voter's identity, so simultaneous double taps or retried requests still result in a single recorded vote.",
    },
    {
      question: "Do I need a new link for every candidate?",
      answer:
        "No. Each event has one permanent public link and QR code. It always resolves to the round that is currently live, so the link you printed works for the whole event.",
    },
    {
      question: "What if someone's phone loses connection mid-round?",
      answer:
        "Clients resync to the authoritative round state when they reconnect instead of assuming they missed nothing. Votes are validated against the server's own clock, so the timer is never decided by a device.",
    },
    {
      question: "Can I hide results from voters?",
      answer:
        "Yes. Blind voting mode withholds running averages and counts from public clients until the round ends, which is useful when you do not want a score to influence later votes.",
    },
    {
      question: "Can anonymous voting be gamed?",
      answer:
        "It can be made harder, not impossible. Layered signals — signed session, hashed IP, device fingerprint and request velocity — feed rate limiting and optional CAPTCHA escalation. For decisions that must be airtight, use Verified mode.",
    },
    {
      question: "Does it work on a big venue Wi-Fi?",
      answer:
        "The public page is lightweight and mobile responsive, timers are computed locally, and the server is the only authority on round state. Rate limiting and presence tracking keep large audiences stable.",
    },
    {
      question: "Can I get the results afterwards?",
      answer:
        "Yes. Per-round and final results are available in the dashboard, every organizer action is recorded in an audit log, and results export to CSV.",
    },
  ],
} as const;

export const CTA = {
  EYEBROW: "Get started",
  TITLE: "Your next event deserves better than a shared spreadsheet",
  DESCRIPTION:
    "Create an event, share one link, and run the first round in under five minutes. Free to start — no credit card required.",
  PRIMARY_CTA: { label: "Create your first event", href: ROUTES.SIGNUP },
  SECONDARY_CTA: { label: "Log in", href: ROUTES.LOGIN },
} as const;

export const FOOTER = {
  DESCRIPTION:
    "CrowdCast is a real-time voting and audience-engagement platform for live events, presentations and awards.",
  GROUPS: [
    {
      title: "Product",
      links: [
        { label: "Features", href: buildLandingHref(LANDING_ANCHORS.FEATURES) },
        {
          label: "How it works",
          href: buildLandingHref(LANDING_ANCHORS.HOW_IT_WORKS),
        },
        {
          label: "Live experience",
          href: buildLandingHref(LANDING_ANCHORS.EXPERIENCE),
        },
        {
          label: "Voting integrity",
          href: buildLandingHref(LANDING_ANCHORS.SECURITY),
        },
      ],
    },
    {
      title: "Use cases",
      links: [
        {
          label: "Awards & nominations",
          href: buildLandingHref(LANDING_ANCHORS.USE_CASES),
        },
        {
          label: "Judging panels",
          href: buildLandingHref(LANDING_ANCHORS.USE_CASES),
        },
        {
          label: "Live shows",
          href: buildLandingHref(LANDING_ANCHORS.USE_CASES),
        },
        {
          label: "Town halls",
          href: buildLandingHref(LANDING_ANCHORS.USE_CASES),
        },
      ],
    },
    {
      title: "Account",
      links: [
        { label: "Log in", href: ROUTES.LOGIN },
        { label: "Sign up", href: ROUTES.SIGNUP },
        { label: "Organizer dashboard", href: ROUTES.DASHBOARD },
      ],
    },
  ],
  BOTTOM_NOTE: "Server-authoritative voting — the client never decides a result.",
  QR: IMAGES.PLACEHOLDERS.QR_CODE,
} as const;
