"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAppClientAccessToken = void 0;
const axios = __importStar(require("axios"));
const qs = __importStar(require("qs"));
async function getAppClientAccessToken(input) {
    let basicCredsNormal = `${input.app_client_id}:${input.app_client_secret}`;
    let basicB64Encode = Buffer.from(basicCredsNormal).toString('base64');
    let data = qs.stringify({
        'grant_type': 'client_credentials'
    });
    let config = {
        headers: {
            'Authorization': `Basic ${basicB64Encode}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        }
    };
    try {
        let axiosResp = await axios.default.post(input.url, data, config);
        if (axiosResp.status == 200) {
            return Promise.resolve(axiosResp.data.access_token);
        }
        else {
            return Promise.reject(`unable to get token from axios call`);
        }
    }
    catch (err) {
        return Promise.reject(err);
    }
}
exports.getAppClientAccessToken = getAppClientAccessToken;
//# sourceMappingURL=get-app-client-access-token.util.js.map