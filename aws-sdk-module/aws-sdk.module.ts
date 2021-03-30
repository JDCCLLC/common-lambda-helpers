import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { GetSecretValueCommand, SecretsManagerClient } from '@aws-sdk/client-secrets-manager'
import { ConsoleLog } from '../console-log-module/console-log.module'

interface getJsonFromS3Input {
  bucketName: string,
  key: string,
}

interface getJsonFromSecretInput {
  secretId: string,
}

export module AwsSdkHelper {
  export async function getJsonFromS3(
    props: getJsonFromS3Input
  ): Promise<any> {
    // get file from s3
    let s3Client = new S3Client({})
    let getObjResp = await s3Client.send(new GetObjectCommand({
      Bucket: props.bucketName,
      Key: props.key,
    }))
    return new Promise(function(resolve, reject) {
      if (getObjResp.Body) {
        let item = getObjResp.Body
        let dataAsStr = '';
        if ('on' in item) {
          if (typeof item.on === 'function') {
            try {
              item.on('data', function (chunk: any) {
                dataAsStr += chunk;
              });
              item.on('end', function () {
                try {
                  resolve(JSON.parse(dataAsStr));
                } catch(err) {
                  reject(err)
                }
              });
              item.on('error', function (err: any) {
                reject(err);
              });
            } catch(err) {
              reject(err);
            }
          } else {
            reject('unable to get object body from s3')
          }
        }
      } else {
        reject(`i dont know how to read this from s3 yet`)
      }
    })
  }

  /** Get secret from AWS Secrets Manager and convert SecretString to JSON */
  export async function getJsonFromSecret(props: getJsonFromSecretInput): Promise<any> {
    let smClient = new SecretsManagerClient({})
    let secretResp = await smClient.send(new GetSecretValueCommand({
      SecretId: props.secretId
    }))
    return new Promise(function(resolve, reject) {
      if (secretResp.SecretString) {
        try {
          let ssAsObj = JSON.parse(secretResp.SecretString)
          resolve(ssAsObj)
        } catch(err) {
          ConsoleLog.logObj(`unable to PRASE secret as JSON`, err)
          reject(err)
        }
      } else {
        reject(`unable to get secret value from aws sdk`)
      }
    })
    
  }
}