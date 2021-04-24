import { AssumeRoleCommand, STSClient } from '@aws-sdk/client-sts'
import  { AssumeRoleParams } from "@aws-sdk/credential-provider-ini";
import { Credentials } from '@aws-sdk/types'
/**
 * Role assumer that you can use when you need to use the SDK v3 with a named 
 * CLI profile that assumes a role.
 */
 export async function assumeRoleTest(sourceCreds: Credentials, params: AssumeRoleParams): Promise<Credentials> {
  let stsClient = new STSClient({
    credentials: sourceCreds
  })
  let assumedRole = await stsClient.send( new AssumeRoleCommand(params))
  if (assumedRole.Credentials != undefined) {
    let retObj: Credentials = {
      accessKeyId: assumedRole.Credentials.AccessKeyId || 'unknown',
      secretAccessKey: assumedRole.Credentials.SecretAccessKey || 'unknown',
      sessionToken: assumedRole.Credentials.SessionToken || 'unknown' 
    }
   
    return Promise.resolve(retObj)
  } else {
    return Promise.reject(`could not assume role`)
  }
  
}