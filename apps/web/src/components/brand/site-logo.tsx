import Image from "next/image";
import Link from "next/link";

import { IMAGES, IMAGE_DIMENSIONS } from "@/constants/images.constant";
import { BRAND } from "@/constants/landing.constant";
import { ROUTES } from "@/constants/routes.constant";
import { cn } from "@/lib/utils";

type SiteLogoProps = {
  /** Renders the mark only, without the wordmark. */
  markOnly?: boolean;
  /** Hides the surrounding link, useful when already inside a linked header. */
  asText?: boolean;
  className?: string;
};

const MARK_SIZE = IMAGE_DIMENSIONS.AVATAR.width / 2;

export function SiteLogo({
  markOnly = false,
  asText = false,
  className,
}: SiteLogoProps) {
  const mark = (
    <Image
      src={IMAGES.BRAND.LOGO_MARK}
      alt=""
      width={MARK_SIZE}
      height={MARK_SIZE}
      priority
      className="size-8 rounded-xl"
    />
  );

  const content = (
    <span className={cn("flex items-center gap-2", className)}>
      {mark}
      {markOnly ? null : (
        <span className="font-heading text-base font-semibold tracking-tight">
          {BRAND.NAME}
        </span>
      )}
    </span>
  );

  if (asText) {
    return content;
  }

  return (
    <Link
      href={ROUTES.HOME}
      aria-label={BRAND.NAME}
      className="inline-flex items-center rounded-lg outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
    >
      {content}
    </Link>
  );
}
