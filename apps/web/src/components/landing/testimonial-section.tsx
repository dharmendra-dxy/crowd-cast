import Image from "next/image";

import { Container } from "@/components/common/section";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { TESTIMONIAL } from "@/constants/landing.constant";
import { IMAGE_DIMENSIONS } from "@/constants/images.constant";

export function TestimonialSection() {
  const { quote, author, highlight } = TESTIMONIAL;
  const initials = author.name
    .split(" ")
    .map((part) => part[0])
    .join("");

  return (
    <Container>
      <figure className="grid gap-8 rounded-3xl border border-border bg-card p-8 shadow-lg shadow-brand/5 sm:p-10 lg:grid-cols-[1.5fr_1fr] lg:items-center lg:gap-12">
        <div className="flex flex-col gap-6">
          <blockquote className="font-heading text-xl leading-snug font-medium text-balance sm:text-2xl">
            &ldquo;{quote}&rdquo;
          </blockquote>
          <figcaption className="flex items-center gap-3">
            <Avatar>
              <AvatarImage
                src={author.avatar}
                alt={author.name}
                width={IMAGE_DIMENSIONS.AVATAR.width}
                height={IMAGE_DIMENSIONS.AVATAR.height}
              />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-medium">{author.name}</span>
              <span className="text-xs text-muted-foreground">{author.role}</span>
            </div>
          </figcaption>
        </div>

        <div className="flex flex-col items-start gap-2 rounded-2xl bg-linear-to-br from-brand/10 to-accent-alt/10 p-6">
          <span className="font-heading text-4xl font-semibold tracking-tight text-brand">
            {highlight.value}
          </span>
          <span className="text-sm leading-relaxed text-muted-foreground">
            {highlight.label}
          </span>
        </div>
      </figure>
    </Container>
  );
}
