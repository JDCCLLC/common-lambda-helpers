"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.consoleLog = void 0;
function consoleLog(text, obj, logAsJson = true) {
    console.log(`${text}: `);
    if (logAsJson) {
        console.log(JSON.stringify(obj, null, 2));
    }
    else {
        console.log(obj);
    }
}
exports.consoleLog = consoleLog;
//# sourceMappingURL=consoleLog.js.map