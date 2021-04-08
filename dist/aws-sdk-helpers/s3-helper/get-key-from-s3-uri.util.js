"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getKeyFromS3Url = void 0;
function getKeyFromS3Url(s3Uri) {
    let splitByDoubleSlash = s3Uri.split('//');
    let splitBucketAndKeyBySlash = splitByDoubleSlash[1].split('/');
    let count = 0;
    let key = ``;
    for (let i of splitBucketAndKeyBySlash) {
        if (count > 0) {
            key += i;
            if (count < (splitBucketAndKeyBySlash.length - 1)) {
                key += '/';
            }
        }
        count = count + 1;
    }
    return key;
}
exports.getKeyFromS3Url = getKeyFromS3Url;
//# sourceMappingURL=get-key-from-s3-uri.util.js.map