"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assumeRoleTest = void 0;
const client_sts_1 = require("@aws-sdk/client-sts");
/**
 * Role assumer that you can use when you need to use the SDK v3 with a named
 * CLI profile that assumes a role.
 */
async function assumeRoleTest(sourceCreds, params) {
    let stsClient = new client_sts_1.STSClient({
        credentials: sourceCreds
    });
    let assumedRole = await stsClient.send(new client_sts_1.AssumeRoleCommand(params));
    if (assumedRole.Credentials != undefined) {
        let retObj = {
            accessKeyId: assumedRole.Credentials.AccessKeyId || 'unknown',
            secretAccessKey: assumedRole.Credentials.SecretAccessKey || 'unknown',
            sessionToken: assumedRole.Credentials.SessionToken || 'unknown'
        };
        return Promise.resolve(retObj);
    }
    else {
        return Promise.reject(`could not assume role`);
    }
}
exports.assumeRoleTest = assumeRoleTest;
//# sourceMappingURL=sts-role-assumer-for-named-profiles.util.js.map