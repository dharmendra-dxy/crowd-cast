/**
 * Central registry of every image used across the app.
 *
 * All entries are paths served from `apps/web/public`, so they can be swapped
 * manually at any time without touching a single component: replace the file
 * on disk (keeping the same name) or point the entry below at a new asset.
 */
export const IMAGES = {
  BRAND: {
    LOGO_MARK: "/images/brand/logo-mark.svg",
    FAVICON: "/favicon.ico",
    OG: "/images/brand/og-image.png",
  },
  PLACEHOLDERS: {
    DASHBOARD_HERO: "/images/placeholders/dashboard-hero.svg",
    MOBILE_VOTE: "/images/placeholders/mobile-vote.svg",
    PRESENTATION_MODE: "/images/placeholders/presentation-mode.svg",
    QR_CODE: "/images/placeholders/qr-code.svg",
    USE_CASE_AWARDS: "/images/placeholders/use-case-awards.svg",
    USE_CASE_PRESENTATIONS: "/images/placeholders/use-case-presentations.svg",
    USE_CASE_TALENT: "/images/placeholders/use-case-talent.svg",
    USE_CASE_TOWN_HALL: "/images/placeholders/use-case-town-hall.svg",
  },
  AVATARS: {
    ONE: "/images/placeholders/avatar-1.svg",
  },
} as const;

/** Named widths/heights so layout stays stable while swapping assets. */
export const IMAGE_DIMENSIONS = {
  DASHBOARD_HERO: { width: 1200, height: 820 },
  MOBILE_VOTE: { width: 400, height: 800 },
  PRESENTATION_MODE: { width: 1200, height: 700 },
  QR_CODE: { width: 360, height: 360 },
  USE_CASE: { width: 640, height: 420 },
  AVATAR: { width: 160, height: 160 },
} as const;
