"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AwsSdkHelper = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const client_secrets_manager_1 = require("@aws-sdk/client-secrets-manager");
const console_log_module_1 = require("../console-log-module/console-log.module");
var AwsSdkHelper;
(function (AwsSdkHelper) {
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
    AwsSdkHelper.getJsonFromS3 = getJsonFromS3;
    /** Get secret from AWS Secrets Manager and convert SecretString to JSON */
    async function getJsonFromSecret(props) {
        let smClient = new client_secrets_manager_1.SecretsManagerClient({});
        let secretResp = await smClient.send(new client_secrets_manager_1.GetSecretValueCommand({
            SecretId: props.secretId
        }));
        return new Promise(function (resolve, reject) {
            if (secretResp.SecretString) {
                try {
                    let ssAsObj = JSON.parse(secretResp.SecretString);
                    resolve(ssAsObj);
                }
                catch (err) {
                    console_log_module_1.ConsoleLog.logObj(`unable to PRASE secret as JSON`, err);
                    reject(err);
                }
            }
            else {
                reject(`unable to get secret value from aws sdk`);
            }
        });
    }
    AwsSdkHelper.getJsonFromSecret = getJsonFromSecret;
})(AwsSdkHelper = exports.AwsSdkHelper || (exports.AwsSdkHelper = {}));
//# sourceMappingURL=aws-sdk.module.js.map