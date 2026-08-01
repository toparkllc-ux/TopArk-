export function cmToFeetInches(cm: number | null): string {
  if (!cm) return "—";
  const totalInches = cm / 2.54;
  const feet = Math.floor(totalInches / 12);
  const inches = Math.round(totalInches % 12);
  return `${feet}'${inches}"`;
}

export function kgToLbs(kg: number | null): string {
  if (!kg) return "—";
  return `${Math.round(kg * 2.20462)}`;
}
