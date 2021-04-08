export function getYyyyMmDd(jsDate: Date = new Date()): string {
  return jsDate.toISOString().substring(0,10)
}