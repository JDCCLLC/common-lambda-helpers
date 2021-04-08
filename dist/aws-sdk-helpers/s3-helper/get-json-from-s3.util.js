"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getJsonFromS3 = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
async function getJsonFromS3(props) {
    // get file from s3
    let s3Client = new client_s3_1.S3Client({});
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
exports.getJsonFromS3 = getJsonFromS3;
//# sourceMappingURL=get-json-from-s3.util.js.map