export function getYyyyMmDd(jsDate: Date = new Date()): string {
  return jsDate.toISOString().substring(0,10)
}

export interface YyyyMmDdHhObj {
  year: string
  month: string
  day: string
  hour: string
  minute: string
}
export function getYyyyMmDdHhAsObj(jsDate: Date = new Date()): YyyyMmDdHhObj {
  let year = jsDate.getFullYear().toString()
  let jsMonth = jsDate.getMonth()
  let month = (jsMonth+1).toString()
  if (month.length == 1) {
    month = "0" + month
  }
  let day = jsDate.getDate().toString()
  if (day.length == 1) {
    day = "0" + day
  }
  let hour = jsDate.getHours().toString()
  if (hour.length == 1) {
    hour = "0" + hour
  }
  let minute = jsDate.getMinutes().toString()
  if (minute.length == 1) {
    minute = "0" + minute
  }
  return {
    year: year,
    month: month,
    day: day,
    hour: hour,
    minute: minute,
  }
}