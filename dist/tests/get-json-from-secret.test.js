"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
const index_2 = require("../index");
const index_3 = require("../index");
// what AWS account and role to assume before making SDK calls
let integrationRoleToAssume = `arn:aws:iam::794776596438:role/CloudticityAdmin`;
let integrationAwsRegion = 'us-east-1';
// jest -t 'get json from secret'
test('get json from secret', async () => {
    // asume role before using the SDK
    await index_2.StsHelper.assumeThisRole(integrationRoleToAssume, integrationAwsRegion);
    let secretArn = 'arn:aws:secretsmanager:us-east-1:794776596438:secret:migateway-db-permissions-lambda-dev-XBdqGz';
    let resp = await index_3.SecretsManagerHelper.getJsonFromSecret({
        secretId: secretArn
    });
    index_1.ConsoleLog.logObj(`resp`, resp);
    expect(resp.username).toBe('rls_update_lambda');
}, 15000);
//# sourceMappingURL=get-json-from-secret.test.js.map