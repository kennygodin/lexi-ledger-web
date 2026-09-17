import { useState, type HTMLInputTypeAttribute } from "react";
import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { HugeiconsIcon } from "@hugeicons/react";
import { EyeIcon, EyeOffIcon } from "@hugeicons/core-free-icons";

interface TextInputProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
  description?: string;
  disabled?: boolean;
  readOnly?: boolean;
  type?: HTMLInputTypeAttribute;
  step?: string;
  min?: string;
  maxLength?: number;
}

export function TextInput<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  description,
  disabled,
  readOnly,
  type = "text",
  step,
  min,
  maxLength,
}: TextInputProps<T>) {
  const [showPassword, setShowPassword] = useState(false);

  const isPasswordField = type === "password";
  const inputType = isPasswordField
    ? showPassword
      ? "text"
      : "password"
    : type;

  return (
    <Field>
      <FieldLabel htmlFor={name}>{label}</FieldLabel>

      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => (
          <>
            <div className="relative">
              <Input
                {...field}
                id={name}
                type={inputType}
                placeholder={placeholder}
                disabled={disabled}
                readOnly={readOnly}
                aria-invalid={fieldState.invalid}
                className="h-10"
                step={step}
                min={min}
                maxLength={maxLength}
              />

              {isPasswordField && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  disabled={disabled}
                  className="absolute top-0 right-0 h-full px-3 hover:bg-transparent"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <HugeiconsIcon
                      icon={EyeOffIcon}
                      className="size-4 text-muted-foreground"
                    />
                  ) : (
                    <HugeiconsIcon
                      icon={EyeIcon}
                      className="size-4 text-muted-foreground"
                    />
                  )}
                </Button>
              )}
            </div>

            {description && <FieldDescription>{description}</FieldDescription>}

            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </>
        )}
      />
    </Field>
  );
}
