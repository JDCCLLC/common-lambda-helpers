"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recurisveQueryDynamo = void 0;
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
const util_dynamodb_1 = require("@aws-sdk/util-dynamodb");
const __1 = require("../..");
async function recurisveQueryDynamo(input) {
    let ret = [];
    if (input.TotalMaxResultsToReturn == undefined) {
        input.TotalMaxResultsToReturn = 3573573573573573573573573573; // a big number
    }
    let dynamoClient = input.DynamoClient || new client_dynamodb_1.DynamoDBClient({});
    let ourContinuationToken = undefined;
    let ourInput = input.DynamoQueryInput;
    let sdkCount = 0;
    do {
        if (ourContinuationToken != undefined) {
            ourInput.ExclusiveStartKey = ourContinuationToken;
        }
        let sdkResp = await dynamoClient.send(new client_dynamodb_1.QueryCommand(ourInput));
        if (sdkResp.Items) {
            for (let item of sdkResp.Items) {
                if (ret.length < input.TotalMaxResultsToReturn) {
                    ret.push(item);
                }
            }
        }
        if (sdkResp.LastEvaluatedKey) {
            ourContinuationToken = sdkResp.LastEvaluatedKey;
        }
        else {
            ourContinuationToken = undefined;
        }
        sdkCount = sdkCount + 1;
        __1.ConsoleLog.logObj(`SDK calls`, sdkCount);
        if (ret.length >= input.TotalMaxResultsToReturn) {
            break; // break out of the do while
        }
    } while (ourContinuationToken != undefined);
    if (input.ReturnDynamoJson == undefined) {
        input.ReturnDynamoJson = false;
    }
    if (input.ReturnDynamoJson == true) {
        return ret;
    }
    else {
        // unmarshall
        let unmarshalledRet = [];
        for (let item of ret) {
            unmarshalledRet.push((0, util_dynamodb_1.unmarshall)(item));
        }
        return unmarshalledRet;
    }
}
exports.recurisveQueryDynamo = recurisveQueryDynamo;
//# sourceMappingURL=recursive-query-dynamo.util.js.map