"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
const index_2 = require("../index");
test('simpe test', () => {
    let resp = index_2.S3Helper.getBucketFromS3Url('s3://test/path1/key.json');
    index_1.ConsoleLog.logObj(`resp`, resp);
    expect(resp).toBe('test');
});
//# sourceMappingURL=test-imports.test.js.map