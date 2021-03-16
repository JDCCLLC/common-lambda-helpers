"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsoleLog = void 0;
var ConsoleLog;
(function (ConsoleLog) {
    function logObj(text, obj, logAsJson = true) {
        console.log(`${text}: `);
        if (logAsJson) {
            console.log(JSON.stringify(obj, null, 2));
        }
        else {
            console.log(obj);
        }
    }
    ConsoleLog.logObj = logObj;
})(ConsoleLog = exports.ConsoleLog || (exports.ConsoleLog = {}));
//# sourceMappingURL=console-log.module.js.map