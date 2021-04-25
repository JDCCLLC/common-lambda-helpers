"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sleepForSeconds = void 0;
const __1 = require("..");
async function sleepForSeconds(seconds) {
    __1.ConsoleLog.log(`sleeping for ${seconds} seconds...`);
    // setTimeout(function() {
    // }, seconds)
    return new Promise(resolve => setTimeout(resolve, (seconds * 1000)));
}
exports.sleepForSeconds = sleepForSeconds;
//# sourceMappingURL=sleep-for-seconds.util.js.map