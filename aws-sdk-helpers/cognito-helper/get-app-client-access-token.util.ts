import * as axios from 'axios'
import * as qs from 'qs'
import { ConsoleLog } from '../..';

export interface GetAppClientAccessTokenInput {
  url: string
  app_client_id: string
  app_client_secret: string
}

export async function getAppClientAccessToken(
  input: GetAppClientAccessTokenInput
): Promise<string>{
  let basicCredsNormal = `${input.app_client_id}:${input.app_client_secret}`
  let basicB64Encode = Buffer.from(basicCredsNormal).toString('base64')

  let data = qs.stringify({
    'grant_type': 'client_credentials' 
  });
  let config = {
    headers: { 
      'Authorization': `Basic ${basicB64Encode}`, 
      'Content-Type': 'application/x-www-form-urlencoded', 
    }
  }
  try {
    let axiosResp = await axios.default.post(input.url, data, config)
    if (axiosResp.status == 200) {
      return Promise.resolve(axiosResp.data.access_token)
    } else {
      return Promise.reject(`unable to get token from axios call`)
    }
  } catch(err) {
    return Promise.reject(err)
  }
  
}