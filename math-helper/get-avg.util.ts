export function getAverage(numbers: number[]): number {
  let total = 0
  for (let i of numbers) {
    total = total + i
  }
  return total/numbers.length
}