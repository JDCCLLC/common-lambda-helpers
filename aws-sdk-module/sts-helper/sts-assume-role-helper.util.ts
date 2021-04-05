import { STSClient, AssumeRoleCommand } from '@aws-sdk/client-sts'
import { ConsoleLog } from '../../console-log-module/console-log.module'

export interface AssumeRoleOutput {
  AccessKeyId: string | undefined
  SecretAccessKey: string | undefined
  SessionToken: string | undefined
  AwsRegion: string
}

export async function assumeThisRole(roleArn: string, awsRegion?: string): Promise<AssumeRoleOutput> {
  if (awsRegion == undefined) {
    awsRegion = 'us-east-1'
  }
  process.env.AWS_REGION = awsRegion
  let stsClient = new STSClient({})
  let stsResp = await stsClient.send(new AssumeRoleCommand({
    RoleArn: roleArn,
    DurationSeconds: 900,
    RoleSessionName: `TempScriptAssumeRole`
  }))
  ConsoleLog.logObj(`stsResp`, stsResp)
  if (stsResp.Credentials) {
    process.env.AWS_ACCESS_KEY_ID = stsResp.Credentials.AccessKeyId
    process.env.AWS_SECRET_ACCESS_KEY = stsResp.Credentials.SecretAccessKey
    process.env.AWS_SESSION_TOKEN = stsResp.Credentials.SessionToken
    return Promise.resolve({
      AccessKeyId: stsResp.Credentials.AccessKeyId,
      SecretAccessKey: stsResp.Credentials.SecretAccessKey,
      SessionToken: stsResp.Credentials.SessionToken,
      AwsRegion: awsRegion,
    })
  } else {
    return Promise.reject('unable to assume role')
  }
}


