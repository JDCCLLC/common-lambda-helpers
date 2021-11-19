"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConvertArrayOfObjsTOCsvStr = void 0;
function ConvertArrayOfObjsTOCsvStr(input) {
    if (input.stripCommasFromValues === undefined) {
        input.stripCommasFromValues = true;
    }
    let ret = ``;
    // get headers
    let headers = [];
    for (let i of input.data) {
        if (i) {
            let objKeys = Object.keys(i);
            for (let k of objKeys) {
                if (headers.includes(k)) {
                    // 
                }
                else {
                    headers.push(k);
                }
            }
        }
    }
    // ConsoleLog.logObj(`headers`, headers)
    // write headers
    for (let h = 0; h < headers.length; h++) {
        ret += `${headers[h]}`;
        if (h < (headers.length - 1)) {
            ret += `,`;
        }
        else {
            ret += `\n`;
        }
    }
    // write body
    for (let i of input.data) {
        if (i) {
            // loop through headers
            for (let h = 0; h < headers.length; h++) {
                let value = i[headers[h]];
                value = value.replace(/,/g, " ");
                if (value !== undefined) {
                    ret += `${value}`;
                }
                if (h < (headers.length - 1)) {
                    ret += `,`;
                }
                else {
                    ret += `\n`;
                }
            }
        }
    }
    // ConsoleLog.log(`ret: ${ret}`)
    return ret;
}
exports.ConvertArrayOfObjsTOCsvStr = ConvertArrayOfObjsTOCsvStr;
//# sourceMappingURL=convert-array-of-objs-to-csv-str.util.js.map