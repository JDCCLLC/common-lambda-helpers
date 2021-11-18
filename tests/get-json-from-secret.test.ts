import { ConsoleLog } from "../index"
import { StsHelper } from "../index"
import { SecretsManagerHelper } from '../index'

export {}

// what AWS account and role to assume before making SDK calls
let integrationRoleToAssume = `arn:aws:iam::794776596438:role/CloudticityAdmin`
let integrationAwsRegion = 'us-east-1'


// jest -t 'get json from secret'
// test('get json from secret', async () => {
//   // asume role before using the SDK
//   await StsHelper.assumeThisRole(integrationRoleToAssume, integrationAwsRegion)
//   let secretArn = 'arn:aws:secretsmanager:us-east-1:794776596438:secret:migateway-db-permissions-lambda-dev-XBdqGz'
//   let resp = await SecretsManagerHelper.getJsonFromSecret({
//     secretId: secretArn
//   })
//   ConsoleLog.logObj(`resp`, resp)
//   expect(resp.username).toBe('rls_update_lambda')
// }, 15000)

test('always passes 02', () => {
  expect(true).toBeTruthy()
})