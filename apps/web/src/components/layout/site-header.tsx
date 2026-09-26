"use client";

import { useState } from "react";
import Link from "next/link";
import { MenuIcon, XIcon } from "lucide-react";

import { SiteLogo } from "@/components/brand/site-logo";
import { Button, buttonVariants } from "@/components/ui/button";
import { NAV_LINKS } from "@/constants/landing.constant";
import { ROUTES } from "@/constants/routes.constant";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/70 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <SiteLogo />

        <nav
          aria-label="Main"
          className="hidden items-center gap-1 md:flex lg:gap-2"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="rounded-lg px-2.5 py-1.5 text-sm font-medium text-muted-foreground transition-colors outline-none hover:bg-muted hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 lg:px-3"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href={ROUTES.LOGIN}
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "hidden px-3 sm:inline-flex"
            )}
          >
            Log in
          </Link>
          <Link
            href={ROUTES.SIGNUP}
            className={cn(buttonVariants({ className: "px-3.5" }))}
          >
            Get started
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            {isMenuOpen ? <XIcon /> : <MenuIcon />}
          </Button>
        </div>
      </div>

      <div
        id="mobile-navigation"
        hidden={!isMenuOpen}
        className="border-t border-border/70 bg-background md:hidden"
      >
        <nav
          aria-label="Mobile"
          className="mx-auto flex w-full max-w-6xl flex-col gap-1 px-4 py-4 sm:px-6"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              className="rounded-lg px-2 py-2.5 text-sm font-medium text-foreground/80 transition-colors hover:bg-muted hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
          <div className="mt-2 flex items-center gap-2">
            <Link
              href={ROUTES.LOGIN}
              onClick={() => setIsMenuOpen(false)}
              className={cn(buttonVariants({ variant: "outline" }), "flex-1")}
            >
              Log in
            </Link>
            <Link
              href={ROUTES.SIGNUP}
              onClick={() => setIsMenuOpen(false)}
              className={cn(buttonVariants(), "flex-1")}
            >
              Get started
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
