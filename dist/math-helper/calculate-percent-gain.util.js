"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculatePercentGain = void 0;
function calculatePercentGain(start, end) {
    let increase = end - start;
    let percentGain = (increase / start) * 100;
    return percentGain;
}
exports.calculatePercentGain = calculatePercentGain;
//# sourceMappingURL=calculate-percent-gain.util.js.map