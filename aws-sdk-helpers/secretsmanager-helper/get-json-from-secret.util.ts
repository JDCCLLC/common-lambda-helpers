import { GetSecretValueCommand, SecretsManagerClient } from "@aws-sdk/client-secrets-manager"
import { ConsoleLog } from "../../index"

interface getJsonFromSecretInput {
  secretId: string,
}

export async function getJsonFromSecret(props: getJsonFromSecretInput): Promise<any> {
  let smClient = new SecretsManagerClient({})
  let secretResp = await smClient.send(new GetSecretValueCommand({
    SecretId: props.secretId
  }))
  return new Promise(function(resolve, reject) {
    if (secretResp.SecretString) {
      ConsoleLog.logObj(`secretResp.SecretString`, secretResp.SecretString)
      try {
        let ssAsObj = JSON.parse(secretResp.SecretString)
        resolve(ssAsObj)
      } catch(err) {
        ConsoleLog.logObj(`unable to PARSE secret as JSON`, err)
        reject(err)
      }
    } else {
      reject(`unable to get secret value from aws sdk`)
    }
  })
  
}