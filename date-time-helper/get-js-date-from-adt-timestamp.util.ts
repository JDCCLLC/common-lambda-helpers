import { ConsoleLog } from "..";

/**
 * Returns a JS date object from adt_timestamp...
 * @param {string} adt_timestamp - MSH 7 formatted like 20160216110840.967-0500.
 * @return {Date} js date object....
 */
export function getJsDateFromAdt(adt_timestamp: string): Date | undefined {
  let returnDate = undefined
  try {
    if (adt_timestamp) {
      let year = parseInt(adt_timestamp.substring(0,4));
      let month: string | number = adt_timestamp.substring(4,6);
      month = (parseInt(month) - 1);
      let day = parseInt(adt_timestamp.substring(6,8));
      let hour = 0;
      if (adt_timestamp.length >= 10) {
        hour = parseInt(adt_timestamp.substring(8,10));
      }
      let minute = 0;
      if (adt_timestamp.length >= 12) {
        minute = parseInt(adt_timestamp.substring(10,12));
      }
      let second = 0;
      if (adt_timestamp.length >= 14) {
        second = parseInt(adt_timestamp.substring(12,14));
      }
      // console.log(`YYYY-MM-DDTHH:MM:SS: ${year}-${month}-${day}T${hour}:${minute}`);
      returnDate = new Date(year,month,day,hour,minute,second);
    }
  } catch(err) {
    ConsoleLog.logObj(`error converting ADT timestamp to jsDate`, err)
  }
  
  return returnDate;
}