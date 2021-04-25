import { DynamoDBClient, ScanCommand, ScanInput } from '@aws-sdk/client-dynamodb'
import { CredentialProvider } from '@aws-sdk/types'
import { unmarshall } from "@aws-sdk/util-dynamodb"
import { ConsoleLog } from '../..'

interface RecursiveScanInput {
  DynamoScanInput: ScanInput
  TotalMaxResultsToReturn?: number // the max number of items you want to return
  ReturnDynamoJson?: boolean // return normal object or dynamo marshalled object
  Creds?: CredentialProvider
  AwsRegion?: string
}

export async function recurisveScanDynamo(input: RecursiveScanInput): Promise<any[]> {
  let ret: any[] = []
  if (input.TotalMaxResultsToReturn == undefined) {
    input.TotalMaxResultsToReturn = 3573573573573573573573573573 // a big number
  }
  if (input.AwsRegion == undefined) {
    input.AwsRegion == 'us-east-1'
  }
  ConsoleLog.logObj(`input.AwsRegion`, input.AwsRegion)
  let dynamoClient = new DynamoDBClient({
    region: input.AwsRegion
  })
  if (input.Creds != undefined) {
    dynamoClient = new DynamoDBClient({
      credentials: input.Creds,
      region: input.AwsRegion
    })
  }
  

  let ourContinuationToken: any | undefined = undefined
  let ourInput: ScanInput = input.DynamoScanInput

  let sdkCount = 0
  do {
    if (ourContinuationToken != undefined) {
      ourInput.ExclusiveStartKey = ourContinuationToken
    }
    let sdkResp = await dynamoClient.send(new ScanCommand(ourInput))
    if (sdkResp.Items) {
      for (let item of sdkResp.Items) {
        if (ret.length < input.TotalMaxResultsToReturn) {
          ret.push(item)
        }
      }
    }
    if (sdkResp.LastEvaluatedKey) {
      ourContinuationToken = sdkResp.LastEvaluatedKey
    } else {
      ourContinuationToken = undefined
    }
    sdkCount = sdkCount + 1
    ConsoleLog.logObj(`SDK calls`, sdkCount)

    if (ret.length >= input.TotalMaxResultsToReturn) {
      break // break out of the do while
    }

  } while (ourContinuationToken != undefined)

  if (input.ReturnDynamoJson == undefined) {
    input.ReturnDynamoJson = false
  }
  if (input.ReturnDynamoJson == true) {
    return ret
  } else {
    // unmarshall
    let unmarshalledRet: any[] = []
    for (let item of ret) {
      unmarshalledRet.push(unmarshall(item))
    }
    return unmarshalledRet
  }
  
}