const KOBO_PER_NAIRA = 100;

export function koboToNaira(kobo: number): number {
  return kobo / KOBO_PER_NAIRA;
}

export function formatNaira(kobo: number): string {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  }).format(koboToNaira(kobo));
}
