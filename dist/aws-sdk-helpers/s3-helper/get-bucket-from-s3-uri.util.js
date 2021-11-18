"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBucketFromS3Url = void 0;
function getBucketFromS3Url(s3Uri) {
    let splitByDoubleSlash = s3Uri.split('//');
    return splitByDoubleSlash[1].split('/')[0];
}
exports.getBucketFromS3Url = getBucketFromS3Url;
//# sourceMappingURL=get-bucket-from-s3-uri.util.js.map