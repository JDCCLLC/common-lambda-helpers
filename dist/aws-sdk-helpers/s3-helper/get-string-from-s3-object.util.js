"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStringFromS3Object = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
async function getStringFromS3Object(props) {
    // get file from s3
    if (props.region == undefined) {
        props.region = 'us-east-1';
    }
    let s3Client = new client_s3_1.S3Client({
        region: props.region
    });
    if (props.credentials != undefined) {
        s3Client = new client_s3_1.S3Client({
            region: props.region,
            credentials: props.credentials
        });
    }
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
                                resolve(dataAsStr);
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
exports.getStringFromS3Object = getStringFromS3Object;
//# sourceMappingURL=get-string-from-s3-object.util.js.map