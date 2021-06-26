"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.putStrAsS3Obj = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const __1 = require("../..");
async function putStrAsS3Obj(props) {
    let s3Client = props.s3Client || new client_s3_1.S3Client({});
    let s3PutParams = {
        Body: Buffer.from(props.str),
        Bucket: props.bucketName,
        Key: props.key,
        ServerSideEncryption: "AES256"
    };
    let s3Resp = undefined;
    try {
        s3Resp = await s3Client.send(new client_s3_1.PutObjectCommand(s3PutParams));
    }
    catch (err) {
        __1.ConsoleLog.logObj(`error putting to s3`, err);
    }
    return new Promise(function (resolve, reject) {
        if (s3Resp != undefined) {
            resolve(s3Resp);
        }
        else {
            reject(`error putting str to s3`);
        }
    });
}
exports.putStrAsS3Obj = putStrAsS3Obj;
//# sourceMappingURL=put-str-as-s3-obj.util.js.map