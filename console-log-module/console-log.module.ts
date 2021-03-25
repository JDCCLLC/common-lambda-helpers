export module ConsoleLog {
  export function logObj(
    text: string,
    obj: any,
    logAsJson: boolean = true
  ): void {
    console.log(`${text}: `)
    try {
      let objAsJson = JSON.stringify(obj,null,2)
      console.log(objAsJson)
    } catch(err) {
      console.log(obj)
      console.log(`could not JSON.stringify object: ${text}`)
    }
  }
}