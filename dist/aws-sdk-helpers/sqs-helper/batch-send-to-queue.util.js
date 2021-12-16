"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BatchSendToQueue = void 0;
const client_sqs_1 = require("@aws-sdk/client-sqs");
const __1 = require("../..");
async function BatchSendToQueue(input) {
    let sqsClient = input.sqsClient || new client_sqs_1.SQSClient({});
    let ret = {
        outputs: [],
    };
    // batch send to SQS Queue to be worked
    let sqsMessages = [];
    for (let i of input.itemsToSend) {
        sqsMessages.push({
            Id: __1.UuidHelper.uuid4(),
            MessageBody: JSON.stringify(i)
        });
        if (sqsMessages.length >= 10) {
            let sendToSqs = await sqsClient.send(new client_sqs_1.SendMessageBatchCommand({
                QueueUrl: input.queueUrl,
                Entries: sqsMessages,
            }));
            ret.outputs.push(sendToSqs);
            // ConsoleLog.logObj(`sendToSqs`, sendToSqs)
            sqsMessages = [];
        }
    }
    // cleanup
    if (sqsMessages.length > 0) {
        let sendToSqs = await sqsClient.send(new client_sqs_1.SendMessageBatchCommand({
            QueueUrl: input.queueUrl,
            Entries: sqsMessages,
        }));
        ret.outputs.push(sendToSqs);
        // ConsoleLog.logObj(`sendToSqs`, sendToSqs)
        sqsMessages = [];
    }
    return Promise.resolve(ret);
}
exports.BatchSendToQueue = BatchSendToQueue;
//# sourceMappingURL=batch-send-to-queue.util.js.map