import { ConsoleLog } from ".."

interface ConvertArrayOfObjsTOCsvStrInput {
  data: any[]
  stripCommasFromValues?: boolean
}
export function ConvertArrayOfObjsTOCsvStr(input: ConvertArrayOfObjsTOCsvStrInput): string {
  if (input.stripCommasFromValues === undefined) {
    input.stripCommasFromValues = true
  }
  let ret = ``
  // get headers
  let headers: string[] = []
  for (let i of input.data) {
    if (i) {
      let objKeys = Object.keys(i)
      for (let k of objKeys) {
        if (headers.includes(k)) {
          // 
        } else {
          headers.push(k)
        }
      }
    }
  }
  // ConsoleLog.logObj(`headers`, headers)
  // write headers
  for (let h = 0; h < headers.length; h++) {
    ret += `${headers[h]}`
    if (h < (headers.length-1)) {
      ret += `,`
    } else {
      ret += `\n`
    }
  }
  
  // write body
  for (let i of input.data) {
    try {
      if (i) {
        // loop through headers
        for (let h = 0; h < headers.length; h++) {
          let value = i[headers[h]]
          if (typeof value === 'string' || value instanceof String) {
            value = value.replace(/,/g, " ")
          }
          if (value !== undefined) {
            ret += `${value}`
          }
          if (h < (headers.length-1)) {
            ret += `,`
          } else {
            ret += `\n`
          }
        }
      }
    } catch(err) {
      ConsoleLog.logObj(`error adding item to CSV`, err)
      ConsoleLog.logObj(`item with error`, i)
    }
  }
  // ConsoleLog.log(`ret: ${ret}`)
  return ret
}