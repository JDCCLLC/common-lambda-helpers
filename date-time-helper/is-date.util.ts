export function isDate(dateMaybe: any): boolean {
  return (dateMaybe instanceof Date && !isNaN(dateMaybe.valueOf()))
}