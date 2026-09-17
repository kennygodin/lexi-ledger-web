import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";
import { Field, FieldDescription, FieldError } from "@/components/ui/field";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

interface FormOtpInputProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  description?: string;
  disabled?: boolean;
  length?: number;
}

export function OtpInput<T extends FieldValues>({
  control,
  name,
  description,
  disabled,
  length = 6,
}: FormOtpInputProps<T>) {
  return (
    <Field>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => (
          <>
            <InputOTP
              id={name}
              maxLength={length}
              value={field.value ?? ""}
              onChange={field.onChange}
              onBlur={field.onBlur}
              disabled={disabled}
              autoFocus
            >
              <InputOTPGroup className="gap-3">
                {Array.from({ length }).map((_, index) => (
                  <InputOTPSlot
                    key={index}
                    index={index}
                    aria-invalid={fieldState.invalid}
                    className="size-12 rounded-none border text-lg"
                  />
                ))}
              </InputOTPGroup>
            </InputOTP>

            {description && <FieldDescription>{description}</FieldDescription>}

            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </>
        )}
      />
    </Field>
  );
}
