import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckIcon } from "lucide-react";

import { SiteLogo } from "@/components/brand/site-logo";
import { AUTH } from "@/constants/auth.constant";
import { IMAGE_DIMENSIONS } from "@/constants/images.constant";
import { ROUTES } from "@/constants/routes.constant";

type AuthShellProps = {
  children: ReactNode;
};

/**
 * Split layout shared by the login and signup screens: form on the left,
 * product visual on the right (hidden on small screens).
 */
export function AuthShell({ children }: AuthShellProps) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="flex flex-col px-4 py-8 sm:px-8 lg:px-12">
        <header className="mb-10 flex items-center justify-between">
          <SiteLogo />
          <Link
            href={ROUTES.HOME}
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Back to home
          </Link>
        </header>

        <div className="flex flex-1 items-center justify-center pb-8">
          {children}
        </div>
      </div>

      <aside className="relative hidden overflow-hidden bg-foreground p-10 text-background lg:flex lg:flex-col lg:justify-center">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_60%_at_70%_10%,color-mix(in_oklch,var(--brand)_45%,transparent),transparent)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-24 -left-16 size-72 rounded-full bg-accent-alt/20 blur-3xl"
        />

        <div className="relative flex flex-col gap-8">
          <div className="flex flex-col gap-3">
            <h2 className="font-heading text-3xl font-semibold tracking-tight text-balance">
              {AUTH.SIDE_PANEL.TITLE}
            </h2>
            <p className="max-w-md text-sm leading-relaxed text-background/70">
              {AUTH.SIDE_PANEL.DESCRIPTION}
            </p>
          </div>

          <ul className="flex flex-col gap-3">
            {AUTH.SIDE_PANEL.POINTS.map((point) => (
              <li key={point} className="flex items-start gap-2.5 text-sm">
                <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-background/15">
                  <CheckIcon className="size-3.5" />
                </span>
                <span className="text-background/85">{point}</span>
              </li>
            ))}
          </ul>

          <div className="mt-4 w-fit overflow-hidden rounded-3xl border border-background/15 shadow-2xl shadow-black/40">
            <Image
              src={AUTH.SIDE_PANEL.IMAGE}
              alt={AUTH.SIDE_PANEL.IMAGE_ALT}
              width={IMAGE_DIMENSIONS.MOBILE_VOTE.width}
              height={IMAGE_DIMENSIONS.MOBILE_VOTE.height}
              className="w-64"
            />
          </div>
        </div>
      </aside>
    </div>
  );
}
