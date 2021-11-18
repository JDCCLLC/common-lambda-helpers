"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// what AWS account and role to assume before making SDK calls
let integrationRoleToAssume = `arn:aws:iam::794776596438:role/CloudticityAdmin`;
let integrationAwsRegion = 'us-east-1';
// jest -t 'get cognito app client access token'
// test('get cognito app client access token', async () => {
//   // asume role before using the SDK
//   await StsHelper.assumeThisRole(integrationRoleToAssume, integrationAwsRegion)
//   let secretArn = 'arn:aws:secretsmanager:us-east-1:794776596438:secret:adt-datalake-v2/acrs-cognito-app-client-MbnK0C'
//   let secretResp = await SecretsManagerHelper.getJsonFromSecret({
//     secretId: secretArn
//   })
//   // ConsoleLog.logObj(`resp`, resp)
//   let accessToken = await getAppClientAccessToken({
//     url: secretResp.token_url,
//     app_client_id: secretResp.client_id,
//     app_client_secret: secretResp.client_secret
//   })
//   ConsoleLog.logObj(`accessToken`, accessToken)
//   expect(accessToken).toBeDefined()
// }, 15000)
test('always passes 01', () => {
    expect(true).toBeTruthy();
});
//# sourceMappingURL=get-cognito-app-client-access-token.test.js.map