"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAverage = void 0;
function getAverage(numbers) {
    let total = 0;
    for (let i of numbers) {
        total = total + i;
    }
    return total / numbers.length;
}
exports.getAverage = getAverage;
//# sourceMappingURL=get-avg.util.js.map