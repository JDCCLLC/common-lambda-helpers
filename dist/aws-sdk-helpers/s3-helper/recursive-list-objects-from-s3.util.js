"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recursiveListObjectsFromS3 = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const __1 = require("../..");
async function recursiveListObjectsFromS3(input) {
    let ret = [];
    let ourContiuationToken = undefined;
    let s3Input = input;
    let s3Client = new client_s3_1.S3Client({});
    let sdkCount = 0;
    do {
        if (ourContiuationToken != undefined) {
            s3Input.ContinuationToken = ourContiuationToken;
        }
        let s3Resp = await s3Client.send(new client_s3_1.ListObjectsV2Command(s3Input));
        if (s3Resp.Contents) {
            ret = ret.concat(s3Resp.Contents);
        }
        if (s3Resp.NextContinuationToken) {
            ourContiuationToken = s3Resp.NextContinuationToken;
        }
        else {
            ourContiuationToken = undefined;
        }
        sdkCount = sdkCount + 1;
        __1.ConsoleLog.logObj(`SDK calls`, sdkCount);
    } while (ourContiuationToken != undefined);
    return ret;
}
exports.recursiveListObjectsFromS3 = recursiveListObjectsFromS3;
//# sourceMappingURL=recursive-list-objects-from-s3.util.js.map