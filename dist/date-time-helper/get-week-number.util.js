"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWeekNumber = void 0;
function getWeekNumber(d) {
    // Copy date so don't modify original
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    // Set to nearest Thursday: current date + 4 - current day number
    // Make Sunday's day number 7
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
    // Get first day of year
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    // Calculate full weeks to nearest Thursday
    var weekNo = Math.ceil((((Number(d) - Number(yearStart)) / 86400000) + 1) / 7);
    // test comment
    // Return array of year and week number
    return weekNo;
}
exports.getWeekNumber = getWeekNumber;
//# sourceMappingURL=get-week-number.util.js.map