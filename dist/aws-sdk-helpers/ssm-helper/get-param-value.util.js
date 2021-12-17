"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetParamValue = void 0;
const client_ssm_1 = require("@aws-sdk/client-ssm");
async function GetParamValue(input) {
    let ret;
    let ssm = input.ssmClient || new client_ssm_1.SSMClient({});
    let resp = await ssm.send(new client_ssm_1.GetParameterCommand({
        Name: input.paramName
    }));
    if (resp.Parameter) {
        if (resp.Parameter.Value) {
            ret = resp.Parameter.Value;
        }
    }
    return Promise.resolve(ret);
}
exports.GetParamValue = GetParamValue;
//# sourceMappingURL=get-param-value.util.js.map