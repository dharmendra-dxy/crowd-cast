import type { Metadata } from "next";

import { LoginForm } from "@/components/auth/login-form";
import { AUTH } from "@/constants/auth.constant";
import { BRAND } from "@/constants/landing.constant";

export const metadata: Metadata = {
  title: `Log in | ${BRAND.NAME}`,
  description: AUTH.LOGIN.DESCRIPTION,
};

export default function LoginPage() {
  return <LoginForm />;
}
