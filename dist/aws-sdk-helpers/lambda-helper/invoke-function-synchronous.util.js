"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.invokeFunctionSynchronous = void 0;
const client_lambda_1 = require("@aws-sdk/client-lambda");
const __1 = require("../..");
async function invokeFunctionSynchronous(input) {
    let lambdaClient = new client_lambda_1.LambdaClient({});
    if (input.lambdaClientCredentials != undefined) {
        lambdaClient = new client_lambda_1.LambdaClient({
            credentials: input.lambdaClientCredentials
        });
    }
    var invokeParams = {
        FunctionName: input.functionName,
        LogType: 'None',
        // Payload: JSON.stringify({input:newBody}),
        Payload: Buffer.from(JSON.stringify(input.eventObj))
    };
    let lambdaResp = await lambdaClient.send(new client_lambda_1.InvokeCommand(invokeParams));
    if (lambdaResp.Payload) {
        let payloadAsStr = Buffer.from(lambdaResp.Payload).toString('utf-8');
        try {
            return Promise.resolve(JSON.parse(payloadAsStr));
        }
        catch (err) {
            __1.ConsoleLog.logObj(`error parsing payload as object`, err);
            return Promise.resolve(payloadAsStr);
        }
    }
    else {
        return Promise.reject(`no payload in lambdaResp`);
    }
}
exports.invokeFunctionSynchronous = invokeFunctionSynchronous;
//# sourceMappingURL=invoke-function-synchronous.util.js.map