"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isDate = void 0;
function isDate(dateMaybe) {
    return (dateMaybe instanceof Date && !isNaN(dateMaybe.valueOf()));
}
exports.isDate = isDate;
//# sourceMappingURL=is-date.util.js.map