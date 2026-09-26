import type { Metadata } from "next";

import { SignupForm } from "@/components/auth/signup-form";
import { AUTH } from "@/constants/auth.constant";
import { BRAND } from "@/constants/landing.constant";

export const metadata: Metadata = {
  title: `Sign up | ${BRAND.NAME}`,
  description: AUTH.SIGNUP.DESCRIPTION,
};

export default function SignupPage() {
  return <SignupForm />;
}
