"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getParsedJsonFromS3 = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
async function getParsedJsonFromS3(props) {
    let s3Client = props.s3Client || new client_s3_1.S3Client({});
    // get file from s3
    let getObjResp = await s3Client.send(new client_s3_1.GetObjectCommand({
        Bucket: props.bucketName,
        Key: props.key,
    }));
    return new Promise(function (resolve, reject) {
        if (getObjResp.Body) {
            let item = getObjResp.Body;
            let dataAsStr = '';
            if ('on' in item) {
                if (typeof item.on === 'function') {
                    try {
                        item.on('data', function (chunk) {
                            dataAsStr += chunk;
                        });
                        item.on('end', function () {
                            try {
                                resolve(JSON.parse(dataAsStr));
                            }
                            catch (err) {
                                reject(err);
                            }
                        });
                        item.on('error', function (err) {
                            reject(err);
                        });
                    }
                    catch (err) {
                        reject(err);
                    }
                }
                else {
                    reject('unable to get object body from s3');
                }
            }
        }
        else {
            reject(`i dont know how to read this from s3 yet`);
        }
    });
}
exports.getParsedJsonFromS3 = getParsedJsonFromS3;
//# sourceMappingURL=get-parsed-json-from-s3.util.js.map