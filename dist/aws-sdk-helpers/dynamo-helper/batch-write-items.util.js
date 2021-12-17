"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BatchWriteItems = void 0;
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
const util_dynamodb_1 = require("@aws-sdk/util-dynamodb");
async function BatchWriteItems(input) {
    let dynamoClient = input.dynamoClient || new client_dynamodb_1.DynamoDBClient({});
    let marshallItems = input.marshallItems || true;
    let ret = [];
    let itemsToWrite = [];
    for (let i of input.items) {
        if (marshallItems === true) {
            itemsToWrite.push({ PutRequest: { Item: (0, util_dynamodb_1.marshall)(i) } });
        }
        else {
            itemsToWrite.push({ PutRequest: { Item: i } });
        }
        // batch write if we need to
        if (itemsToWrite.length === 25) {
            let resp = await dynamoClient.send(new client_dynamodb_1.BatchWriteItemCommand({
                RequestItems: {
                    [input.tableName]: itemsToWrite
                }
            }));
            ret.push(resp);
            itemsToWrite = [];
        }
    }
    // cleanup
    if (itemsToWrite.length > 0) {
        let resp = await dynamoClient.send(new client_dynamodb_1.BatchWriteItemCommand({
            RequestItems: {
                [input.tableName]: itemsToWrite
            }
        }));
        ret.push(resp);
        itemsToWrite = [];
    }
    return Promise.resolve(ret);
}
exports.BatchWriteItems = BatchWriteItems;
//# sourceMappingURL=batch-write-items.util.js.map