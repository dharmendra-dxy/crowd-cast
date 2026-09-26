import { AuthCard } from "@/components/auth/auth-card";
import { AuthFormField } from "@/components/auth/auth-form-field";
import { SocialAuthButtons } from "@/components/auth/social-auth-buttons";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { FieldGroup } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import { AUTH } from "@/constants/auth.constant";

/** Sign-up screen. UI only — submission is wired up in a later phase. */
export function SignupForm() {
  return (
    <AuthCard
      title={AUTH.SIGNUP.TITLE}
      description={AUTH.SIGNUP.DESCRIPTION}
      footerText={AUTH.SIGNUP.FOOTER_TEXT}
      footerLinkLabel={AUTH.SIGNUP.FOOTER_LINK_LABEL}
      footerLinkHref={AUTH.SIGNUP.FOOTER_LINK_HREF}
    >
      <form className="flex flex-col gap-6" noValidate>
        <SocialAuthButtons />

        <FieldGroup>
          <AuthFormField
            id="name"
            label={AUTH.FIELDS.NAME.label}
            placeholder={AUTH.FIELDS.NAME.placeholder}
            autoComplete={AUTH.FIELDS.NAME.autoComplete}
          />

          <AuthFormField
            id="email"
            label={AUTH.FIELDS.EMAIL.label}
            placeholder={AUTH.FIELDS.EMAIL.placeholder}
            type={AUTH.FIELDS.EMAIL.type}
            autoComplete={AUTH.FIELDS.EMAIL.autoComplete}
          />

          <AuthFormField
            id="new-password"
            label={AUTH.FIELDS.NEW_PASSWORD.label}
            placeholder={AUTH.FIELDS.NEW_PASSWORD.placeholder}
            type={AUTH.FIELDS.NEW_PASSWORD.type}
            autoComplete={AUTH.FIELDS.NEW_PASSWORD.autoComplete}
            hint={AUTH.FIELDS.NEW_PASSWORD.hint}
          />

          <AuthFormField
            id="organization"
            label={AUTH.FIELDS.ORGANIZATION.label}
            placeholder={AUTH.FIELDS.ORGANIZATION.placeholder}
            autoComplete={AUTH.FIELDS.ORGANIZATION.autoComplete}
            optionalLabel={AUTH.FIELDS.ORGANIZATION.optional}
          />

          <Label htmlFor="terms" className="items-start font-normal">
            <Checkbox id="terms" className="mt-0.5" />
            <span className="text-sm leading-snug text-muted-foreground">
              {AUTH.SIGNUP.TERMS_TEXT}{" "}
              <a
                href="#"
                className="font-medium text-foreground underline underline-offset-4"
              >
                {AUTH.SIGNUP.TERMS_LINK_LABEL}
              </a>{" "}
              and the{" "}
              <a
                href="#"
                className="font-medium text-foreground underline underline-offset-4"
              >
                {AUTH.SIGNUP.PRIVACY_LINK_LABEL}
              </a>
              .
            </span>
          </Label>
        </FieldGroup>

        <Button type="button" className="h-10 w-full">
          {AUTH.SIGNUP.SUBMIT_LABEL}
        </Button>
      </form>
    </AuthCard>
  );
}
