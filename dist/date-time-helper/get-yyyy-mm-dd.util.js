"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getYyyyMmDd = void 0;
function getYyyyMmDd(jsDate = new Date()) {
    return jsDate.toISOString().substring(0, 10);
}
exports.getYyyyMmDd = getYyyyMmDd;
//# sourceMappingURL=get-yyyy-mm-dd.util.js.map