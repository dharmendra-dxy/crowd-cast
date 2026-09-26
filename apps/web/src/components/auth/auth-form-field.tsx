import { Input } from "@/components/ui/input";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";

type AuthFormFieldProps = {
  id: string;
  label: string;
  placeholder?: string;
  type?: string;
  autoComplete?: string;
  hint?: string;
  optionalLabel?: string;
};

/** Label + input (+ hint) pairing used across the auth screens. */
export function AuthFormField({
  id,
  label,
  placeholder,
  type = "text",
  autoComplete,
  hint,
  optionalLabel,
}: AuthFormFieldProps) {
  return (
    <Field>
      <div className="flex items-center justify-between gap-2">
        <FieldLabel htmlFor={id}>{label}</FieldLabel>
        {optionalLabel ? (
          <span className="text-xs text-muted-foreground">
            {optionalLabel}
          </span>
        ) : null}
      </div>
      <Input
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="h-10 px-3"
      />
      {hint ? <FieldDescription>{hint}</FieldDescription> : null}
    </Field>
  );
}
