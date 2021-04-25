import { ConsoleLog } from ".."

export async function sleepForSeconds(seconds: number): Promise<void> {
  ConsoleLog.log(`sleeping for ${seconds} seconds...`)
  return new Promise(resolve => setTimeout(resolve, (seconds)))
}