"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const get_app_client_access_token_util_1 = require("../aws-sdk-helpers/cognito-helper/get-app-client-access-token.util");
const index_1 = require("../index");
const index_2 = require("../index");
const index_3 = require("../index");
// what AWS account and role to assume before making SDK calls
let integrationRoleToAssume = `arn:aws:iam::794776596438:role/CloudticityAdmin`;
let integrationAwsRegion = 'us-east-1';
// jest -t 'get cognito app client access token'
test('get cognito app client access token', async () => {
    // asume role before using the SDK
    await index_2.StsHelper.assumeThisRole(integrationRoleToAssume, integrationAwsRegion);
    let secretArn = 'arn:aws:secretsmanager:us-east-1:794776596438:secret:adt-datalake-v2/acrs-cognito-app-client-MbnK0C';
    let secretResp = await index_3.SecretsManagerHelper.getJsonFromSecret({
        secretId: secretArn
    });
    // ConsoleLog.logObj(`resp`, resp)
    let accessToken = await get_app_client_access_token_util_1.getAppClientAccessToken({
        url: secretResp.token_url,
        app_client_id: secretResp.client_id,
        app_client_secret: secretResp.client_secret
    });
    index_1.ConsoleLog.logObj(`accessToken`, accessToken);
    expect(accessToken).toBeDefined();
}, 15000);
//# sourceMappingURL=get-cognito-app-client-access-token.test.js.map