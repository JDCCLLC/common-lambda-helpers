"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recurisveScanDynamo = void 0;
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
const util_dynamodb_1 = require("@aws-sdk/util-dynamodb");
const __1 = require("../..");
async function recurisveScanDynamo(input) {
    let ret = [];
    if (input.TotalMaxResultsToReturn == undefined) {
        input.TotalMaxResultsToReturn = 3573573573573573573573573573; // a big number
    }
    if (input.AwsRegion == undefined) {
        input.AwsRegion = 'us-east-1';
    }
    __1.ConsoleLog.logObj(`input.AwsRegion`, input.AwsRegion);
    let dynamoClient = new client_dynamodb_1.DynamoDBClient({
        region: input.AwsRegion
    });
    if (input.Creds != undefined) {
        dynamoClient = new client_dynamodb_1.DynamoDBClient({
            credentials: input.Creds,
            region: input.AwsRegion
        });
    }
    let ourContinuationToken = undefined;
    let ourInput = input.DynamoScanInput;
    let sdkCount = 0;
    do {
        if (ourContinuationToken != undefined) {
            ourInput.ExclusiveStartKey = ourContinuationToken;
        }
        let sdkResp = await dynamoClient.send(new client_dynamodb_1.ScanCommand(ourInput));
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
            unmarshalledRet.push(util_dynamodb_1.unmarshall(item));
        }
        return unmarshalledRet;
    }
}
exports.recurisveScanDynamo = recurisveScanDynamo;
//# sourceMappingURL=recursive-scan-dynamo.util.js.map