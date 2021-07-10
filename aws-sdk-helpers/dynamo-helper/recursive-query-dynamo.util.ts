import { DynamoDBClient, QueryCommand, QueryCommandInput } from '@aws-sdk/client-dynamodb'
import { CredentialProvider } from '@aws-sdk/types'
import { unmarshall } from "@aws-sdk/util-dynamodb"
import { ConsoleLog } from '../..'

interface RecursiveQueryInput {
  DynamoQueryInput: QueryCommandInput
  TotalMaxResultsToReturn?: number // the max number of items you want to return
  ReturnDynamoJson?: boolean // return normal object or dynamo marshalled object
  DynamoClient?: DynamoDBClient
}

export async function recurisveQueryDynamo(input: RecursiveQueryInput): Promise<any[]> {
  let ret: any[] = []
  if (input.TotalMaxResultsToReturn == undefined) {
    input.TotalMaxResultsToReturn = 3573573573573573573573573573 // a big number
  }
  let dynamoClient = input.DynamoClient || new DynamoDBClient({})
  
  let ourContinuationToken: any | undefined = undefined
  let ourInput: QueryCommandInput = input.DynamoQueryInput

  let sdkCount = 0
  do {
    if (ourContinuationToken != undefined) {
      ourInput.ExclusiveStartKey = ourContinuationToken
    }
    let sdkResp = await dynamoClient.send(new QueryCommand(ourInput))
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