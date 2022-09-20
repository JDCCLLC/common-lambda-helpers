"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assumeThisRole = void 0;
const client_sts_1 = require("@aws-sdk/client-sts");
async function assumeThisRole(roleArn, awsRegion, setEnvValues) {
    if (awsRegion == undefined) {
        awsRegion = 'us-east-1';
    }
    process.env.AWS_REGION = awsRegion;
    if (setEnvValues == undefined) {
        setEnvValues = false;
    }
    let stsClient = new client_sts_1.STSClient({});
    let stsResp = await stsClient.send(new client_sts_1.AssumeRoleCommand({
        RoleArn: roleArn,
        DurationSeconds: 900,
        RoleSessionName: `TempScriptAssumeRole`
    }));
    // ConsoleLog.logObj(`stsResp`, stsResp)
    if (stsResp.Credentials) {
        if (setEnvValues) {
            process.env.AWS_ACCESS_KEY_ID = stsResp.Credentials.AccessKeyId;
            process.env.AWS_SECRET_ACCESS_KEY = stsResp.Credentials.SecretAccessKey;
            process.env.AWS_SESSION_TOKEN = stsResp.Credentials.SessionToken;
        }
        // return Promise.resolve({
        //   AccessKeyId: stsResp.Credentials.AccessKeyId,
        //   SecretAccessKey: stsResp.Credentials.SecretAccessKey,
        //   SessionToken: stsResp.Credentials.SessionToken,
        //   AwsRegion: awsRegion,
        // })
        if (stsResp.Credentials) {
            return Promise.resolve({
                accessKeyId: stsResp.Credentials.AccessKeyId || 'unknown',
                secretAccessKey: stsResp.Credentials.SecretAccessKey || 'unknown',
                sessionToken: stsResp.Credentials.SessionToken,
            });
        }
        else {
            return Promise.reject('unable to get credentials');
        }
    }
    else {
        return Promise.reject('unable to assume role');
    }
}
exports.assumeThisRole = assumeThisRole;
//# sourceMappingURL=sts-assume-role-helper.util.js.map