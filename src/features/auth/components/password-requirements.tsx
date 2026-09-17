export interface PasswordRequirement {
  label: string
  test: (value: string) => boolean
}

export const passwordRequirements: PasswordRequirement[] = [
  { label: "At least 8 characters", test: (value) => value.length >= 8 },
  { label: "At least 1 uppercase letter", test: (value) => /[A-Z]/.test(value) },
  { label: "At least 1 lowercase letter", test: (value) => /[a-z]/.test(value) },
  { label: "At least 1 special character", test: (value) => /[^A-Za-z0-9]/.test(value) },
]
