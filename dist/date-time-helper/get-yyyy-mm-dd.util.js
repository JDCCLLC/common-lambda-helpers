"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getYyyyMmDdHhAsObj = exports.getYyyyMmDd = void 0;
function getYyyyMmDd(jsDate = new Date()) {
    return jsDate.toISOString().substring(0, 10);
}
exports.getYyyyMmDd = getYyyyMmDd;
function getYyyyMmDdHhAsObj(jsDate = new Date()) {
    let year = jsDate.getFullYear().toString();
    let jsMonth = jsDate.getMonth();
    let month = (jsMonth + 1).toString();
    if (month.length == 1) {
        month = "0" + month;
    }
    let day = jsDate.getDate().toString();
    if (day.length == 1) {
        day = "0" + day;
    }
    let hour = jsDate.getHours().toString();
    if (hour.length == 1) {
        hour = "0" + hour;
    }
    return {
        year: year,
        month: month,
        day: day,
        hour: hour
    };
}
exports.getYyyyMmDdHhAsObj = getYyyyMmDdHhAsObj;
//# sourceMappingURL=get-yyyy-mm-dd.util.js.map