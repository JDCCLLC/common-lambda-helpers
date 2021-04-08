"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getJsonFromSecret = void 0;
const client_secrets_manager_1 = require("@aws-sdk/client-secrets-manager");
const index_1 = require("../../index");
async function getJsonFromSecret(props) {
    let smClient = new client_secrets_manager_1.SecretsManagerClient({});
    let secretResp = await smClient.send(new client_secrets_manager_1.GetSecretValueCommand({
        SecretId: props.secretId
    }));
    return new Promise(function (resolve, reject) {
        if (secretResp.SecretString) {
            try {
                let ssAsObj = JSON.parse(secretResp.SecretString);
                resolve(ssAsObj);
            }
            catch (err) {
                index_1.ConsoleLog.logObj(`unable to PRASE secret as JSON`, err);
                reject(err);
            }
        }
        else {
            reject(`unable to get secret value from aws sdk`);
        }
    });
}
exports.getJsonFromSecret = getJsonFromSecret;
//# sourceMappingURL=get-json-from-secret.util.js.map