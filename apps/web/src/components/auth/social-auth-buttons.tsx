import { Button } from "@/components/ui/button";
import { FieldSeparator } from "@/components/ui/field";
import { AUTH } from "@/constants/auth.constant";

const PROVIDER_ICONS: Record<string, React.ReactNode> = {
  google: (
    <svg viewBox="0 0 24 24" className="size-4" aria-hidden focusable="false">
      <path
        fill="#4285F4"
        d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.4a5.5 5.5 0 0 1-2.4 3.6v3h3.9c2.3-2.1 3.6-5.2 3.6-8.8"
      />
      <path
        fill="#34A853"
        d="M12 24c3.2 0 6-1.1 8-2.9l-3.9-3a7.2 7.2 0 0 1-10.7-3.8H1.3v3.1A12 12 0 0 0 12 24"
      />
      <path
        fill="#FBBC05"
        d="M5.4 14.3a7.1 7.1 0 0 1 0-4.6V6.6H1.3a12 12 0 0 0 0 10.8z"
      />
      <path
        fill="#EA4335"
        d="M12 4.8c1.8 0 3.4.6 4.6 1.8l3.4-3.4A12 12 0 0 0 1.3 6.6l4.1 3.1A7.2 7.2 0 0 1 12 4.8"
      />
    </svg>
  ),
  microsoft: (
    <svg viewBox="0 0 24 24" className="size-4" aria-hidden focusable="false">
      <path fill="#F25022" d="M2 2h9.5v9.5H2z" />
      <path fill="#7FBA00" d="M12.5 2H22v9.5h-9.5z" />
      <path fill="#00A4EF" d="M2 12.5h9.5V22H2z" />
      <path fill="#FFB900" d="M12.5 12.5H22V22h-9.5z" />
    </svg>
  ),
};

/** Social sign-in buttons plus the "or" divider. UI only — no handlers yet. */
export function SocialAuthButtons() {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid gap-3 sm:grid-cols-2">
        {AUTH.PROVIDERS.map((provider) => (
          <Button
            key={provider.id}
            type="button"
            variant="outline"
            className="h-10 w-full"
          >
            {PROVIDER_ICONS[provider.id]}
            {provider.label}
          </Button>
        ))}
      </div>

      <FieldSeparator>{AUTH.DIVIDER}</FieldSeparator>
    </div>
  );
}
