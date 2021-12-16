import {
  SendMessageBatchCommand,
  SendMessageBatchCommandOutput,
  SendMessageBatchRequestEntry,
  SQSClient
} from '@aws-sdk/client-sqs'
import { UuidHelper } from '../..'

export interface BatchSendToQueueInput {
  itemsToSend: any[]
  queueUrl: string
  sqsClient?: SQSClient
}

export interface BatchSendToQueueOutput {
  outputs: SendMessageBatchCommandOutput[]
}

export async function BatchSendToQueue(input: BatchSendToQueueInput): Promise<BatchSendToQueueOutput> {
  let sqsClient = input.sqsClient || new SQSClient({})
  let ret: BatchSendToQueueOutput = {
    outputs: [],
  }
  // batch send to SQS Queue to be worked
  let sqsMessages: SendMessageBatchRequestEntry[] = []
  for (let i of input.itemsToSend) {
    sqsMessages.push({
      Id: UuidHelper.uuid4(),
      MessageBody: JSON.stringify(i)
    })
    if (sqsMessages.length >= 10) {
      let sendToSqs = await sqsClient.send(new SendMessageBatchCommand({
        QueueUrl: input.queueUrl,
        Entries: sqsMessages,
      }))
      ret.outputs.push(sendToSqs)
      // ConsoleLog.logObj(`sendToSqs`, sendToSqs)
      sqsMessages = []
    }
  }
  // cleanup
  if (sqsMessages.length > 0) {
    let sendToSqs = await sqsClient.send(new SendMessageBatchCommand({
      QueueUrl: input.queueUrl,
      Entries: sqsMessages,
    }))
    ret.outputs.push(sendToSqs)
    // ConsoleLog.logObj(`sendToSqs`, sendToSqs)
    sqsMessages = []
  }

  return Promise.resolve(ret)
}