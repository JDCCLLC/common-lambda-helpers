import { BatchWriteItemCommand, BatchWriteItemCommandOutput, DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { marshall } from "@aws-sdk/util-dynamodb";

export interface BatchWriteItemsInput {
  items: any[]
  tableName: string
  dynamoClient?: DynamoDBClient
  marshallItems?: boolean // defaults to true, we expect a normal TS array of items
}

export async function BatchWriteItems(input: BatchWriteItemsInput): Promise<BatchWriteItemCommandOutput[]> {
  let dynamoClient = input.dynamoClient || new DynamoDBClient({})
  let marshallItems = input.marshallItems || true
  let ret: BatchWriteItemCommandOutput[] = []

  let itemsToWrite: any[] = []
  for (let i of input.items) {
    if (marshallItems === true) {
      itemsToWrite.push({PutRequest: {Item: marshall(i)}})
    } else {
      itemsToWrite.push({PutRequest: {Item: i}})
    }

    // batch write if we need to
    if (itemsToWrite.length === 25) {
      let resp = await dynamoClient.send(new BatchWriteItemCommand({
        RequestItems: {
          [input.tableName]: itemsToWrite
        }
      }))
      ret.push(resp)
      itemsToWrite = []
    }
  }

  // cleanup
  if (itemsToWrite.length > 0) {
    let resp = await dynamoClient.send(new BatchWriteItemCommand({
      RequestItems: {
        [input.tableName]: itemsToWrite
      }
    }))
    ret.push(resp)
    itemsToWrite = []
  }

  return Promise.resolve(ret)
}