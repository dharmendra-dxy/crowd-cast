/**
 * Every internal route in one place. Components must never hardcode hrefs.
 *
 * Note: the auth screens live in the `(auth)` route group, so `ROUTES.LOGIN`
 * resolves to `/login` in the URL bar.
 */
export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  SIGNUP: "/signup",

  // Planned routes from the implementation plan — referenced by the landing
  // page copy only, so keep in sync when the screens are actually built.
  DASHBOARD: "/dashboard",
  PUBLIC_VOTE: "/v/[slug]",
  PRESENTATION: "/p/[slug]",
} as const;

/** In-page anchors used by the landing page navigation. */
export const LANDING_ANCHORS = {
  FEATURES: "features",
  HOW_IT_WORKS: "how-it-works",
  EXPERIENCE: "experience",
  SECURITY: "security",
  USE_CASES: "use-cases",
  FAQ: "faq",
} as const;

export const buildLandingHref = (anchor: string) => `/#${anchor}`;
