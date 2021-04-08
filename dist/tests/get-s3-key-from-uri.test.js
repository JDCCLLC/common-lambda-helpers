"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
const get_key_from_s3_uri_util_1 = require("../aws-sdk-helpers/s3-helper/get-key-from-s3-uri.util");
test('get s3 key from s3 uri should be path1/path2/filename.json', () => {
    let resp = get_key_from_s3_uri_util_1.getKeyFromS3Url('s3://bucketName/path1/path2/filename.json');
    __1.ConsoleLog.logObj(`resp`, resp);
    expect(resp).toBe('path1/path2/filename.json');
});
//# sourceMappingURL=get-s3-key-from-uri.test.js.map