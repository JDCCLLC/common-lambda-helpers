import { InvokeCommand, InvokeCommandInput, LambdaClient } from '@aws-sdk/client-lambda'
import { Credentials } from '@aws-sdk/types';
import { ConsoleLog } from '../..';

export interface InvokeFunctionSynchronousInput {
  eventObj: any
  functionName: string // name or arn
  lambdaClientCredentials?: Credentials
}

export async function invokeFunctionSynchronous(
  input: InvokeFunctionSynchronousInput
): Promise<any> {
  let lambdaClient = new LambdaClient({})
  if (input.lambdaClientCredentials != undefined) {
    lambdaClient = new LambdaClient({
      credentials: input.lambdaClientCredentials
    })
  }

  var invokeParams: InvokeCommandInput = {
    FunctionName: input.functionName,
    LogType: 'None',
    // Payload: JSON.stringify({input:newBody}),
    Payload: Buffer.from(JSON.stringify(input.eventObj))
  };
  let lambdaResp = await lambdaClient.send(new InvokeCommand(invokeParams))
  if (lambdaResp.Payload) {
    let payloadAsStr = Buffer.from(lambdaResp.Payload).toString('utf-8')
    try {
      return Promise.resolve(JSON.parse(payloadAsStr))
    } catch(err) {
      ConsoleLog.logObj(`error parsing payload as object`, err)
      return Promise.resolve(payloadAsStr)
    }
  } else {
    return Promise.reject(`no payload in lambdaResp`)
  }
}