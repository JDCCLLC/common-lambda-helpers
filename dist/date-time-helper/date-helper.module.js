"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateHelper = void 0;
var DateHelper;
(function (DateHelper) {
    function getYyyyMmDd(jsDate = new Date()) {
        return jsDate.toISOString().substring(0, 10);
    }
    DateHelper.getYyyyMmDd = getYyyyMmDd;
})(DateHelper = exports.DateHelper || (exports.DateHelper = {}));
//# sourceMappingURL=date-helper.module.js.map