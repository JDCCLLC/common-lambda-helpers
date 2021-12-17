import { GetParameterCommand, SSMClient } from "@aws-sdk/client-ssm";

export interface GetParamValueInput {
  paramName: string
  ssmClient?: SSMClient
}

export async function GetParamValue(input: GetParamValueInput): Promise<string | undefined> {
  let ret: string | undefined
  let ssm = input.ssmClient || new SSMClient({})

  let resp = await ssm.send(new GetParameterCommand({
    Name: input.paramName
  }))

  if (resp.Parameter) {
    if (resp.Parameter.Value) {
      ret = resp.Parameter.Value
    }
  }

  return Promise.resolve(ret)
}