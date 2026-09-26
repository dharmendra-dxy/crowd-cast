import { IMAGES } from "@/constants/images.constant";
import { ROUTES } from "@/constants/routes.constant";

export const AUTH = {
  LOGIN: {
    TITLE: "Welcome back",
    DESCRIPTION: "Log in to pick up where you left off with your live events.",
    SUBMIT_LABEL: "Log in",
    FOOTER_TEXT: "New to CrowdCast?",
    FOOTER_LINK_LABEL: "Create an account",
    FOOTER_LINK_HREF: ROUTES.SIGNUP,
    DEMO_HINT: "Use any email and password to explore the demo workspace.",
  },
  SIGNUP: {
    TITLE: "Create your account",
    DESCRIPTION:
      "Set up your organizer account and run your first live voting round in minutes.",
    SUBMIT_LABEL: "Create account",
    FOOTER_TEXT: "Already have an account?",
    FOOTER_LINK_LABEL: "Log in",
    FOOTER_LINK_HREF: ROUTES.LOGIN,
    TERMS_TEXT: "By creating an account you agree to our",
    TERMS_LINK_LABEL: "Terms of Service",
    PRIVACY_LINK_LABEL: "Privacy Policy",
  },
  FIELDS: {
    NAME: {
      label: "Full name",
      placeholder: "Priya Raman",
      autoComplete: "name",
    },
    EMAIL: {
      label: "Work email",
      placeholder: "you@company.com",
      autoComplete: "email",
      type: "email",
    },
    PASSWORD: {
      label: "Password",
      placeholder: "At least 8 characters",
      autoComplete: "current-password",
      type: "password",
      hint: "Use 8 or more characters with a mix of letters and numbers.",
    },
    NEW_PASSWORD: {
      label: "Password",
      placeholder: "Create a password",
      autoComplete: "new-password",
      type: "password",
      hint: "Use 8 or more characters with a mix of letters and numbers.",
    },
    ORGANIZATION: {
      label: "Organization",
      placeholder: "Meridian Labs",
      autoComplete: "organization",
      optional: "Optional",
    },
  },
  OPTIONS: {
    REMEMBER_ME: "Keep me logged in",
    FORGOT_PASSWORD: "Forgot password?",
  },
  DIVIDER: "or continue with",
  PROVIDERS: [
    { id: "google", label: "Google" },
    { id: "microsoft", label: "Microsoft" },
  ],
  SIDE_PANEL: {
    TITLE: "Every vote, on time, counted once.",
    DESCRIPTION:
      "CrowdCast keeps the room moving: one link for every round, a countdown on every screen, and results that update live.",
    POINTS: [
      "One permanent link or QR for your whole event",
      "Timed sequential rounds you control",
      "Duplicate votes blocked at the database level",
    ],
    IMAGE: IMAGES.PLACEHOLDERS.MOBILE_VOTE,
    IMAGE_ALT: "CrowdCast voting screen on a phone",
  },
} as const;
