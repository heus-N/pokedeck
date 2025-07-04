export function kgToLb(kg: number): number {
  const poundsPerKg = 2.20462;
  return parseFloat((kg * poundsPerKg).toFixed(1));
}
