export function calculatePercentGain(start: number, end: number): number {
  let increase = end - start
  let percentGain = (increase/start) * 100
  return percentGain
}