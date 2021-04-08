"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logObj = void 0;
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
exports.logObj = logObj;
//# sourceMappingURL=log-object.util.js.map