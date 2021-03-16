export module ConsoleLog {
  export function logObj(
    text: string,
    obj: any,
    logAsJson: boolean = true
  ): void {
    console.log(`${text}: `)
    if (logAsJson) {
      console.log(JSON.stringify(obj,null,2))
    } else {
      console.log(obj)
    }
  }
}