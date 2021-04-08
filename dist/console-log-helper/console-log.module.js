"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsoleLog = void 0;
var ConsoleLog;
(function (ConsoleLog) {
    function logObj(text, obj, logAsJson = true) {
        console.log(`${text}: `);
        try {
            let objAsJson = JSON.stringify(obj, null, 2);
            console.log(objAsJson);
        }
        catch (err) {
            console.log(obj);
            console.log(`could not JSON.stringify object: ${text}`);
        }
    }
    ConsoleLog.logObj = logObj;
})(ConsoleLog = exports.ConsoleLog || (exports.ConsoleLog = {}));
//# sourceMappingURL=console-log.module.js.map