import { AuthCard } from "@/components/auth/auth-card";
import { AuthFormField } from "@/components/auth/auth-form-field";
import { SocialAuthButtons } from "@/components/auth/social-auth-buttons";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { FieldGroup } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import { AUTH } from "@/constants/auth.constant";

/** Sign-in screen. UI only — submission is wired up in a later phase. */
export function LoginForm() {
  return (
    <AuthCard
      title={AUTH.LOGIN.TITLE}
      description={AUTH.LOGIN.DESCRIPTION}
      footerText={AUTH.LOGIN.FOOTER_TEXT}
      footerLinkLabel={AUTH.LOGIN.FOOTER_LINK_LABEL}
      footerLinkHref={AUTH.LOGIN.FOOTER_LINK_HREF}
    >
      <form className="flex flex-col gap-6" noValidate>
        <SocialAuthButtons />

        <FieldGroup>
          <AuthFormField
            id="email"
            label={AUTH.FIELDS.EMAIL.label}
            placeholder={AUTH.FIELDS.EMAIL.placeholder}
            type={AUTH.FIELDS.EMAIL.type}
            autoComplete={AUTH.FIELDS.EMAIL.autoComplete}
          />

          <AuthFormField
            id="password"
            label={AUTH.FIELDS.PASSWORD.label}
            placeholder={AUTH.FIELDS.PASSWORD.placeholder}
            type={AUTH.FIELDS.PASSWORD.type}
            autoComplete={AUTH.FIELDS.PASSWORD.autoComplete}
          />

          <div className="flex items-center justify-between gap-4">
            <Label htmlFor="remember-me" className="font-normal">
              <Checkbox id="remember-me" defaultChecked />
              {AUTH.OPTIONS.REMEMBER_ME}
            </Label>
            <a
              href="#"
              className="shrink-0 text-sm font-medium text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
            >
              {AUTH.OPTIONS.FORGOT_PASSWORD}
            </a>
          </div>
        </FieldGroup>

        <Button type="button" className="h-10 w-full">
          {AUTH.LOGIN.SUBMIT_LABEL}
        </Button>

        <p className="text-center text-xs text-muted-foreground">
          {AUTH.LOGIN.DEMO_HINT}
        </p>
      </form>
    </AuthCard>
  );
}
