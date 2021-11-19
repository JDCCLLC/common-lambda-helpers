"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
const convert_array_of_objs_to_csv_str_util_1 = require("../csv-helper/convert-array-of-objs-to-csv-str.util");
// jest -t 'convert array of objs to csv string'
test('convert array of objs to csv string', () => {
    let arry = [
        { 'field1': 'value1', 'field2': 'value2', 'field3': 23 },
        { 'field1': 'line2 value1', 'field2': 'line2 value2', 'field3': 24 },
        { 'field1': 'line3 value1', 'field2': 'line3,value2,withcomma', 'field3': 25 },
    ];
    let csvAsStr = (0, convert_array_of_objs_to_csv_str_util_1.ConvertArrayOfObjsTOCsvStr)({ data: arry });
    __1.ConsoleLog.log(`csvAsStr: ${csvAsStr}`);
    expect(csvAsStr.startsWith(`field1,field2,field3\n`)).toBeTruthy();
});
//# sourceMappingURL=convert-array-to-csv-string.test.js.map