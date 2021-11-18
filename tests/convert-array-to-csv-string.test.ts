import { ConsoleLog } from ".."
import { ConvertArrayOfObjsTOCsvStr } from "../csv-helper/convert-array-of-objs-to-csv-str.util"

// jest -t 'convert array of objs to csv string'
test('convert array of objs to csv string', () => {
  let arry = [
    {'field1': 'value1','field2': 'value2','field3': 'value3'},
    {'field1': 'line2 value1','field2': 'line2 value2','field3': 'line2 value3'},
    {'field1': 'line3 value1','field2': 'line3,value2,withcomma','field3': 'line3 value3'},
  ]
  let csvAsStr = ConvertArrayOfObjsTOCsvStr({data: arry})
  ConsoleLog.log(`csvAsStr: ${csvAsStr}`)
  expect(csvAsStr.startsWith(`field1,field2,field3\n`)).toBeTruthy()
})