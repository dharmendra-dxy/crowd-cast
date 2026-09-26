import Image from "next/image";
import Link from "next/link";

import { SiteLogo } from "@/components/brand/site-logo";
import { Container } from "@/components/common/section";
import { Separator } from "@/components/ui/separator";
import { IMAGE_DIMENSIONS } from "@/constants/images.constant";
import { BRAND, FOOTER } from "@/constants/landing.constant";
import { ROUTES } from "@/constants/routes.constant";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <Container className="py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div className="flex flex-col gap-4">
            <SiteLogo />
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
              {FOOTER.DESCRIPTION}
            </p>
            <div className="flex items-center gap-3">
              <div className="rounded-lg border border-border bg-background p-1.5">
                <Image
                  src={FOOTER.QR}
                  alt="QR code placeholder for a CrowdCast event link"
                  width={IMAGE_DIMENSIONS.QR_CODE.width}
                  height={IMAGE_DIMENSIONS.QR_CODE.height}
                  className="size-14 rounded-md"
                />
              </div>
              <p className="max-w-[9rem] text-xs leading-snug text-muted-foreground">
                Scan to join a live event — one QR works for every round.
              </p>
            </div>
          </div>

          {FOOTER.GROUPS.map((group) => (
            <div key={group.title} className="flex flex-col gap-3">
              <h3 className="font-heading text-sm font-semibold">
                {group.title}
              </h3>
              <ul className="flex flex-col gap-2">
                {group.links.map((link) => (
                  <li key={`${group.title}-${link.label}`}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-10" />

        <div className="flex flex-col items-start justify-between gap-3 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <p>
            &copy; {BRAND.NAME}. {FOOTER.BOTTOM_NOTE}
          </p>
          <p className="flex items-center gap-4">
            <Link
              href={ROUTES.LOGIN}
              className="transition-colors hover:text-foreground"
            >
              Log in
            </Link>
            <Link
              href={ROUTES.SIGNUP}
              className="transition-colors hover:text-foreground"
            >
              Sign up
            </Link>
          </p>
        </div>
      </Container>
    </footer>
  );
}
